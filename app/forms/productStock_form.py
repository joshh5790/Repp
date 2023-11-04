from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError


def stock_data(form, field):
    stock = field.data
    if not stock:
        raise ValidationError("Stock cannot be empty.")


class ProductStockForm(FlaskForm):
    size = StringField("size")
    stock = IntegerField("stock", [DataRequired()])
