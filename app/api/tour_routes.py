from flask import Blueprint
from flask_login import login_required, current_user
from app.models import Tour, db
from app.forms import TourForm
from flask import request

tour_routes = Blueprint("tours", __name__)


# PUT /tours/:tourId
@tour_routes.route("/<int:tourId>", methods=["PUT"])
@login_required
def update_tour(tourId):
    """
    Updates a tour's url
    """
    if not current_user:
        return {"error": "Unauthorized"}, 401
    tour = Tour.query.get(tourId)
    if not tour:
        return {"error": "Tour not found"}, 404
    if current_user.id != tour.get_profileOwnerId():
        return {
            "Unauthorized": "User does not have permission to update this tour"
        }, 401
    form = TourForm(obj=tour)
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        data = form.data
        tour.venue = data["venue"]
        tour.location = data["location"]
        tour.tourDate = data["tourDate"]
        tour.ticketsLink = data["ticketsLink"]
        tour.soldOut = data["soldOut"]
        db.session.commit()
        return tour.to_dict()
    else:
        return {"errors": form.errors}, 401


# DELETE /tours/:tourId
@tour_routes.route("/<int:tourId>", methods=["DELETE"])
@login_required
def delete_tour(tourId):
    if not current_user:
        return {"error": "Unauthorized"}, 401
    tour = Tour.query.get(tourId)
    if not tour:
        return {"error": "Tour not found"}, 404
    if current_user.id != tour.get_profileOwnerId():
        return {
            "Unauthorized": "User does not have permission to delete this tour"
        }, 401
    db.session.delete(tour)
    db.session.commit()
    return {"message": "Tour deleted"}
