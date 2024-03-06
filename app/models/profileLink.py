from .db import db, environment, SCHEMA, add_prefix_for_prod

class ProfileLink(db.Model):
  __tablename__ = 'profilelinks'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  profileId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("profiles.id")), nullable=False)
  text = db.Column(db.String(50), nullable=False)
  link = db.Column(db.String(50), nullable=False)

  profile = db.relationship("Profile", back_populates="profileLink")

  def to_dict(self):
    return {
      'id': self.id,
      'profileId': self.profileId,
      'text': self.text,
      'link': self.link,
    }
