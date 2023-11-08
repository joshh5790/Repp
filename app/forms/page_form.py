from flask_wtf import FlaskForm
from flask_login import current_user
from wtforms import StringField, URLField, EmailField, BooleanField
from wtforms.validators import DataRequired, ValidationError
from app.models import Page


def displayname_exists(form, field):
    # Checking if user exists
    displayName = field.data
    page_data = current_user.get_page()
    if (
        current_user.is_authenticated
        and "displayName" in page_data
        and page_data["displayName"] == displayName
    ):
        page = Page.query.filter(Page.displayName == displayName).all()
        if len(page) > 1:
            raise ValidationError("Display name is already in use.")
    else:
        page = Page.query.filter(Page.displayName == displayName).first()
        if page:
            raise ValidationError("Display name is already in use.")


def linkname_exists(form, field):
    linkName = field.data
    page_data = current_user.get_page()
    if (
        current_user.is_authenticated
        and "linkName" in page_data
        and page_data["linkName"] == linkName
    ):
        page = Page.query.filter(Page.linkName == linkName).all()
        if len(page) > 1:
            raise ValidationError("Link name is already in use.")
    else:
        page = Page.query.filter(Page.linkName == linkName).first()
        if page:
            raise ValidationError("Link name is already in use.")


def mainImage_data(form, field):
    mainImage = field.data
    if not mainImage:
        raise ValidationError("Main image field is required.")

class PageForm(FlaskForm):
    displayName = StringField(
        "Display Name", validators=[DataRequired(), displayname_exists]
    )
    linkName = StringField("Link Name", validators=[DataRequired(), linkname_exists])
    tiktok = URLField("tiktok")
    youtube = URLField("youtube")
    instagram = URLField("Instagram")
    applemusic = URLField("Apple Music")
    spotify = URLField("Spotify")
    facebook = URLField("Facebook")
    discord = URLField("Discord")
    twitter = URLField("Twitter")
    external = URLField("External Link")
    mainImage = URLField("Main Image", [DataRequired()])
    mainVideo = URLField("Main Video")
    bio = StringField("Bio")
    newsletter = StringField("Newsletter")
    businessInquiries = EmailField("Business Inquiries")
    videoSection = BooleanField("Video Section")
    shopSection = BooleanField("Shop Section")
