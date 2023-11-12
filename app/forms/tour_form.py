from flask_wtf import FlaskForm
from wtforms import URLField, StringField
from wtforms.validators import DataRequired, ValidationError


def name_data(form, field):
    name = field.data
    if not name:
        raise ValidationError("Please enter a tour name.")


class TourForm(FlaskForm):
    name = StringField("Name", [DataRequired()])
    tourLogo = URLField("Tour Logo")
