from flask_wtf import FlaskForm
from flask_login import current_user
from wtforms import StringField, URLField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import Repp


def displayname_exists(form, field):
	# Checking if user exists
	displayName = field.data
	repp_data = current_user.get_repp()
	if current_user.is_authenticated and repp_data['displayName'] == displayName:
		repp = Repp.query.filter(Repp.displayName == displayName).all()
		if len(repp) > 1:
			raise ValidationError('Display name is already in use.')
	else:
		repp = Repp.query.filter(Repp.displayName == displayName).first()
		if repp:
			raise ValidationError('Display name is already in use.')


def linkname_exists(form, field):
	linkName = field.data
	repp_data = current_user.get_repp()
	if current_user.is_authenticated and repp_data['linkName'] == linkName:
		repp = Repp.query.filter(Repp.linkName == linkName).all()
		if len(repp) > 1:
			raise ValidationError('Link name is already in use.')
	else:
		repp = Repp.query.filter(Repp.linkName == linkName).first()
		if repp:
			raise ValidationError('Link name is already in use.')


class ReppForm(FlaskForm):
  displayName = StringField('displayName', validators=[DataRequired(), displayname_exists])
  linkName = StringField('linkName', validators=[DataRequired(), linkname_exists])
  tiktok = URLField('tiktok')
  youtube = URLField('youtube')
  instagram = URLField('instagram')
  appleMusic = URLField('appleMusic')
  spotify = URLField('spotify')
  twitter = URLField('twitter')
  external = URLField('external')
