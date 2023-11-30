from flask_wtf import FlaskForm
from wtforms import URLField, StringField
from wtforms.validators import DataRequired, ValidationError


def venue_data(form, field):
    venue = field.data
    if not venue:
        raise ValidationError("Please enter a venue.")

def location_data(form, field):
    location = field.data
    if not location:
        raise ValidationError("Please enter a location.")

def date_data(form, field):
    date = field.data
    if not date:
        raise ValidationError("Please enter a date.")

def ticketsLink_data(form, field):
    ticketsLink = field.data
    if not ticketsLink:
        raise ValidationError("Please enter a link to the purchase tickets page.")


class TourLocationForm(FlaskForm):
    venue = StringField("Venue", [DataRequired()])
    location = StringField("Location", [DataRequired()])
    tourDate = StringField("Tour Date", [DataRequired()])
    ticketsLink = URLField("Tickets Link", [DataRequired()])
    rsvpLink = URLField("RSVP Link")
    faqLink = URLField("FAQ Link")
