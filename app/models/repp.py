from .db import db, environment, SCHEMA, add_prefix_for_prod

class Repp(db.Model):
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

  page = db.relationship("ReppPage", back_populates="repp")

  def to_dict(self):
    return {
      'id': self.id,
      'userId': self.userId,
      'displayName': self.displayName,
      'linkName': self.linkName,
      'tiktok': self.tiktok,
      'youtube': self.youtube,
      'instagram': self.instagram,
      'applemusic': self.applemusic,
      'spotify': self.spotify,
      'twitter': self.twitter,
      'external': self.external
    }
