from .db import db, environment, SCHEMA, add_prefix_for_prod

class Follow(db.Model):
    __tablename__ = "follows"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(
        db.Integer(), db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    profileId = db.Column(
        db.Integer(), db.ForeignKey(add_prefix_for_prod("profiles.id")), nullable=False
    )
    pepps = db.Column(db.Integer, nullable=False, default=10)

    user = db.relationship("User", back_populates="follows")
    profile = db.relationship("Profile", back_populates="follows")

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "profileId": self.profileId,
			"pepps": self.pepps,
        }
