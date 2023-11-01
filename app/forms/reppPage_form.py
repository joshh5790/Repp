from flask_wtf import FlaskForm
from flask_login import current_user
from wtforms import StringField, URLField, BooleanField
from wtforms.validators import DataRequired, ValidationError
from app.models import User


def mainImage_data(form, field):
	mainImage = field.data
	if not mainImage:
		raise ValidationError('Main image field is required.')

def displayname_exists(form, field):
	# Checking if user exists
	email = field.data
	if current_user.is_authenticated and current_user.email == email:
		user = User.query.filter(User.email == email).all()
		if len(user) > 1:
			raise ValidationError('Email address is already in use.')
	else:
		user = User.query.filter(User.email == email).first()
		if user:
			raise ValidationError('Email address is already in use.')


def linkname_exists(form, field):
	username = field.data
	if current_user.is_authenticated and current_user.username == username:
		user = User.query.filter(User.username == username).all()
		if len(user) > 1:
			raise ValidationError('Username is already in use.')
	else:
		user = User.query.filter(User.username == username).first()
		if user:
			raise ValidationError('Username is already in use.')


class ReppForm(FlaskForm):
  mainImage = URLField('mainImage', [DataRequired()])
  isBanner = BooleanField('isBanner', [DataRequired()])
  mainVideo = URLField('mainVideo')
  bio = StringField('bio')
  newsletter = StringField('newsletter')
  businessInquiries = StringField('businessInquiries')
  videoSection = BooleanField('videoSection', [DataRequired()])
  shopSection = BooleanField('shopSection', [DataRequired()])
