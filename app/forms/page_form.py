from flask_wtf import FlaskForm
from flask_login import current_user
from wtforms import StringField, URLField, BooleanField
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


def videoSection_data(form, field):
    videoSection = field.data
    if not videoSection:
        raise ValidationError("Please indicate if the video section is enabled or not.")


def shopSection_data(form, field):
    shopSection = field.data
    if not shopSection:
        raise ValidationError("Please indicate if the shop section is enabled or not.")


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
    businessInquiries = StringField("Business Inquiries")
    videoSection = BooleanField("videoSection", [DataRequired()])
    shopSection = BooleanField("shopSection", [DataRequired()])
