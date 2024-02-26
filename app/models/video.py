from .db import db, environment, SCHEMA, add_prefix_for_prod


class Video(db.Model):
    __tablename__ = "videos"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    profileId = db.Column(
        db.Integer(), db.ForeignKey(add_prefix_for_prod("profiles.id")), nullable=False
    )
    name = db.Column(db.String(), nullable=False)
    video = db.Column(db.String(), nullable=False)

    profile = db.relationship("Profile", back_populates="videos")

    def to_dict(self):
        return {
            "id": self.id,
            "profileId": self.profileId,
            "name": self.name,
            "video": self.video,
        }

    def get_profileOwnerId(self):
        return self.profile.to_dict()["userId"]
