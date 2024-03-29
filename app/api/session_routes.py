from flask import Blueprint
from flask_login import login_required, current_user
from app.models import User, Genre, db
from app.forms import SignUpForm
from flask import request

session_routes = Blueprint("session", __name__)


# GET /session/genres
@session_routes.route("/genres")
def get_genres():
    genres = Genre.query.all()
    return {"genres": [genre.to_dict() for genre in genres]}


# GET /session/carts
@session_routes.route("/carts")
@login_required
def get_user_carts():
    if not current_user:
        return {"error": "Unauthorized"}, 401
    return current_user.get_carts()


# GET /session/profile
@session_routes.route("/profile")
@login_required
def get_user_profile():
    if not current_user:
        return {"error": "Unauthorized"}, 401
    return current_user.get_profile()


# GET /session/orders
@session_routes.route("/orders")
@login_required
def get_user_orders():
    if not current_user:
        return {"error": "Unauthorized"}, 401
    return current_user.get_orders()


# GET /session/follows
@session_routes.route("/follows")
@login_required
def get_user_follows():
    if not current_user:
        return {"error": "Unauthorized"}, 401
    return current_user.get_follows()


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
        user.address1 = data["address1"]
        user.address2 = data["address2"]
        user.city = data["city"]
        user.country = data["country"]
        user.subregion = data["subregion"]
        user.postal_code = data["postal_code"]
        user.password = data["password"]
        user.isRepp = data["isRepp"]
        user.profileImage = data["profileImage"]
        db.session.commit()
        return user.to_dict()
    else:
        return {"errors": form.errors}, 401


# PUT /session/premiumPepps
@session_routes.route("/premiumPepps", methods=["PUT"])
@login_required
def add_user_pepps():
    if not current_user:
        return {"error": "Unauthorized"}, 401
    premiumPepps = request.get_json()["premiumPepps"]
    user = User.query.get(current_user.id)
    user.premiumPepps += premiumPepps
    db.session.commit()
    return user.to_dict()


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
