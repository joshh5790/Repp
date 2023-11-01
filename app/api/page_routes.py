from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Page, Product, Video, Cart, db
from app.forms import PageForm, ProductForm, VideoForm
from .auth_routes import validation_errors_to_error_messages
from flask import request



page_routes = Blueprint('pages', __name__)

# GET /pages/
@page_routes.route('/')
@login_required
def get_pages():
  """
  Query for all pages and returns them in a list of page dictionaries
  """
  pages = Page.query.all()
  return {'pages': [page.to_dict() for page in pages]}

# GET /pages/:pageId
@page_routes.route('/<int:id>')
@login_required
def get_page(id):
  """
  Query for a page by id and returns that page in a dictionary
  """
  page = Page.query.get(id)
  if not page:
    return { 'error': 'Page not found' }, 404
  return page.to_dict()

# POST /pages/
@page_routes.route('/', methods=['POST'])
@login_required
def create_page():
  if not current_user:
    return { 'error': 'Unauthorized' }, 401
  existing_page = Page.query.filter(Page.userId == current_user.id).first()
  if existing_page:
    return { 'Forbidden': 'User already has a page' }, 403
  form = PageForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    data = form.data
    new_page = Page(
      userId=current_user.id,
      displayName=data['displayName'],
      linkName=data['linkName'],
      tiktok=data['tiktok'],
      youtube=data['youtube'],
      instagram=data['instagram'],
      applemusic=data['applemusic'],
      spotify=data['spotify'],
      twitter=data['twitter'],
      external=data['external'],
      mainImage=data['mainImage'],
      isBanner=data['isBanner'],
      mainVideo=data['mainVideo'],
      bio=data['bio'],
      newsletter=data['newsletter'],
      businessInquiries=data['businessInquiries'],
      videoSection=data['videoSection'],
      shopSection=data['shopSection']
    )

    db.session.add(new_page)
    db.session.commit()
    return new_page.to_dict()
  else:
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# PUT /pages/:pageId
@page_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_page(id):
  """
  Query for a page by id and updates that page
  """
  if not current_user:
    return { 'error': 'Unauthorized' }, 401
  page = Page.query.get(id)
  if not page:
    return { 'error': 'Page not found' }, 404
  if page.userId != current_user.id:
    return { 'Unauthorized': 'User does not have permission to update this page' }, 401
  form = PageForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    data = form.data
    page.displayName = data['displayName']
    page.linkName = data['linkName']
    page.tiktok = data['tiktok']
    page.youtube = data['youtube']
    page.instagram = data['instagram']
    page.applemusic = data['applemusic']
    page.spotify = data['spotify']
    page.twitter = data['twitter']
    page.external = data['external']
    page.mainImage = data['mainImage']
    page.isBanner = data['isBanner']
    page.mainVideo = data['mainVideo']
    page.bio = data['bio']
    page.newsletter = data['newsletter']
    page.businessInquiries = data['businessInquiries']
    page.videoSection = data['videoSection']
    page.shopSection = data['shopSection']

    db.session.commit()
    return page.to_dict()
  else:
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# DELETE /pages/:pageId
@page_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_page(id):
  """
  Query for a page by id and deletes that page
  """
  if not current_user:
    return { 'error': 'Unauthorized' }, 401
  page = Page.query.get(id)
  if not page:
    return { 'error': 'Page not found' }, 404
  if page.userId != current_user.id:
    return { 'Unauthorized': 'User does not have permission to delete this page' }, 401

  db.session.delete(page)
  db.session.commit()
  return { 'message': 'Page deleted successfully' }

# GET /pages/:pageId/products
@page_routes.route('/<int:id>/products', methods=['GET'])
def get_products(id):
  page = Page.query.get(id)
  if not page:
    return { 'error': 'Page not found' }, 404
  return page.get_products()

# GET /pages/:pageId/videos
@page_routes.route('/<int:id>/videos', methods=['GET'])
def get_videos(id):
  page = Page.query.get(id)
  if not page:
    return { 'error': 'Page not found' }, 404
  return page.get_videos()

# POST /pages/:pageId/products
@page_routes.route('/<int:id>/products', methods=['POST'])
@login_required
def create_product(id):
  if not current_user:
    return { 'error': 'Unauthorized' }, 401
  page = Page.query.get(id)
  if not page:
    return { 'error': 'Page not found' }, 404
  if page.userId != current_user.id:
    return { 'Unauthorized': 'User does not have permission to add a product to this page' }, 401
  form = ProductForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    data = form.data
    product = Product(
      pageId=id,
      name=data['name'],
      price=data['price'],
      description=data['description'],
      previewImage=data['previewImage']
    )

    db.session.add(product)
    db.session.commit()
    return product.to_dict()
  else:
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# POST /pages/:pageId/videos
@page_routes.route('/<int:id>/videos', methods=['POST'])
@login_required
def create_video(id):
  if not current_user:
    return { 'error': 'Unauthorized' }, 401
  page = Page.query.get(id)
  if not page:
    return { 'error': 'Page not found' }, 404
  if page.userId != current_user.id:
    return { 'Unauthorized': 'User does not have permission to add a video to this page' }, 401
  form = VideoForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    data = form.data
    video = Video(
      pageId=id,
      name=data['name'],
      video=data['video']
    )

    db.session.add(video)
    db.session.commit()
    return video.to_dict()
  else:
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# POST /pages/:pageId/cart
@page_routes.route('/<int:id>/cart', methods=['POST'])
@login_required
def create_cart(id):
  if not current_user:
    return { 'error': 'Unauthorized' }, 401
  page = Page.query.get(id)
  if not page:
    return { 'error': 'Page not found' }, 404
  cart = Cart(
    pageId=id,
    userId=current_user.id,
    subtotal=0
  )

  db.session.add(cart)
  db.session.commit()
  return cart.to_dict()
