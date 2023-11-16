from flask import Blueprint
from flask_login import login_required
from app.models import Order

order_routes = Blueprint("orders", __name__)


# GET /order/:orderId
@order_routes.route("/<int:orderId>")
@login_required
def get_order(orderId):
    order = Order.query.get(orderId)
    if not order:
        return {"errors": "Order not found"}, 404
    return order.to_dict()

# GET /orders/:orderId/orderItems
@order_routes.route("/<int:orderId>/orderItems")
@login_required
def get_order_items(orderId):
    order = Order.query.get(orderId)
    if not order:
        return {"errors": "Order not found"}, 404
    return order.get_items()
