from flask_wtf import FlaskForm
from flask_login import current_user
from wtforms import StringField, URLField, BooleanField
from wtforms.validators import DataRequired, ValidationError
from app.models import ReppPage

def displayname_exists(form, field):
	# Checking if user exists
	displayName = field.data
	page_data = current_user.get_page()
	if current_user.is_authenticated and page_data['displayName'] == displayName:
		page = ReppPage.query.filter(ReppPage.displayName == displayName).all()
		if len(page) > 1:
			raise ValidationError('Display name is already in use.')
	else:
		page = ReppPage.query.filter(ReppPage.displayName == displayName).first()
		if page:
			raise ValidationError('Display name is already in use.')


def linkname_exists(form, field):
	linkName = field.data
	page_data = current_user.get_page()
	if current_user.is_authenticated and page_data['linkName'] == linkName:
		page = ReppPage.query.filter(ReppPage.linkName == linkName).all()
		if len(page) > 1:
			raise ValidationError('Link name is already in use.')
	else:
		page = ReppPage.query.filter(ReppPage.linkName == linkName).first()
		if page:
			raise ValidationError('Link name is already in use.')

def mainImage_data(form, field):
	mainImage = field.data
	if not mainImage:
		raise ValidationError('Main image field is required.')

def isBanner_data(form, field):
	isBanner = field.data
	if not isBanner:
		raise ValidationError('Please indicate if the main image is a banner or a full size image.')

def videoSection_data(form, field):
	videoSection = field.data
	if not videoSection:
		raise ValidationError('Please indicate if the video section is enabled or not.')

def shopSection_data(form, field):
	shopSection = field.data
	if not shopSection:
		raise ValidationError('Please indicate if the shop section is enabled or not.')

class ReppPageForm(FlaskForm):
	displayName = StringField('displayName', validators=[DataRequired(), displayname_exists])
	linkName = StringField('linkName', validators=[DataRequired(), linkname_exists])
	tiktok = URLField('tiktok')
	youtube = URLField('youtube')
	instagram = URLField('instagram')
	appleMusic = URLField('appleMusic')
	spotify = URLField('spotify')
	twitter = URLField('twitter')
	external = URLField('external')
	mainImage = URLField('mainImage', [DataRequired()])
	isBanner = BooleanField('isBanner', [DataRequired()])
	mainVideo = URLField('mainVideo')
	bio = StringField('bio')
	newsletter = StringField('newsletter')
	businessInquiries = StringField('businessInquiries')
	videoSection = BooleanField('videoSection', [DataRequired()])
	shopSection = BooleanField('shopSection', [DataRequired()])
