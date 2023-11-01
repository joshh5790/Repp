from flask_wtf import FlaskForm
from wtforms import URLField
from wtforms.validators import DataRequired, ValidationError

def image_data(form, field):
	image = field.data
	if not image:
		raise ValidationError('Please enter an image url.')

class ProductImageForm(FlaskForm):
  image = URLField('Image', [DataRequired(), image_data])
