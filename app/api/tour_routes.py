from flask import Blueprint
from flask_login import login_required, current_user
from app.models import Tour, TourLocation, db
from app.forms import TourForm, TourLocationForm
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
    if current_user.id != tour.get_pageOwnerId():
        return {
            "Unauthorized": "User does not have permission to update this tour"
        }, 401
    form = TourForm(obj=tour)
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        tour.name = form.data["name"]
        tour.tourLogo = form.data["tourLogo"]
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
    if current_user.id != tour.get_pageOwnerId():
        return {
            "Unauthorized": "User does not have permission to delete this tour"
        }, 401
    db.session.delete(tour)
    db.session.commit()
    return {"message": "Tour deleted"}


# GET /tours/:tourId/tourLocations
@tour_routes.route("/<int:tourId>/tourLocations")
def get_tour_locations(tourId):
    tour = Tour.query.get(tourId)
    if not tour:
        return {"error": "Tour not found"}, 404
    return tour.get_locations()

# POST /tours/:tourId/tourLocations
@tour_routes.route("/<int:tourId>/tourLocations", methods=["POST"])
@login_required
def add_tour_location(tourId):
    if not current_user:
        return {"error": "Unauthorized"}, 401
    tour = Tour.query.get(tourId)
    if not tour:
        return {"error": "Tour not found"}, 404
    if current_user.id != tour.get_pageOwnerId():
        return {
            "Unauthorized": "User does not have permission to delete this tour"
        }, 401
    form = TourLocationForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        data = form.data
        tourLocation = TourLocation(
        tourId=tour.id,
        venue = data["venue"],
        location = data["location"],
        tourDate = data["tourDate"],
        ticketsLink = data["ticketsLink"],
        )
        db.session.add(tourLocation)
        db.session.commit()
        return tourLocation.to_dict()
    else:
        return {"errors": form.errors}, 401
