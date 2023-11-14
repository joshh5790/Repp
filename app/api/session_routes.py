from flask import Blueprint
from flask_login import login_required, current_user
from app.models import User, db
from app.forms import SignUpForm
from .auth_routes import validation_errors_to_error_messages
from flask import request

session_routes = Blueprint("session", __name__)


# GET /session/carts
@session_routes.route("/carts")
@login_required
def get_user_carts():
    if not current_user:
        return {"error": "Unauthorized"}, 401
    return current_user.get_carts()


# GET /session/page
@session_routes.route("/page")
@login_required
def get_user_page():
    if not current_user:
        return {"error": "Unauthorized"}, 401
    return current_user.get_page()


# PUT /session/account
@session_routes.route("/account", methods=["PUT"])
@login_required
def update_user():
    if not current_user:
        return {"error": "Unauthorized"}, 401
    user = User.query.get(current_user.id)
    form = SignUpForm(obj=user)
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        data = form.data
        user.firstName = data["firstName"]
        user.lastName = data["lastName"]
        user.email = data["email"]
        user.gender = data["gender"]
        user.address = data["address"]
        user.city = data["city"]
        user.state = data["state"]
        user.password = data["password"]
        user.isRepp = data['isRepp']
        user.profileImage = data["profileImage"]
        db.session.commit()
        return user.to_dict()
    else:
        return {"errors": form.errors}, 401


# DELETE /session/account
@session_routes.route("/account", methods=["DELETE"])
@login_required
def delete_user():
    if not current_user:
        return {"error": "Unauthorized"}, 401
    user = User.query.get(current_user.id)
    db.session.delete(user)
    db.session.commit()
    return {"message": "User deleted successfully"}
