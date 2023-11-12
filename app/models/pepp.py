from .db import db, environment, SCHEMA, add_prefix_for_prod

class Pepp(db.Model):
    __tablename__ = "pepps"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(
        db.Integer(), db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    pageId = db.Column(
        db.Integer(), db.ForeignKey(add_prefix_for_prod("pages.id")), nullable=False
    )
    quantity = db.Column(db.Integer, nullable=False, default=0)

    user = db.relationship("User", back_populates="pepps")
    page = db.relationship("Page", back_populates="pepps")

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "pageId": self.pageId,
            "quantity": self.quantity,
        }
