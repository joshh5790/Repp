from flask import Blueprint, request, jsonify
import json
import stripe
import os

checkout_routes = Blueprint("checkout", __name__)

@checkout_routes.route('/create-payment-intent', methods=['POST'])
def create_payment():
    try:
    # Setup env vars beforehand
        stripe_keys = {
            "secret_key": os.environ.get("STRIPE_SECRET_KEY"),
            "publishable_key": os.environ.get("STRIPE_PUBLISHABLE_KEY"),
        }

        stripe.api_key = stripe_keys["secret_key"]
        data = json.loads(request.data)
        intent = stripe.PaymentIntent.create(
            amount=data['amount'],
            currency=data['currency'],
            automatic_payment_methods={
                'enabled': True,
            },
            # Again, I am providing a user_uuid, so I can identify who is making the payment later
            metadata={
                'customer': data['customer']
            },
        )

        return ({
            'clientSecret': intent['client_secret']
        })

    except Exception as e:
        return jsonify(error=str(e)), 403

@checkout_routes.route('/check-payment-intent', methods=['POST'])
def check_payment():
    stripe.api_key = os.environ["STRIPE_SECRET_KEY"]
    endpoint_secret = os.environ["STRIPE_ENDPOINT_KEY"]

    event = None
    payload = request.data
    sig_header = request.headers['STRIPE_SIGNATURE']

    try:
            event = stripe.Webhook.construct_event(
                payload, sig_header, endpoint_secret
            )
    except ValueError as e:
        raise e
    except stripe.error.SignatureVerificationError as e:
        raise e

    if event['type'] == 'payment_intent.succeeded':
        payment_intent = event['data']['object']
        user_uuid = payment_intent['metadata']['customer']
        # Update the user here using the uuid and your db client
        print(f"User {user_uuid} completed a payment.")

    else:
        print('Unhandled event type {}'.format(event['type']))

    return jsonify(success=True)
