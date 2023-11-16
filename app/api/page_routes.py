from flask import Blueprint
from flask_login import login_required, current_user
from app.models import Page, Product, Video, Cart, User, Tour, Follow, db
from app.forms import PageForm, ProductForm, VideoForm, TourForm
from flask import request
from app.utils import embed_video, ensure_https

page_routes = Blueprint("pages", __name__)


# GET /pages/
@page_routes.route("/")
def get_pages():
    """
    Query for all pages and returns them in a list of page dictionaries
    """
    pages = Page.query.all()
    return [page.to_dict() for page in pages]

# GET /pages/home
@page_routes.route('/home')
def get_pages_home():
    pages = Page.query.all()
    return [page.home_page_info() for page in pages]

# POST /pages/
@page_routes.route("/", methods=["POST"])
@login_required
def create_page():
    if not current_user:
        return {"error": "Unauthorized"}, 401
    existing_page = Page.query.filter(Page.userId == current_user.id).first()
    if existing_page:
        return {"Forbidden": "User already has a page"}, 403
    form = PageForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        data = form.data
        new_page = Page(
            userId=current_user.id,
            displayName=data["displayName"],
            linkName=data["linkName"],
            tiktok=ensure_https(data["tiktok"]),
            youtube=ensure_https(data["youtube"]),
            instagram=ensure_https(data["instagram"]),
            applemusic=ensure_https(data["applemusic"]),
            spotify=ensure_https(data["spotify"]),
            facebook=ensure_https(data["facebook"]),
            discord=ensure_https(data["discord"]),
            twitter=ensure_https(data["twitter"]),
            external=ensure_https(data["external"]),
            mainImage=ensure_https(data["mainImage"]),
            mainVideo=ensure_https(embed_video(data["mainVideo"])),
            bio=data["bio"],
            newsletter=data["newsletter"],
            businessInquiries=data["businessInquiries"],
            videoSection=False,
            shopSection=False,
        )
        user = User.query.get(current_user.id)
        user.isRepp = True

        db.session.add(new_page)
        db.session.commit()
        return new_page.to_dict()
    else:
        return {"errors": form.errors}, 401


# PUT /pages/:pageId
@page_routes.route("/<int:pageId>", methods=["PUT"])
@login_required
def update_page(pageId):
    """
    Query for a page by id and updates that page
    """
    if not current_user:
        return {"error": "Unauthorized"}, 401
    page = Page.query.get(pageId)
    if not page:
        return {"error": "Page not found"}, 404
    if page.userId != current_user.id:
        return {
            "Unauthorized": "User does not have permission to update this page"
        }, 401
    form = PageForm(obj=page)
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        data = form.data
        page.displayName = data["displayName"]
        page.linkName = data["linkName"]
        page.tiktok = ensure_https(data["tiktok"])
        page.youtube = ensure_https(data["youtube"])
        page.instagram = ensure_https(data["instagram"])
        page.applemusic = ensure_https(data["applemusic"])
        page.spotify = ensure_https(data["spotify"])
        page.facebook = ensure_https(data["facebook"])
        page.discord = ensure_https(data["discord"])
        page.twitter = ensure_https(data["twitter"])
        page.external = ensure_https(data["external"])
        page.mainImage = ensure_https(data["mainImage"])
        page.mainVideo = ensure_https(embed_video(data["mainVideo"]))
        page.bio = data["bio"]
        page.newsletter = data["newsletter"]
        page.businessInquiries = data["businessInquiries"]
        page.videoSection = data["videoSection"]
        page.shopSection = data["shopSection"]

        db.session.commit()
        return page.to_dict()
    else:
        return {"errors": form.errors}, 401


# DELETE /pages/:pageId
@page_routes.route("/<int:pageId>", methods=["DELETE"])
@login_required
def delete_page(pageId):
    """
    Query for a page by id and deletes that page
    """
    if not current_user:
        return {"error": "Unauthorized"}, 401
    page = Page.query.get(pageId)
    if not page:
        return {"error": "Page not found"}, 404
    if page.userId != current_user.id:
        return {
            "Unauthorized": "User does not have permission to delete this page"
        }, 401

    db.session.delete(page)
    db.session.commit()
    return {"message": "Page deleted successfully"}


# GET /pages/:pageId/products
@page_routes.route("/<int:pageId>/products", methods=["GET"])
def get_products(pageId):
    page = Page.query.get(pageId)
    if not page:
        return {"error": "Page not found"}, 404
    return page.get_products()


# GET /pages/:pageId/videos
@page_routes.route("/<int:pageId>/videos", methods=["GET"])
def get_videos(pageId):
    page = Page.query.get(pageId)
    if not page:
        return {"error": "Page not found"}, 404
    return page.get_videos()


# GET /pages/:pageId/tours
@page_routes.route("/<int:pageId>/tours", methods=["GET"])
def get_tours(pageId):
    page = Page.query.get(pageId)
    if not page:
        return {"error": "Page not found"}, 404
    return page.get_tours()

# GET /pages/:pageId/follows
@page_routes.route("/<int:pageId>/follows", methods=["GET"])
def get_follows(pageId):
    page = Page.query.get(pageId)
    if not page:
        return {"error": "Page not found"}, 404
    return page.get_follows()


# POST /pages/:pageId/products
@page_routes.route("/<int:pageId>/products", methods=["POST"])
@login_required
def create_product(pageId):
    if not current_user:
        return {"error": "Unauthorized"}, 401
    page = Page.query.get(pageId)
    if not page:
        return {"error": "Page not found"}, 404
    if page.userId != current_user.id:
        return {
            "Unauthorized": "User does not have permission to add a product to this page"
        }, 401
    form = ProductForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        data = form.data
        product = Product(
            pageId=pageId,
            name=data["name"],
            price=data["price"],
            description=data["description"],
            previewImage=data["previewImage"],
        )

        db.session.add(product)
        db.session.commit()
        return product.to_dict()
    else:
        return {"errors": form.errors}, 401


# POST /pages/:pageId/videos
@page_routes.route("/<int:pageId>/videos", methods=["POST"])
@login_required
def create_video(pageId):
    if not current_user:
        return {"error": "Unauthorized"}, 401
    page = Page.query.get(pageId)
    if not page:
        return {"error": "Page not found"}, 404
    if page.userId != current_user.id:
        return {
            "Unauthorized": "User does not have permission to add a video to this page"
        }, 401
    form = VideoForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        data = form.data
        video = Video(pageId=pageId, name=data["name"], video=embed_video(data["video"]))

        db.session.add(video)
        db.session.commit()
        return video.to_dict()
    else:
        return {"errors": form.errors}, 401

# POST /pages/:pageId/tours
@page_routes.route("/<int:pageId>/tours", methods=["POST"])
@login_required
def create_tour(pageId):
    if not current_user:
        return {"error": "Unauthorized"}, 401
    page = Page.query.get(pageId)
    if not page:
        return {"error": "Page not found"}, 404
    if page.userId != current_user.id:
        return {
            "Unauthorized": "User does not have permission to add a tour to this page"
        }, 401
    form = TourForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        data = form.data
        tour = Tour(
            pageId=pageId,
            name=data["name"],
            tourLogo=data["tourLogo"],
        )

        db.session.add(tour)
        db.session.commit()
        return tour.to_dict()
    else:
        return {"errors": form.errors}, 401

# POST /pages/:pageId/follow
@page_routes.route("/<int:pageId>/follow", methods=["POST"])
@login_required
def create_follow(pageId):
    if not current_user:
        return {"error": "Unauthorized"}, 401
    page = Page.query.get(pageId)
    if not page:
        return {"error": "Page not found"}, 404
    existingFollow = Follow.query.filter(Follow.userId == current_user.id, Follow.pageId == pageId).first()
    if not existingFollow and current_user.id != page.userId:
        follow = Follow(
            userId=current_user.id,
            pageId=pageId
        )

        db.session.add(follow)
        db.session.commit()
        return follow.to_dict()
    else:
        return {"error": "User already follows this page"}, 401

# GET /pages/:pageId/cart
@page_routes.route("/<int:pageId>/cart", methods=["GET"])
@login_required
def get_cart(pageId):
    if not current_user:
        return {"error": "Unauthorized"}, 401
    return current_user.get_one_cart(pageId)

# POST /pages/:pageId/cart
@page_routes.route("/<int:pageId>/cart", methods=["POST"])
@login_required
def create_cart(pageId):
    if not current_user:
        return {"error": "Unauthorized"}, 401
    page = Page.query.get(pageId)
    if not page:
        return {"error": "Page not found"}, 404
    existing_cart = current_user.get_one_cart(pageId)
    if existing_cart:
        return {"error": "User already has a cart for this page"}, 401
    cart = Cart(pageId=pageId, userId=current_user.id, subtotal=0)

    db.session.add(cart)
    db.session.commit()
    return cart.to_dict()


# GET /pages/:linkName
@page_routes.route("/<linkName>")
def get_page(linkName):
    """
    Query for a page by id and returns that page in a dictionary
    """
    page = Page.query.filter(Page.linkName == linkName).first()
    if not page:
        return {"error": "Page not found"}, 404
    return page.to_dict()
