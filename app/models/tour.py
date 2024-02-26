from .db import db, environment, SCHEMA, add_prefix_for_prod


class Tour(db.Model):
    __tablename__ = "tours"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    profileId = db.Column(
        db.Integer(), db.ForeignKey(add_prefix_for_prod("profiles.id")), nullable=False
    )
    venue = db.Column(db.String())
    location = db.Column(db.String(), nullable=False)
    tourDate = db.Column(db.String(), nullable=False)
    ticketsLink = db.Column(db.String(), nullable=False)
    soldOut = db.Column(db.Boolean, default=False)

    profile = db.relationship("Profile", back_populates="tours")


    def to_dict(self):
        return {
            "id": self.id,
            "profileId": self.profileId,
            "venue": self.venue,
            "location": self.location,
            "tourDate": self.tourDate,
            "ticketsLink": self.ticketsLink,
            "soldOut": self.soldOut
        }

    def get_profileOwnerId(self):
        return self.profile.to_dict()["userId"]
