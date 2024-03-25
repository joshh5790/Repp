from flask import Blueprint
from flask_login import login_required, current_user
from app.models import ProfileLink, db
from app.forms import ProfileLinkForm
from flask import request

profileLink_routes = Blueprint("profileLinks", __name__)


# PUT /profileLinks/:profileLinkId
@profileLink_routes.route("/<int:profileLinkId>", methods=["PUT"])
@login_required
def update_profileLink(profileLinkId):
    """
    Updates a profileLink's url
    """
    if not current_user:
        return {"error": "Unauthorized"}, 401
    profileLink = ProfileLink.query.get(profileLinkId)
    if not profileLink:
        return {"error": "ProfileLink not found"}, 404
    if current_user.id != profileLink.get_profileOwnerId():
        return {
            "Unauthorized": "User does not have permission to update this profileLink"
        }, 401
    form = ProfileLinkForm(obj=profileLink)
    print("AAAAAAAAAAAAAAAAAAAAAAAAA")
    print(form.data)
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        data = form.data
        profileLink.text = data["text"]
        profileLink.link = data["link"]
        db.session.commit()
        return profileLink.to_dict()
    else:
        return {"errors": form.errors}, 401


# DELETE /profileLinks/:profileLinkId
@profileLink_routes.route("/<int:profileLinkId>", methods=["DELETE"])
@login_required
def delete_profileLink(profileLinkId):
    if not current_user:
        return {"error": "Unauthorized"}, 401
    profileLink = ProfileLink.query.get(profileLinkId)
    if not profileLink:
        return {"error": "ProfileLink not found"}, 404
    if current_user.id != profileLink.get_profileOwnerId():
        return {
            "Unauthorized": "User does not have permission to delete this profileLink"
        }, 401
    db.session.delete(profileLink)
    db.session.commit()
    return {"message": "ProfileLink deleted"}
