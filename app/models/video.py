from .db import db, environment, SCHEMA, add_prefix_for_prod

class Video(db.Model):
  __tablename__ = 'videos'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  pageId = db.Column(db.Integer(), db.ForeignKey(
    add_prefix_for_prod("pages.id")), nullable=False)
  video = db.Column(db.String(), nullable=False)

  page = db.relationship("Page", back_populates="videos")

  def to_dict(self):
    return {
      'id': self.id,
      'pageId': self.pageId,
      'video': self.video,
    }
