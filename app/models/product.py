from .db import db, environment, SCHEMA, add_prefix_for_prod


class Product(db.Model):
    __tablename__ = "products"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    profileId = db.Column(
        db.Integer(), db.ForeignKey(add_prefix_for_prod("profiles.id")), nullable=False
    )
    name = db.Column(db.String(40), nullable=False)
    price = db.Column(db.Float(), nullable=False)
    description = db.Column(db.String(255))
    previewImage = db.Column(db.String(), nullable=False)

    profile = db.relationship("Profile", back_populates="products")
    images = db.relationship(
        "ProductImage", back_populates="product", cascade="all, delete-orphan"
    )
    stock = db.relationship(
        "ProductStock", back_populates="product", cascade="all, delete-orphan"
    )
    cartItems = db.relationship(
        "CartItem", back_populates="product", cascade="all, delete-orphan"
    )
    orderItems = db.relationship(
        "OrderItem", back_populates="product", cascade="all, delete-orphan"
    )


    def to_dict(self):
        return {
            "id": self.id,
            "profileId": self.profileId,
            "name": self.name,
            "description": self.description,
            "price": self.price,
            "previewImage": self.previewImage,
        }

    def get_images(self):
        return [image.to_dict() for image in self.images]

    def get_stock(self):
        return [stock.to_dict() for stock in self.stock]

    def get_profileOwnerId(self):
        return self.profile.to_dict()["userId"]
