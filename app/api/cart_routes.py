from flask import Blueprint
from flask_login import login_required, current_user
from app.models import Cart, ProductStock, Order, OrderItem, db

cart_routes = Blueprint("carts", __name__)


# DELETE /carts/:cartId
@cart_routes.route("/<int:cartId>", methods=["DELETE"])
@login_required
def delete_cart(cartId):
    if not current_user:
        return {"error": "Unauthorized"}, 401
    cart = Cart.query.get(cartId)
    if not cart:
        return {"error": "Cart not found"}, 404
    if current_user.id != cart.userId:
        return {
            "Unauthorized": "User does not have permission to delete this cart"
        }, 401
    db.session.delete(cart)
    db.session.commit()
    return {"message": "Cart deleted"}

# GET /carts/:cartId/cartItems
@cart_routes.route("/<int:cartId>/cartItems")
@login_required
def get_cart_items(cartId):
    if not current_user:
        return {"error": "Unauthorized"}, 401
    cart = Cart.query.get(cartId)
    if not cart:
        return {"error": "Cart not found"}, 404
    if current_user.id != cart.userId:
        return {"Unauthorized": "User does not have permission to view this cart"}, 401
    return cart.get_items()


# POST /carts/:cartId/orders
@cart_routes.route("/<int:cartId>/orders", methods=["POST"])
@login_required
def create_order(cartId):
    if not current_user:
        return {"error": "Unauthorized"}, 401
    cart = Cart.query.get(cartId)
    if not cart:
        return {"error": "Cart not found"}, 404
    if current_user.id != cart.userId:
        return {"Unauthorized": "User does not have permission to view this cart"}, 401
    cart_dict = cart.to_dict()
    order = Order(
        userId=cart_dict["userId"],
        pageId=cart_dict["pageId"],
        total=cart_dict["subtotal"],
    )
    db.session.add(order)
    db.session.commit()
    cart_items = cart.get_items()
    for item in cart_items:
        orderItem = OrderItem(
            orderId=order.id,
            productId=item["productId"],
            quantity=item["quantity"],
            size=item["size"],
        )
        productStock = ProductStock.query.filter_by(productId=item["productId"], size=item["size"]).first()
        productStock.stock -= item["quantity"]
        if productStock.stock < 0:
            return {"error": "Insufficient stock"}, 400
        db.session.add(orderItem)
    db.session.delete(cart)
    db.session.commit()
    return order.to_dict()
