from flask import Blueprint
from flask_login import login_required, current_user
from app.models import db

session_routes = Blueprint('session', __name__)

# GET /session/carts
@session_routes.route('/carts')
@login_required
def get_user_carts():
  if not current_user:
    return {'error': 'Unauthorized'}, 401
  return current_user.get_carts()

# GET /session/page
@session_routes.route('/page')
@login_required
def get_user_page():
    if not current_user:
      return {'error': 'Unauthorized'}, 401
    return current_user.get_page()
