from flask_wtf import FlaskForm
from wtforms import StringField, URLField
from wtforms.validators import DataRequired, ValidationError


def name_data(form, field):
	name = field.data
	if not name:
		raise ValidationError('Please enter a name.')

def price_data(form, field):
	price = field.data
	if not price:
		raise ValidationError('Please enter a price.')

def previewImage_data(form, field):
	previewImage = field.data
	if not previewImage:
		raise ValidationError('Please enter a preview image.')

class ReppForm(FlaskForm):
  name = StringField('name', [DataRequired(), name_data])
  description = StringField('description')
  price = StringField('price', [DataRequired(), price_data])
  previewImage = URLField('previewImage', [DataRequired(), previewImage_data])
