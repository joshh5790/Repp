from .db import db, environment, SCHEMA, add_prefix_for_prod


class Page(db.Model):
    __tablename__ = "pages"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(
        db.Integer(),
        db.ForeignKey(add_prefix_for_prod("users.id")),
        nullable=False,
        unique=True,
    )
    genreId = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("genres.id")), nullable=False
    )
    displayName = db.Column(db.String(40), nullable=False)
    linkName = db.Column(db.String(40), nullable=False, unique=True)
    personalLogo = db.Column(db.String())
    statusText = db.Column(db.String())
    tiktok = db.Column(db.String())
    youtube = db.Column(db.String())
    instagram = db.Column(db.String())
    applemusic = db.Column(db.String())
    spotify = db.Column(db.String())
    facebook = db.Column(db.String())
    discord = db.Column(db.String())
    twitter = db.Column(db.String())
    external = db.Column(db.String())
    mainImage = db.Column(db.String(), nullable=False)
    mainVideo = db.Column(db.String())
    bio = db.Column(db.String())
    newsletter = db.Column(db.String())
    businessInquiries = db.Column(db.String())
    shopSection = db.Column(db.Boolean(), default=False)
    videoSection = db.Column(db.Boolean(), default=False)
    tourSection = db.Column(db.Boolean(), default=False)

    user = db.relationship("User", back_populates="page")
    genre = db.relationship("Genre", back_populates="pages")
    products = db.relationship(
        "Product", back_populates="page", cascade="all, delete-orphan"
    )
    videos = db.relationship(
        "Video", back_populates="page", cascade="all, delete-orphan"
    )
    cart = db.relationship("Cart", back_populates="page", cascade="all, delete-orphan")
    orders = db.relationship("Order", back_populates="page", cascade="all, delete-orphan")
    follows = db.relationship("Follow", back_populates="page", cascade="all, delete-orphan")
    tours = db.relationship("Tour", back_populates="page", cascade="all, delete-orphan")
    pepps = db.relationship("Pepp", back_populates="page", cascade="all, delete-orphan")

    def repp_info(self):
        return {
            "id": self.id,
            "displayName": self.displayName,
            "linkName": self.linkName,
            "tiktok": self.tiktok,
            "youtube": self.youtube,
            "instagram": self.instagram,
            "applemusic": self.applemusic,
            "spotify": self.spotify,
            "facebook": self.facebook,
            "discord": self.discord,
            "twitter": self.twitter,
            "external": self.external,
            "mainImage": self.mainImage,
            "bio": self.bio,
            "profileImage": self.user.profileImage,
        }

    def home_page_info(self):
        return {
            "id": self.id,
            "displayName": self.displayName,
            "linkName": self.linkName,
            "mainImage": self.mainImage,
        }

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "displayName": self.displayName,
            "linkName": self.linkName,
            "personalLogo": self.personalLogo,
            "statusText": self.statusText,
            "tiktok": self.tiktok,
            "youtube": self.youtube,
            "instagram": self.instagram,
            "applemusic": self.applemusic,
            "spotify": self.spotify,
            "facebook": self.facebook,
            "discord": self.discord,
            "twitter": self.twitter,
            "external": self.external,
            "mainImage": self.mainImage,
            "mainVideo": self.mainVideo,
            "bio": self.bio,
            "newsletter": self.newsletter,
            "businessInquiries": self.businessInquiries,
            "shopSection": self.shopSection,
            "videoSection": self.videoSection,
            "tourSection": self.tourSection,
            "profileImage": self.user.profileImage,
        }

    def get_products(self):
        return [product.to_dict() for product in self.products]

    def get_videos(self):
        return [video.to_dict() for video in self.videos]

    def get_orders(self):
        return [order.to_dict() for order in self.orders]

    def get_tours(self):
        return [tour.to_dict() for tour in self.tours]
