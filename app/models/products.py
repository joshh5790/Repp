from .db import db, environment, SCHEMA, add_prefix_for_prod

class Product(db.Model):
  __tablename__ = 'products'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  reppPageId = db.Column(db.Integer(), db.ForeignKey(
    add_prefix_for_prod("repppages.id")), nullable=False)
  name = db.Column(db.String(40), nullable=False)
  description = db.Column(db.String(255))
  price = db.Column(db.Float(), nullable=False)
  previewImage = db.Column(db.String(), nullable=False)

  page = db.relationship("ReppPage", back_populates="products")

  def to_dict(self):
    return {
      'reppPageId': self.reppPageId,
      'name': self.name,
      'description': self.description,
      'price': self.price,
      'previewImage': self.previewImage,
    }
