from .db import db, environment, SCHEMA, add_prefix_for_prod


class TourLocation(db.Model):
    __tablename__ = "tourlocations"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    tourId = db.Column(
        db.Integer(), db.ForeignKey(add_prefix_for_prod("tours.id")), nullable=False
    )
    name = db.Column(db.String(40), nullable=False)
    venue = db.Column(db.String(40), nullable=False)
    location = db.Column(db.String(40), nullable=False)
    tourDate = db.Column(db.String(), nullable=False)
    ticketsLink = db.Column(db.String())

    tour = db.relationship("Tour", back_populates="tourLocations")

    def to_dict(self):
        return {
            "id": self.id,
            "tourId": self.tourId,
            "venue": self.venue,
            "location": self.location,
            "tourDate": self.tourDate,
            "ticketsLink": self.ticketsLink,
        }

    def get_tour(self):
        return self.tour[0].to_dict() if self.tour else {}
