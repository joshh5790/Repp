from .db import db, environment, SCHEMA, add_prefix_for_prod


class ProductStock(db.Model):
    __tablename__ = "productstocks"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    productId = db.Column(
        db.Integer(), db.ForeignKey(add_prefix_for_prod("products.id")), nullable=False
    )
    size = db.Column(db.String())
    stock = db.Column(db.Integer(), nullable=False)

    product = db.relationship("Product", back_populates="stock")

    def to_dict(self):
        return {
            "id": self.id,
            "productId": self.productId,
            "size": self.size,
            "stock": self.stock,
        }

    def get_product(self):
        return self.product.to_dict()

    def get_profileOwnerId(self):
        return self.product.get_profileOwnerId()
