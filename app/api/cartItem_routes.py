from flask import Blueprint
from flask_login import login_required, current_user
from app.models import CartItem, Cart, db
from app.forms import CartItemForm
from .auth_routes import validation_errors_to_error_messages
from flask import request

cartItem_routes = Blueprint("cartItems", __name__)


# PUT /cartItems/:cartItemId
@cartItem_routes.route("/<int:cartItemId>", methods=["PUT"])
@login_required
def update_cartItem(cartItemId):
    if not current_user:
        return {"error": "Unauthorized"}, 401
    cartItem = CartItem.query.get(cartItemId)
    if not cartItem:
        return {"error": "CartItem not found"}, 404
    form = CartItemForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        cart = Cart.query.get(cartItem.cartId)
        cart.subtotal += (
            form.data["quantity"] - cartItem.quantity
        ) * cartItem.product.price
        cartItem.quantity = form.data["quantity"]
        db.session.commit()
        return cartItem.to_dict()
    else:
        return {"errors": form.errors}, 401


# DELETE /cartItems/:cartItemId
@cartItem_routes.route("/<int:cartItemId>", methods=["DELETE"])
@login_required
def delete_cartItem(cartItemId):
    if not current_user:
        return {"error": "Unauthorized"}, 401
    cartItem = CartItem.query.get(cartItemId)
    if not cartItem:
        return {"error": "CartItem not found"}, 404
    cart = Cart.query.get(cartItem.cartId)
    cart.subtotal -= cartItem.quantity * cartItem.product.price
    db.session.delete(cartItem)
    db.session.commit()
    return {"message": "CartItem deleted"}
