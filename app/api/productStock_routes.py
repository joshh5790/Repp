from flask import Blueprint
from flask_login import login_required, current_user
from app.models import ProductStock, Cart, CartItem, db
from app.forms import CartItemForm
from flask import request

productStock_routes = Blueprint("productStocks", __name__)


# PUT /productStock/:productStockId
@productStock_routes.route("/<int:productStockId>", methods=["PUT"])
@login_required
def update_product_stock(productStockId):
    """
    Updates a product stock
    """
    if not current_user:
        return {"error": "Unauthorized"}, 401
    productStock = ProductStock.query.get(productStockId)
    if not productStock:
        return {"error": "Product stock not found"}, 404
    if current_user.id != productStock.get_pageOwnerId():
        return {
            "Unauthorized": "User does not have permission to update this stock"
        }, 401
    data = request.get_json()
    productStock.size = data["size"]
    productStock.stock = data["stock"]
    db.session.commit()
    return productStock.to_dict()


# DELETE /productStock/:productStockId
@productStock_routes.route("/<int:productStockId>", methods=["DELETE"])
@login_required
def delete_product_stock(productStockId):
    if not current_user:
        return {"error": "Unauthorized"}, 401
    productStock = ProductStock.query.get(productStockId)
    if not productStock:
        return {"error": "Product stock not found"}, 404
    if current_user.id != productStock.get_pageOwnerId():
        return {
            "Unauthorized": "User does not have permission to delete this stock"
        }, 401
    db.session.delete(productStock)
    db.session.commit()
    return {"message": "Product stock deleted"}


# POST /productStock/:productStockId/cartItems
@productStock_routes.route("/<int:productStockId>/cartItems", methods=["POST"])
@login_required
def create_cart_item(productStockId):
    """
    Query for a productStock by id and creates a cartItem for that product
    """
    if not current_user:
        return {"error": "Unauthorized"}, 401
    productStock = ProductStock.query.get(productStockId)
    if not productStock:
        return {"error": "Product not found or not in stock"}, 404
    product = productStock.get_product()
    curr_cart = current_user.get_one_cart(product["pageId"])
    cart = Cart.query.get(curr_cart["id"])
    cartItems = cart.get_items()
    if not cart:
        return {"error": "Cart not found"}, 404
    form = CartItemForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        data = form.data
        cartItem = None
        for item in cartItems:
            if item["productId"] == product["id"] and item["size"] == productStock.size:
                if data["quantity"] + item["quantity"] > productStock.stock:
                    return {"error": "Not enough stock"}, 400
                cartItem = CartItem.query.get(item["id"])
                cartItem.quantity += data["quantity"]
                break
        if cartItem is None:
            if data["quantity"] > productStock.stock:
                return {"error": "Not enough stock"}, 400
            cartItem = CartItem(
                cartId=cart.id,
                productId=product["id"],
                quantity=data["quantity"],
                size=productStock.size,
            )
            db.session.add(cartItem)

        cart.subtotal += data["quantity"] * product["price"]
        db.session.commit()
        return cartItem.to_dict()
    else:
        return {"errors": form.errors}, 401
