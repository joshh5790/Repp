import os
from flask import Flask, request, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager
from .models import db, User
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.profile_routes import profile_routes
from .api.profileLink_routes import profileLink_routes
from .api.product_routes import product_routes
from .api.productImage_routes import productImage_routes
from .api.productStock_routes import productStock_routes
from .api.video_routes import video_routes
from .api.cart_routes import cart_routes
from .api.cartItem_routes import cartItem_routes
from .api.session_routes import session_routes
from .api.checkout_routes import checkout_routes
from .api.order_routes import order_routes
from .api.tour_routes import tour_routes
from .api.follow_routes import follow_routes
from .seeds import seed_commands
from .config import Config
import stripe

app = Flask(__name__, static_folder="../react-app/build", static_url_path="/")

# Setup login manager
login = LoginManager(app)
login.login_view = "auth.unauthorized"


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
stripe.api_key=app.config['STRIPE_SECRET_KEY']
app.register_blueprint(user_routes, url_prefix="/api/users")
app.register_blueprint(auth_routes, url_prefix="/api/auth")
app.register_blueprint(profile_routes, url_prefix="/api/profiles")
app.register_blueprint(profileLink_routes, url_prefix="/api/profileLinks")
app.register_blueprint(product_routes, url_prefix="/api/products")
app.register_blueprint(productImage_routes, url_prefix="/api/productImages")
app.register_blueprint(productStock_routes, url_prefix="/api/productStock")
app.register_blueprint(video_routes, url_prefix="/api/videos")
app.register_blueprint(cart_routes, url_prefix="/api/carts")
app.register_blueprint(cartItem_routes, url_prefix="/api/cartItems")
app.register_blueprint(session_routes, url_prefix="/api/session")
app.register_blueprint(checkout_routes, url_prefix="/api/checkout")
app.register_blueprint(order_routes, url_prefix="/api/orders")
app.register_blueprint(tour_routes, url_prefix="/api/tours")
app.register_blueprint(follow_routes, url_prefix="/api/follows")
db.init_app(app)
Migrate(app, db)

# Application Security
CORS(app)


# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
# Well.........
@app.before_request
def https_redirect():
    if os.environ.get("FLASK_ENV") == "production":
        if request.headers.get("X-Forwarded-Proto") == "http":
            url = request.url.replace("http://", "https://", 1)
            code = 301
            return redirect(url, code=code)

# @app.after_request
# def add_csp(response):
#     csp = "default-src 'self'; "
#     csp += "script-src 'self' https://kit.fontawesome.com/ https://connect-js.stripe.com https://js.stripe.com https://checkout.stripe.com https://maps.googleapis.com; "
#     csp += "connect-src 'self' https://api.stripe.com https://checkout.stripe.com https://maps.googleapis.com; "
#     csp += "frame-src 'self' https://connect-js.stripe.com https://js.stripe.com https://checkout.stripe.com https://hooks.stripe.com; "
#     csp += "img-src 'self' https://*.stripe.com; "
#     response.headers['Content-Security-Policy'] = csp
#     return response

@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        "csrf_token",
        generate_csrf(),
        secure=True if os.environ.get("FLASK_ENV") == "production" else False,
        samesite="Strict" if os.environ.get("FLASK_ENV") == "production" else None,
        httponly=True,
    )
    return response


@app.route("/api/docs")
def api_help():
    """
    Returns all API routes and their doc strings
    """
    acceptable_methods = ["GET", "POST", "PUT", "PATCH", "DELETE"]
    route_list = {
        rule.rule: [
            [method for method in rule.methods if method in acceptable_methods],
            app.view_functions[rule.endpoint].__doc__,
        ]
        for rule in app.url_map.iter_rules()
        if rule.endpoint != "static"
    }
    return route_list


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def react_root(path):
    """
    This route will direct to the public directory in our
    react builds in the production environment for favicon
    or index.html requests
    """
    if path == "favicon.ico":
        return app.send_from_directory("public", "favicon.ico")
    return app.send_static_file("index.html")


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file("index.html")
