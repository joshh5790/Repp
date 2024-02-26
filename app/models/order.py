from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Order(db.Model):
    __tablename__ = "orders"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(
        db.Integer(), db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    profileId = db.Column(
        db.Integer(), db.ForeignKey(add_prefix_for_prod("profiles.id")), nullable=False
    )
    total = db.Column(db.Float(), nullable=False)
    createdAt = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship("User", back_populates="orders")
    profile = db.relationship("Profile", back_populates="orders")
    orderItems = db.relationship(
        "OrderItem", back_populates="order", cascade="all, delete-orphan"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "profileId": self.profileId,
            "total": self.total,
            "createdAt": self.createdAt,
        }

    def get_items(self):
        return [orderItem.to_dict() for orderItem in self.orderItems]
