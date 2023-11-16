from flask import Blueprint
from flask_login import login_required, current_user
from app.models import Follow, User, db
from flask import request

follow_routes = Blueprint("follows", __name__)


# PUT /follows/:followId
@follow_routes.route("/<int:followId>", methods=["PUT"])
@login_required
def update_follow(followId):
    """
    Updates a follow's url
    """
    if not current_user:
        return {"error": "Unauthorized"}, 401
    follow = Follow.query.get(followId)
    if not follow:
        return {"error": "Follow not found"}, 404
    pepps = request.get_json()["pepps"]
    if pepps + follow.pepps < 0:
        if current_user.premiumPepps + follow.pepps + pepps > 0:
            user = User.query.get(follow.userId)
            pepps -= follow.pepps
            follow.pepps = 0
            user.premiumPepps += pepps
        else:
            return {"error": "Insufficient pepps"}, 404
    else:
        follow.pepps += pepps
    db.session.commit()
    return follow.to_dict()


# DELETE /follows/:followId
@follow_routes.route("/<int:followId>", methods=["DELETE"])
@login_required
def delete_follow(followId):
    if not current_user:
        return {"error": "Unauthorized"}, 401
    follow = Follow.query.get(followId)
    if not follow:
        return {"error": "Follow not found"}, 404
    db.session.delete(follow)
    db.session.commit()
    return {"message": "Follow deleted"}
