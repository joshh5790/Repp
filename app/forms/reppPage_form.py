from flask_wtf import FlaskForm
from flask_login import current_user
from wtforms import StringField, URLField, BooleanField
from wtforms.validators import DataRequired, ValidationError
from app.models import User


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

class ReppForm(FlaskForm):
  mainImage = URLField('mainImage', [DataRequired()])
  isBanner = BooleanField('isBanner', [DataRequired()])
  mainVideo = URLField('mainVideo')
  bio = StringField('bio')
  newsletter = StringField('newsletter')
  businessInquiries = StringField('businessInquiries')
  videoSection = BooleanField('videoSection', [DataRequired()])
  shopSection = BooleanField('shopSection', [DataRequired()])
