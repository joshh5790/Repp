from flask import Blueprint
from app.models import Cart, db
import stripe

checkout_routes = Blueprint("checkout", __name__)

#
@checkout_routes.route('/<int:cartId>')
def checkout(cartId):
    cart = Cart.query.get(cartId)
    cartItems = cart.get_items_checkout()
    print(cartItems)
    session = stripe.checkout.Session.create(
        success_url="/",
        line_items=cartItems
    )
    print(session)
    return
