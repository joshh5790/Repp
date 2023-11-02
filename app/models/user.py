from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
	__tablename__ = 'users'

	if environment == "production":
		__table_args__ = {'schema': SCHEMA}

	id = db.Column(db.Integer, primary_key=True)
	firstName = db.Column(db.String(40), nullable=False)
	lastName = db.Column(db.String(40), nullable=False)
	username = db.Column(db.String(40), nullable=False, unique=True)
	email = db.Column(db.String(255), nullable=False, unique=True)
	gender = db.Column(db.String(10), nullable=False)
	address = db.Column(db.String(255), nullable=False)
	city = db.Column(db.String(255), nullable=False)
	state = db.Column(db.String(255), nullable=False)
	hashed_password = db.Column(db.String(255), nullable=False)
	profileImage = db.Column(db.String())

	page = db.relationship("Page", back_populates="user", cascade="all, delete-orphan")
	carts = db.relationship("Cart", back_populates="user", cascade="all, delete-orphan")

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
			'firstName': self.firstName,
			'lastName': self.lastName,
			'username': self.username,
			'email': self.email,
			'gender': self.gender,
			'address': self.address,
			'city': self.city,
			'state': self.state,
			'profileImage': self.profileImage
		}

	def get_page(self):
		return self.page[0].to_dict() if self.page else {}

	def get_carts(self):
		return [cart.to_dict() for cart in self.carts]

	def get_one_cart(self, pageId):
		carts = self.carts
		for cart in carts:
			if cart.pageId == pageId:
				return cart.to_dict()
		return {}
