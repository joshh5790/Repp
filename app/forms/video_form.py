from flask_wtf import FlaskForm
from wtforms import URLField, StringField
from wtforms.validators import DataRequired, ValidationError


def name_data(form, field):
    name = field.data
    if not name:
        raise ValidationError("Please enter a video name.")


def video_data(form, field):
    video = field.data
    if not video:
        raise ValidationError("Please enter a video url.")


class VideoForm(FlaskForm):
    name = StringField("Name", [DataRequired()])
    video = URLField("Video", [DataRequired(), video_data])
