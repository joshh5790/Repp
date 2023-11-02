from flask import Blueprint
from flask_login import login_required, current_user
from app.models import Cart, db

cart_routes = Blueprint('carts', __name__)

# DELETE /carts/:cartId
@cart_routes.route('/<int:cartId>', methods=['DELETE'])
@login_required
def delete_cart(cartId):
  if not current_user:
    return {'error': 'Unauthorized'}, 401
  cart = Cart.query.get(cartId)
  if not cart:
    return { 'error': 'Cart not found' }, 404
  if current_user.id != cart.userId:
    return { 'Unauthorized': 'User does not have permission to delete this cart' }, 401
  db.session.delete(cart)
  db.session.commit()
  return { 'message': 'Cart deleted' }
