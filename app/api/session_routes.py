from flask import Blueprint
from flask_login import login_required, current_user
from app.models import User, db
from app.forms import SignUpForm
from .auth_routes import validation_errors_to_error_messages

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

@session_routes.route('/account', methods=['PUT'])
@login_required
def update_user():
  if not current_user:
    return {'error': 'Unauthorized'}, 401
  user = User.query.get(current_user.id)
  form = SignUpForm(obj=user)
  if form.validate_on_submit():
    data = form.data
    user.firstname=data['firstname']
    user.lastname=data['lastname']
    user.username=data['username']
    user.email=data['email']
    user.gender=data['gender']
    user.address=data['address']
    user.city=data['city']
    user.state=data['state']
    user.password=data['password']
    user.profileImage=data['profileImage']
    db.session.commit()
    return user.to_dict()
  else:
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@session_routes.route('/account', methods=['DELETE'])
@login_required
def delete_user():
  if not current_user:
    return {'error': 'Unauthorized'}, 401
  user = User.query.get(current_user.id)
  db.session.delete(user)
  db.session.commit()
  return { 'message': 'User deleted successfully' }
