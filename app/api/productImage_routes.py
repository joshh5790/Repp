# from flask import Blueprint
# from flask_login import login_required, current_user
# from app.models import Page, Product, ProductImage, ProductStock, db
# from app.forms import ProductForm, ProductImageForm, ProductStockForm
# from .auth_routes import validation_errors_to_error_messages
# from flask import request

# product_routes = Blueprint('products', __name__)

# # PUT /productImages/:productImageId
# @product_routes.route('/<int:productImageId>', methods=['PUT'])
# @login_required
# def update_product_image(productImageId):
#   """
#   Updates a product image
#   """
#   productImage = ProductImage.query.get(productImageId)
#   if not productImage:
#     return { 'error': 'Product image not found' }, 404
#   product = Product.query.get(productImage.productId)
#   if not product:
#     return { 'error': 'Product not found' }, 404
#   page = Page.query.get(product.pageId)
#   if not page:
#     return { 'error': 'Page not found' }, 404
#   form = ProductImageForm()
#   form['csrf_token'].data = request.cookies['csrf_token']
#   if form.validate_on_submit():
#     productImage.image = form.data['image']
#     db.session.commit()
#     return productImage.to_dict()
#   else:
#     return {'errors': validation_errors_to_error_messages(form.errors)}, 400
