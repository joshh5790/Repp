from flask_wtf import FlaskForm
from wtforms import URLField, StringField
from wtforms.validators import DataRequired, ValidationError


def text_data(form, field):
    name = field.data
    if not name:
        raise ValidationError("Please enter a video name.")


def link_data(form, field):
    video = field.data
    if not video:
        raise ValidationError("Please enter a video url.")


class ProfileLinkForm(FlaskForm):
    text = StringField("Link Text", [DataRequired()])
    Link = URLField("Link", [DataRequired(), link_data])
