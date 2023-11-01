from .db import db, environment, SCHEMA, add_prefix_for_prod

class Cart(db.Model):
  __tablename__ = 'carts'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  reppPageId = db.Column(db.Integer(), db.ForeignKey(
    add_prefix_for_prod("reppPages.id")), nullable=False)
  userId = db.Column(db.Integer(), db.ForeignKey(
    add_prefix_for_prod("users.id")), nullable=False)
  subtotal = db.Column(db.Float(), nullable=False)

  page = db.relationship("ReppPage", back_populates="cart")
  user = db.relationship("User", back_populates="cart")
  cartItems = db.relationship("CartItem", back_populates="cart")

  def to_dict(self):
    return {
      'id': self.id,
      'reppPageId': self.reppPageId,
      'userId': self.userId,
      'subtotal': self.subtotal
    }
