from flask import Blueprint
from flask_login import login_required, current_user
from app.models import Profile, Product, Video, Cart, User, Follow, Tour, db
from app.forms import ProfileForm, ProductForm, VideoForm, TourForm
from flask import request
from app.utils import embed_video, ensure_https

profile_routes = Blueprint("profiles", __name__)


# GET /profiles/
@profile_routes.route("/")
def get_profiles():
    """
    Query for all profiles and returns them in a list of profile dictionaries
    """
    profiles = Profile.query.all()
    return [profile.to_dict() for profile in profiles]


# GET /profiles/home
@profile_routes.route("/home")
def get_profiles_home():
    profiles = Profile.query.limit(5).all()
    return [profile.home_page_info() for profile in profiles]


# GET /profiles/search
@profile_routes.route("/search")
def get_profiles_search():
    query = request.args.get("query")
    profiles = Profile.query.filter(Profile.displayName.ilike(f"%{query}%")).all()
    if not len(profiles):
        return {"profiles": []}
    return [profile.to_dict() for profile in profiles]


# GET /profiles/id/:profileId
@profile_routes.route("/id/<int:profileId>")
def get_profile_by_id(profileId):
    """
    Query for a profile by id and returns that profile in a dictionary
    """
    profile = Profile.query.get(profileId)
    return profile.to_dict()


# POST /profiles/
@profile_routes.route("/", methods=["POST"])
@login_required
def create_profile():
    if not current_user:
        return {"error": "Unauthorized"}, 401
    existing_profile = Profile.query.filter(Profile.userId == current_user.id).first()
    if existing_profile:
        return {"Forbidden": "User already has a profile"}, 403
    form = ProfileForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        data = form.data
        new_profile = Profile(
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
            tourName=data["tourName"],
        )
        user = User.query.get(current_user.id)
        user.isRepp = True

        db.session.add(new_profile)
        db.session.commit()
        return new_profile.to_dict()
    else:
        return {"errors": form.errors}, 401


# PUT /profiles/:profileId
@profile_routes.route("/<int:profileId>", methods=["PUT"])
@login_required
def update_profile(profileId):
    """
    Query for a profile by id and updates that profile
    """
    if not current_user:
        return {"error": "Unauthorized"}, 401
    profile = Profile.query.get(profileId)
    if not profile:
        return {"error": "Profile not found"}, 404
    if profile.userId != current_user.id:
        return {
            "Unauthorized": "User does not have permission to update this profile"
        }, 401
    form = ProfileForm(obj=profile)
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        data = form.data
        profile.displayName = data["displayName"]
        profile.linkName = data["linkName"]
        profile.tiktok = ensure_https(data["tiktok"])
        profile.youtube = ensure_https(data["youtube"])
        profile.instagram = ensure_https(data["instagram"])
        profile.applemusic = ensure_https(data["applemusic"])
        profile.spotify = ensure_https(data["spotify"])
        profile.facebook = ensure_https(data["facebook"])
        profile.discord = ensure_https(data["discord"])
        profile.twitter = ensure_https(data["twitter"])
        profile.external = ensure_https(data["external"])
        profile.mainImage = ensure_https(data["mainImage"])
        profile.mainVideo = ensure_https(embed_video(data["mainVideo"]))
        profile.bio = data["bio"]
        profile.newsletter = data["newsletter"]
        profile.businessInquiries = data["businessInquiries"]
        profile.videoSection = data["videoSection"]
        profile.shopSection = data["shopSection"]
        profile.tourName = data["tourName"]

        db.session.commit()
        return profile.to_dict()
    else:
        return {"errors": form.errors}, 401


# DELETE /profiles/:profileId
@profile_routes.route("/<int:profileId>", methods=["DELETE"])
@login_required
def delete_profile(profileId):
    """
    Query for a profile by id and deletes that profile
    """
    if not current_user:
        return {"error": "Unauthorized"}, 401
    profile = Profile.query.get(profileId)
    if not profile:
        return {"error": "Profile not found"}, 404
    if profile.userId != current_user.id:
        return {
            "Unauthorized": "User does not have permission to delete this profile"
        }, 401

    db.session.delete(profile)
    db.session.commit()
    return {"message": "Profile deleted successfully"}


# GET /profiles/:profileId/products
@profile_routes.route("/<int:profileId>/products", methods=["GET"])
def get_products(profileId):
    profile = Profile.query.get(profileId)
    if not profile:
        return {"error": "Profile not found"}, 404
    return profile.get_products()


# GET /profiles/:profileId/videos
@profile_routes.route("/<int:profileId>/videos", methods=["GET"])
def get_videos(profileId):
    profile = Profile.query.get(profileId)
    if not profile:
        return {"error": "Profile not found"}, 404
    return profile.get_videos()


# GET /profiles/:profileId/tours
@profile_routes.route("/<int:profileId>/tours", methods=["GET"])
def get_tours(profileId):
    profile = Profile.query.get(profileId)
    if not profile:
        return {"error": "Profile not found"}, 404
    return profile.get_tours()


# GET /profiles/:profileId/follows
@profile_routes.route("/<int:profileId>/follows", methods=["GET"])
def get_follows(profileId):
    profile = Profile.query.get(profileId)
    if not profile:
        return {"error": "Profile not found"}, 404
    return profile.get_follows()


# POST /profiles/:profileId/products
@profile_routes.route("/<int:profileId>/products", methods=["POST"])
@login_required
def create_product(profileId):
    if not current_user:
        return {"error": "Unauthorized"}, 401
    profile = Profile.query.get(profileId)
    if not profile:
        return {"error": "Profile not found"}, 404
    if profile.userId != current_user.id:
        return {
            "Unauthorized": "User does not have permission to add a product to this profile"
        }, 401
    form = ProductForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        data = form.data
        product = Product(
            profileId=profileId,
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


# POST /profiles/:profileId/videos
@profile_routes.route("/<int:profileId>/videos", methods=["POST"])
@login_required
def create_video(profileId):
    if not current_user:
        return {"error": "Unauthorized"}, 401
    profile = Profile.query.get(profileId)
    if not profile:
        return {"error": "Profile not found"}, 404
    if profile.userId != current_user.id:
        return {
            "Unauthorized": "User does not have permission to add a video to this profile"
        }, 401
    form = VideoForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        data = form.data
        video = Video(
            profileId=profileId, name=data["name"], video=embed_video(data["video"])
        )

        db.session.add(video)
        db.session.commit()
        return video.to_dict()
    else:
        return {"errors": form.errors}, 401


# POST /profiles/:profileId/tours
@profile_routes.route("/<int:profileId>/tours", methods=["POST"])
@login_required
def create_tour(profileId):
    if not current_user:
        return {"error": "Unauthorized"}, 401
    profile = Profile.query.get(profileId)
    if not profile:
        return {"error": "Profile not found"}, 404
    if profile.userId != current_user.id:
        return {
            "Unauthorized": "User does not have permission to add a video to this profile"
        }, 401
    form = TourForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    print(form.validate_on_submit())
    print(form.data)
    if form.validate_on_submit():
        data = form.data
        tour = Tour(
            profileId=profileId,
            venue=data["venue"],
            location=data["location"],
            tourDate=data["tourDate"],
            ticketsLink=data["ticketsLink"],
        )

        db.session.add(tour)
        db.session.commit()
        return tour.to_dict()
    else:
        return {"errors": form.errors}, 401


# POST /profiles/:profileId/follow
@profile_routes.route("/<int:profileId>/follows", methods=["POST"])
@login_required
def create_follow(profileId):
    if not current_user:
        return {"error": "Unauthorized"}, 401
    profile = Profile.query.get(profileId)
    if not profile:
        return {"error": "Profile not found"}, 404
    existingFollow = Follow.query.filter(
        Follow.userId == current_user.id, Follow.profileId == profileId
    ).first()
    if not existingFollow and current_user.id != profile.userId:
        follow = Follow(userId=current_user.id, profileId=profileId)

        db.session.add(follow)
        db.session.commit()
        return follow.to_dict()
    else:
        return {"error": "User already follows this profile"}, 401


# GET /profiles/:profileId/cart
@profile_routes.route("/<int:profileId>/cart", methods=["GET"])
@login_required
def get_cart(profileId):
    if not current_user:
        return {"error": "Unauthorized"}, 401
    return current_user.get_one_cart(profileId)


# POST /profiles/:profileId/cart
@profile_routes.route("/<int:profileId>/cart", methods=["POST"])
@login_required
def create_cart(profileId):
    if not current_user:
        return {"error": "Unauthorized"}, 401
    profile = Profile.query.get(profileId)
    if not profile:
        return {"error": "Profile not found"}, 404
    existing_cart = current_user.get_one_cart(profileId)
    if existing_cart:
        return {"error": "User already has a cart for this profile"}, 401
    cart = Cart(profileId=profileId, userId=current_user.id, subtotal=0)

    db.session.add(cart)
    db.session.commit()
    return cart.to_dict()


# GET /profiles/:linkName
@profile_routes.route("/<linkName>")
def get_profile(linkName):
    """
    Query for a profile by id and returns that profile in a dictionary
    """
    profile = Profile.query.filter(Profile.linkName == linkName).first()
    if not profile:
        return {"error": "Profile not found"}, 404
    return profile.to_dict()
