from flask import Blueprint
from flask_login import login_required, current_user
from app.models import ProductImage, db
from app.forms import ProductImageForm
from .auth_routes import validation_errors_to_error_messages
from flask import request

productImage_routes = Blueprint('productImages', __name__)

# PUT /productImages/:productImageId
@productImage_routes.route('/<int:productImageId>', methods=['PUT'])
@login_required
def update_product_image(productImageId):
  """
  Updates a product image
  """
  if not current_user:
    return {'error': 'Unauthorized'}, 401
  productImage = ProductImage.query.get(productImageId)
  if not productImage:
    return { 'error': 'Product image not found' }, 404
  if current_user.id != productImage.get_pageOwnerId():
    return { 'Unauthorized': 'User does not have permission to update this product image' }, 401
  form = ProductImageForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    productImage.image = form.data['image']
    db.session.commit()
    return productImage.to_dict()
  else:
    return { 'errors': form.errors }, 401

# DELETE /productImages/:productImageId
@productImage_routes.route('/<int:productImageId>', methods=['DELETE'])
@login_required
def delete_product_image(productImageId):
  if not current_user:
    return {'error': 'Unauthorized'}, 401
  productImage = ProductImage.query.get(productImageId)
  if not productImage:
    return { 'error': 'Product image not found' }, 404
  if current_user.id != productImage.get_pageOwnerId():
    return { 'Unauthorized': 'User does not have permission to delete this product image' }, 401
  db.session.delete(productImage)
  db.session.commit()
  return { 'message': 'Product image deleted' }
