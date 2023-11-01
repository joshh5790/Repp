from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin


class ReppPage(db.Model, UserMixin):
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
  videos = db.Column(db.Boolean(), nullable=False)
  shop = db.Column(db.Boolean(), nullable=False)

  repp = db.relationship("Repp", back_populates="page")

  def to_dict(self):
    return {
      'id': self.id,
      'username': self.username,
      'email': self.email
    }
