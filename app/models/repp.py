from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class Repp(db.Model, UserMixin):
  __tablename__ = 'repps'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  userId = db.Column(db.Integer(), db.ForeignKey(
    add_prefix_for_prod("users.id")), nullable=False, unique=True)
  displayName = db.Column(db.String(40), nullable=False)
  linkName = db.Column(db.String(40), nullable=False, unique=True)
  tiktok = db.Column(db.String())
  youtube = db.Column(db.String())
  instagram = db.Column(db.String())
  applemusic = db.Column(db.String())
  spotify = db.Column(db.String())
  twitter = db.Column(db.String())
  external = db.Column(db.String())


  user = db.relationship("User", back_populates="repp")

  @property
  def password(self):
    return self.hashed_password

  @password.setter
  def password(self, password):
    self.hashed_password = generate_password_hash(password)

  def check_password(self, password):
    return check_password_hash(self.password, password)

  def to_dict(self):
    return {
      'id': self.id,
      'username': self.username,
      'email': self.email
    }
