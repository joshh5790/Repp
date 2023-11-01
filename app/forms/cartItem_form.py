from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError

def quantity_data(form, field):
	quantity = field.data
	if not quantity:
		raise ValidationError('Please enter a quantity.')

class CartItemForm(FlaskForm):
  quantity = StringField('Quantity', [DataRequired(), quantity_data])
