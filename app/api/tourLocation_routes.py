from flask import Blueprint
from flask_login import login_required, current_user
from app.models import TourLocation, db
from app.forms import TourLocationForm
from flask import request

tourLocation_routes = Blueprint("tourLocations", __name__)


# PUT /tourLocations/:tourLocationId
@tourLocation_routes.route("/<int:tourLocationId>", methods=["PUT"])
@login_required
def update_tourLocation(tourLocationId):
    """
    Updates a tourLocation's url
    """
    if not current_user:
        return {"error": "Unauthorized"}, 401
    tourLocation = TourLocation.query.get(tourLocationId)
    if not tourLocation:
        return {"error": "TourLocation not found"}, 404
    if current_user.id != tourLocation.get_pageOwnerId():
        return {
            "Unauthorized": "User does not have permission to update this tourLocation"
        }, 401
    form = TourLocationForm(obj=tourLocation)
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        data = form.data
        tourLocation.venue = data["venue"]
        tourLocation.location = data["location"]
        tourLocation.tourDate = data["tourDate"]
        tourLocation.ticketsLink = data["ticketsLink"]
        tourLocation.rsvpLink = data["rsvpLink"]
        tourLocation.faqLink = data["faqLink"]
        db.session.commit()
        return tourLocation.to_dict()
    else:
        return {"errors": form.errors}, 401


# DELETE /tourLocations/:tourLocationId
@tourLocation_routes.route("/<int:tourLocationId>", methods=["DELETE"])
@login_required
def delete_tourLocation(tourLocationId):
    if not current_user:
        return {"error": "Unauthorized"}, 401
    tourLocation = TourLocation.query.get(tourLocationId)
    if not tourLocation:
        return {"error": "TourLocation not found"}, 404
    if current_user.id != tourLocation.get_pageOwnerId():
        return {
            "Unauthorized": "User does not have permission to delete this tourLocation"
        }, 401
    db.session.delete(tourLocation)
    db.session.commit()
    return {"message": "TourLocation deleted"}
