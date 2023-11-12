from .db import db, environment, SCHEMA, add_prefix_for_prod


class Tour(db.Model):
    __tablename__ = "tours"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    pageId = db.Column(
        db.Integer(), db.ForeignKey(add_prefix_for_prod("pages.id")), nullable=False
    )
    venue = db.Column(db.String(40), nullable=False)
    location = db.Column(db.String(40), nullable=False)
    tourDate = db.Column(db.String(), nullable=False)
    ticketsLink = db.Column(db.String())


    page = db.relationship("Page", back_populates="tours")

    def to_dict(self):
        return {
            "id": self.id,
            "pageId": self.pageId,
            "venue": self.venue,
            "location": self.location,
            "tourDate": self.tourDate,
            "ticketsLink": self.ticketsLink,
        }

    def get_page(self):
        return self.page[0].to_dict() if self.page else {}
