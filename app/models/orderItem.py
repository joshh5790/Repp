from .db import db, environment, SCHEMA, add_prefix_for_prod


class OrderItem(db.Model):
    __tablename__ = "orderitems"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer(), primary_key=True)
    orderId = db.Column(
        db.Integer(), db.ForeignKey(add_prefix_for_prod("orders.id")), nullable=False
    )
    productId = db.Column(
        db.Integer(), db.ForeignKey(add_prefix_for_prod("products.id")), nullable=False
    )
    quantity = db.Column(db.Integer, nullable=False)
    size = db.Column(db.String())

    product = db.relationship("Product", back_populates="orderItems")
    order = db.relationship("Order", back_populates="orderItems")

    def to_dict(self):
        product = self.product.to_dict()
        return {
            "id": self.id,
            "orderId": self.orderId,
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
