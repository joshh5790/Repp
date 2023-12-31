from flask_wtf import FlaskForm
from flask_login import current_user
from wtforms import StringField, EmailField, URLField, BooleanField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    if current_user.is_authenticated and current_user.email == email:
        user = User.query.filter(User.email == email).all()
        if len(user) > 1:
            raise ValidationError("Email address is already in use.")
    else:
        user = User.query.filter(User.email == email).first()
        if user:
            raise ValidationError("Email address is already in use.")


def firstName_data(form, field):
    firstName = field.data
    if not firstName:
        raise ValidationError("Required")
    if not firstName.isalpha():
        raise ValidationError("Must be alphabetic")


def lastName_data(form, field):
    lastName = field.data
    if not lastName:
        raise ValidationError("Required")
    if not all(char.isalpha() or char.isspace() for char in lastName):
        raise ValidationError("Must be alphabetic")


# def gender_data(form, field):
#     gender = field.data
#     if not gender:
#         raise ValidationError("Required")


# def address_data(form, field):
#     address = field.data
#     if not address:
#         raise ValidationError("Required")
#     if len(address) < 4:
#         raise ValidationError("Must be at least 4 characters")
#     if len(address) > 255:
#         raise ValidationError("Must be less than 255 characters")
#     if not all(char.isalnum() or char.isspace() for char in address):
#         raise ValidationError("Invalid address")


# def city_data(form, field):
#     city = field.data
#     if not city:
#         raise ValidationError("Required")
#     if len(city) < 3:
#         raise ValidationError("Must be at least 3 characters")
#     if len(city) > 255:
#         raise ValidationError("Must be less than 255 characters")
#     if not all(char.isalpha() or char.isspace() for char in city):
#         raise ValidationError("Must be alphabetic")


def password_data(form, field):
    password = field.data
    if not password:
        raise ValidationError("Required")
    if len(password) < 6:
        raise ValidationError("Must be at least 6 characters")


class SignUpForm(FlaskForm):
    firstName = StringField("firstName", validators=[DataRequired(), firstName_data])
    lastName = StringField("lastName", validators=[DataRequired(), lastName_data])
    email = EmailField("email", validators=[DataRequired(), user_exists])
    gender = StringField("gender")
    address1 = StringField("address 1")
    address2 = StringField("address 2")
    city = StringField("city")
    country = StringField("country")
    subregion = StringField("subregion")
    postal_code = StringField("postal code")
    password = StringField(
        "password", validators=[DataRequired(), Length(min=6), password_data]
    )
    isRepp = BooleanField("isRepp")
    profileImage = URLField("profileImage")
