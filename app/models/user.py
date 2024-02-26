from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = "users"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(40), nullable=False)
    lastName = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    gender = db.Column(db.String(10))
    phone = db.Column(db.String(20))
    address1 = db.Column(db.String(255))
    address2 = db.Column(db.String(255))
    city = db.Column(db.String(255))
    country = db.Column(db.String(255))
    subregion = db.Column(db.String(255))
    postal_code = db.Column(db.String(255))
    profileImage = db.Column(db.String())
    premiumPepps = db.Column(db.Integer, nullable=False, default=0)
    isRepp = db.Column(db.Boolean(), default=False)
    hashed_password = db.Column(db.String(255), nullable=False)

    profile = db.relationship("Profile", back_populates="user", cascade="all, delete-orphan")
    carts = db.relationship("Cart", back_populates="user", cascade="all, delete-orphan")
    orders = db.relationship(
        "Order", back_populates="user", cascade="all, delete-orphan"
    )
    follows = db.relationship(
        "Follow", back_populates="user", cascade="all, delete-orphan"
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "firstName": self.firstName,
            "lastName": self.lastName,
            "email": self.email,
            "gender": self.gender,
            "phone": self.phone,
            "address1": self.address1,
            "address2": self.address2,
            "city": self.city,
            "country": self.country,
            "subregion": self.subregion,
            "postal_code": self.postal_code,
            "profileImage": self.profileImage,
            "premiumPepps": self.premiumPepps,
            "isRepp": self.isRepp,
        }

    def get_profile(self):
        return self.profile[0].to_dict() if self.profile else {}

    def get_carts(self):
        return [cart.to_dict() for cart in self.carts]

    def get_one_cart(self, profileId):
        carts = self.carts
        for cart in carts:
            if cart.profileId == profileId:
                return cart.to_dict()
        return {}

    def get_orders(self):
        return [order.to_dict() for order in self.orders]

    def get_follows(self):
        return [follow.to_dict() for follow in self.follows]
