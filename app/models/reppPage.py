from .db import db, environment, SCHEMA, add_prefix_for_prod

class ReppPage(db.Model):
  __tablename__ = 'repppages'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  reppId = db.Column(db.Integer(), db.ForeignKey(
    add_prefix_for_prod("repps.id")), nullable=False, unique=True)
  mainImage = db.Column(db.String(), nullable=False)
  isBanner = db.Column(db.Boolean, nullable=False)
  mainVideo = db.Column(db.String())
  bio = db.Column(db.String())
  newsletter = db.Column(db.String())
  businessInquiries = db.Column(db.String())
  videoSection = db.Column(db.Boolean(), nullable=False)
  shopSection = db.Column(db.Boolean(), nullable=False)

  repp = db.relationship("Repp", back_populates="page")
  products = db.relationship("Product", back_populates="page")
  videos = db.relationship("Video", back_populates="page")
  cart = db.relationship("Cart", back_populates="page")

  def to_dict(self):
    return {
      'id': self.id,
      'userId': self.reppId,
      'mainImage': self.mainImage,
      'isBanner': self.isBanner,
      'mainVideo': self.mainVideo,
      'bio': self.bio,
      'newsletter': self.newsletter,
      'businessInquiries': self.businessInquiries,
      'videoSection': self.videoSection,
      'shopSection': self.shopSection,
    }
