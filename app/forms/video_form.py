from flask_wtf import FlaskForm
from wtforms import URLField
from wtforms.validators import DataRequired, ValidationError

def video_data(form, field):
	video = field.data
	if not video:
		raise ValidationError('Please enter a video url.')

class VideoForm(FlaskForm):
  video = URLField('Video', [DataRequired(), video_data])
