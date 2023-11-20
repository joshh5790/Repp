from .db import db, environment, SCHEMA, add_prefix_for_prod


class Cart(db.Model):
    __tablename__ = "carts"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(
        db.Integer(), db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    pageId = db.Column(
        db.Integer(), db.ForeignKey(add_prefix_for_prod("pages.id")), nullable=False
    )
    subtotal = db.Column(db.Float(), nullable=False)

    user = db.relationship("User", back_populates="carts")
    page = db.relationship("Page", back_populates="cart")
    cartItems = db.relationship(
        "CartItem", back_populates="cart", cascade="all, delete-orphan"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "pageId": self.pageId,
            "subtotal": self.subtotal,
        }

    def get_page(self):
        return self.page.to_dict()

    def get_items(self):
        return [cartItem.to_dict() for cartItem in self.cartItems]

    def get_items_checkout(self):
        return [cartItem.checkout() for cartItem in self.cartItems]
