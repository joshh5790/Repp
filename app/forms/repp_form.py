from flask_wtf import FlaskForm
from flask_login import current_user
from wtforms import StringField, URLField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


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
  displayName = StringField('displayName', validators=[DataRequired(), displayname_exists])
  linkName = StringField('linkName', validators=[DataRequired(), linkname_exists])
  tiktok = URLField('tiktok')
  youtube = URLField('youtube')
  instagram = URLField('instagram')
  appleMusic = URLField('appleMusic')
  spotify = URLField('spotify')
  twitter = URLField('twitter')
  external = URLField('external')
