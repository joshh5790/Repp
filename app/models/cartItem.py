from .db import db, environment, SCHEMA, add_prefix_for_prod


class CartItem(db.Model):
    __tablename__ = "cartitems"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer(), primary_key=True)
    cartId = db.Column(
        db.Integer(), db.ForeignKey(add_prefix_for_prod("carts.id")), nullable=False
    )
    productId = db.Column(
        db.Integer(), db.ForeignKey(add_prefix_for_prod("products.id")), nullable=False
    )
    quantity = db.Column(db.Integer, nullable=False)
    size = db.Column(db.String())

    product = db.relationship("Product", back_populates="cartItems")
    cart = db.relationship("Cart", back_populates="cartItems")

    def to_dict(self):
        product = self.product.to_dict()
        return {
            "id": self.id,
            "cartId": self.cartId,
            "productId": self.productId,
            "quantity": self.quantity,
            "size": self.size,
            "name": product["name"],
            "price": product["price"],
            "description": product["description"],
            "image": product["previewImage"],
        }

    def checkout(self):
        product = self.product.to_dict()
        return {
            "price": product["price"],
            "quantity": self.quantity
        }
