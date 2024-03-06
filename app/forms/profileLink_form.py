from flask_wtf import FlaskForm
from wtforms import URLField, StringField
from wtforms.validators import DataRequired, ValidationError


def text_data(form, field):
    text = field.data
    if not text:
        raise ValidationError("Please enter text for your link.")


def link_data(form, field):
    link = field.data
    if not link:
        raise ValidationError("Please enter a valid link.")


class ProfileLinkForm(FlaskForm):
    text = StringField("Link Text", [DataRequired()])
    Link = URLField("Link URL", [DataRequired(), link_data])
