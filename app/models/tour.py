from .db import db, environment, SCHEMA, add_prefix_for_prod


class Tour(db.Model):
    __tablename__ = "tours"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    pageId = db.Column(
        db.Integer(), db.ForeignKey(add_prefix_for_prod("pages.id")), nullable=False
    )
    name = db.Column(db.String(40))
    tourLogo = db.Column(db.String())

    page = db.relationship("Page", back_populates="tours")
    tourLocations = db.relationship("TourLocation", back_populates="tour")

    def to_dict(self):
        return {
            "id": self.id,
            "pageId": self.pageId,
            "name": self.name,
            "tourLogo": self.tourLogo,
        }

    def get_page(self):
        return self.page[0].to_dict() if self.page else {}

    def get_pageOwnerId(self):
        return self.page.to_dict()["userId"]

    def get_locations(self):
        return [location.to_dict() for location in self.tourLocations]
