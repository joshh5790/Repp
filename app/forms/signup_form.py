from flask_wtf import FlaskForm
from flask_login import current_user
from wtforms import StringField, EmailField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
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


def username_exists(form, field):
	# Checking if username is already in use
	username = field.data
	if current_user.is_authenticated and current_user.username == username:
		user = User.query.filter(User.username == username).all()
		if len(user) > 1:
			raise ValidationError('Username is already in use.')
	else:
		user = User.query.filter(User.username == username).first()
		if user:
			raise ValidationError('Username is already in use.')

def firstName_data(form, field):
	firstName = field.data
	if not firstName:
		raise ValidationError('First name is required.')
	if not firstName.isalpha():
		raise ValidationError('First name must be alphabetic.')

def lastName_data(form, field):
	lastName = field.data
	if not lastName:
		raise ValidationError('Last name is required.')
	if not lastName.isalpha():
		raise ValidationError('Last name must be alphabetic.')

def gender_data(form, field):
	gender = field.data
	if not gender:
		raise ValidationError('Gender is required.')

def address_data(form, field):
	address = field.data
	if not address:
		raise ValidationError('Address is required.')
	if len(address) < 6:
		raise ValidationError('Address must be at least 6 characters long.')
	if len(address) > 255:
		raise ValidationError('Address must be less than 255 characters long.')
	if not address.isalnum():
		raise ValidationError('Address must be alphanumeric.')

def city_data(form, field):
	city = field.data
	if not city:
		raise ValidationError('City is required.')
	if len(city) < 3:
		raise ValidationError('City must be at least 3 characters long.')
	if len(city) > 255:
		raise ValidationError('City must be less than 255 characters long.')
	if not city.isalpha():
		raise ValidationError('City must be alphabetic.')

def state_data(form, field):
	state = field.data
	if not state:
		raise ValidationError('State is required.')

def password_data(form, field):
	password = field.data
	if not password:
		raise ValidationError('Password is required.')
	if len(password) < 6:
		raise ValidationError('Password must be at least 6 characters long.')




class SignUpForm(FlaskForm):
	firstName = StringField('firstName', validators=[DataRequired(), firstName_data])
	lastName = StringField('lastName', validators=[DataRequired(), lastName_data])
	username = StringField('username', validators=[DataRequired(), username_exists])
	email = EmailField('email', validators=[DataRequired(), Email(), user_exists])
	gender = StringField('gender', validators=[DataRequired()], choices=[
		'Male', 'Female', 'Non-binary', 'Prefer not to say'
	])
	address = StringField('address', validators=[DataRequired(), address_data])
	city = StringField('city', validators=[DataRequired(), city_data])
	state = StringField('state', validators=[DataRequired(), state_data])
	password = StringField('password', validators=[DataRequired(), Length(min=6), password_data])
	profileImage = StringField('profileImage')
