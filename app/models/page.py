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
    displayName = db.Column(db.String(40), nullable=False)
    linkName = db.Column(db.String(40), nullable=False, unique=True)
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
    videoSection = db.Column(db.Boolean(), nullable=False)
    shopSection = db.Column(db.Boolean(), nullable=False)

    user = db.relationship("User", back_populates="page")
    products = db.relationship(
        "Product", back_populates="page", cascade="all, delete-orphan"
    )
    videos = db.relationship(
        "Video", back_populates="page", cascade="all, delete-orphan"
    )
    cart = db.relationship("Cart", back_populates="page", cascade="all, delete-orphan")

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
            "mainImage": self.mainImage
        }

    def to_dict(self):
        return {
            "id": self.id,
            "displayName": self.displayName,
            "linkName": self.linkName,
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
            "videoSection": self.videoSection,
            "shopSection": self.shopSection,
            "profileImage": self.user.profileImage,
        }

    def get_products(self):
        return [product.to_dict() for product in self.products]

    def get_videos(self):
        return [video.to_dict() for video in self.videos]
