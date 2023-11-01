from .db import db, environment, SCHEMA, add_prefix_for_prod

class Product(db.Model):
  __tablename__ = 'products'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  pageId = db.Column(db.Integer(), db.ForeignKey(
    add_prefix_for_prod("pages.id")), nullable=False)
  name = db.Column(db.String(40), nullable=False)
  description = db.Column(db.String(255))
  price = db.Column(db.Float(), nullable=False)
  previewImage = db.Column(db.String(), nullable=False)

  page = db.relationship("Page", back_populates="products")
  images = db.relationship("ProductImage", back_populates="product")
  stock = db.relationship("ProductStock", back_populates="product")
  cartItems = db.relationship("CartItem", back_populates="product")

  def to_dict(self):
    return {
      'id': self.id,
      'pageId': self.pageId,
      'name': self.name,
      'description': self.description,
      'price': self.price,
      'previewImage': self.previewImage,
    }
