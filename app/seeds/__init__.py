from flask.cli import AppGroup
from .users import seed_users, undo_users
from .genres import seed_genres, undo_genres
from .pages import seed_pages, undo_pages
from .products import seed_products, undo_products
from .productImages import seed_productImages, undo_productImages
from .productStocks import seed_productStocks, undo_productStocks
from .videos import seed_videos, undo_videos
from .tours import seed_tours, undo_tours
from .tourLocations import seed_tourLocations, undo_tourLocations



from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup("seed")


# Creates the `flask seed all` command
@seed_commands.command("all")
def seed():
    if environment == "production":
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_genres()
        undo_pages()
        undo_products()
        undo_productImages()
        undo_productStocks()
        undo_videos()
        undo_tours()
        undo_tourLocations()
    seed_users()
    seed_genres()
    seed_pages()
    seed_products()
    seed_productImages()
    seed_productStocks()
    seed_videos()
    seed_tours()
    seed_tourLocations()


# Creates the `flask seed undo` command
@seed_commands.command("undo")
def undo():
    undo_users()
    undo_genres()
    undo_pages()
    undo_products()
    undo_productImages()
    undo_productStocks()
    undo_videos()
    undo_tours()
    undo_tourLocations()
