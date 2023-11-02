from flask import Blueprint
from flask_login import login_required, current_user
from app.models import Product, ProductImage, ProductStock, db
from app.forms import ProductForm, ProductImageForm, ProductStockForm
from .auth_routes import validation_errors_to_error_messages
from flask import request

product_routes = Blueprint('products', __name__)

# GET /products/:productId
@product_routes.route('/<int:productId>')
def get_product(productId):
	"""
  Query for a product by id and returns that product in a dictionary
  """
	product = Product.query.get(productId)
	if not product:
		return { 'error': 'Product not found' }, 404
	return product.to_dict()

# PUT /products/:productId
@product_routes.route('/<int:productId>', methods=['PUT'])
@login_required
def update_product(productId):
  """
  Query for a product by id and returns that product in a dictionary
  """
  if not current_user:
    return { 'error': 'Unauthorized' }, 401
  product = Product.query.get(productId)
  if not product:
    return { 'error': 'Product not found' }, 404
  if current_user.id != product.get_pageOwnerId():
    return { 'Unauthorized': 'User does not have permission to update this product' }, 401
  form = ProductForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    data = form.data
    product.name = data['name']
    product.price = data['price']
    product.description = data['description']
    product.previewImage = data['previewImage']
    db.session.commit()
    return product.to_dict()
  else:
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# DELETE /products/:productId
@product_routes.route('/<int:productId>', methods=['DELETE'])
@login_required
def delete_product(productId):
    """
    Query for a product by id and deletes that product
    """
    if not current_user:
      return { 'error': 'Unauthorized' }, 401
    product = Product.query.get(productId)
    if not product:
      return { 'error': 'Product not found' }, 404
    if current_user.id != product.get_pageOwnerId():
      return { 'Unauthorized': 'User does not have permission to delete this product' }, 401

    db.session.delete(product)
    db.session.commit()
    return { 'message': 'Product deleted successfully' }

# GET /products/:productId/productImages
@product_routes.route('/<int:productId>/productImages')
def get_product_images(productId):
    """
    Query for a product by id and returns its productImages in a list
    """
    product = Product.query.get(productId)
    if not product:
      return { 'error': 'Product not found' }, 404
    return product.get_images()

# GET /products/:productid/productStocks
@product_routes.route('/<int:productId>/productStocks')
def get_product_stocks(productId):
    """
    Query for a product by id and returns its productStocks in a list
    """
    product = Product.query.get(productId)
    if not product:
      return { 'error': 'Product not found' }, 404
    return product.get_stock()

# POST /products/:productId/productImages
@product_routes.route('/<int:productId>/productImages', methods=['POST'])
@login_required
def create_product_image(productId):
  """
  Query for a product by id and creates a productImage for that product
  """
  if not current_user:
    return { 'error': 'Unauthorized' }, 401
  product = Product.query.get(productId)
  if not product:
    return { 'error': 'Product not found' }, 404
  if current_user.id != product.get_pageOwnerId():
    return { 'Unauthorized': 'User does not have permission to add a product image to this product' }, 401
  form = ProductImageForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    data = form.data
    productImage = ProductImage(
      productId=productId,
      image=data['image']
    )
    db.session.add(productImage)
    db.session.commit()
    return productImage.to_dict()
  else:
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# POST /products/:productId/productStocks
@product_routes.route('/<int:productId>/productStocks', methods=['POST'])
@login_required
def create_product_stock(productId):
  """
  Query for a product by id and creates a productStock for that product
  """
  if not current_user:
    return { 'error': 'Unauthorized' }, 401
  product = Product.query.get(productId)
  if not product:
    return { 'error': 'Product not found' }, 404
  if current_user.id != product.get_pageOwnerId():
    return { 'Unauthorized': 'User does not have permission to add a product stock to this product' }, 401
  form = ProductStockForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    data = form.data
    productStock = ProductStock(
      productId=productId,
      size=data['size'],
      stock=data['stock']
    )
    db.session.add(productStock)
    db.session.commit()
    return productStock.to_dict()
  else:
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# move to productStock
