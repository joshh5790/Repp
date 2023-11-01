# from flask import Blueprint, jsonify
# from flask_login import login_required
# from app.models import Repp

# repp_routes = Blueprint('repps', __name__)


# @repp_routes.route('/')
# @login_required
# def repps():
#     """
#     Query for all repps and returns them in a list of repp dictionaries
#     """
#     repps = Repp.query.all()
#     return {'users': [repp.to_dict() for repp in repps]}


# @repp_routes.route('/<int:id>')
# @login_required
# def user(id):
#     """
#     Query for a user by id and returns that user in a dictionary
#     """
#     repp = Repp.query.get(id)
#     return repp.to_dict()
