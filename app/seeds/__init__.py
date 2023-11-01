from flask.cli import AppGroup
from .users import seed_users, undo_users
from .reppPages import seed_reppPages, undo_reppPages
from .products import seed_products, undo_products
from .productImages import seed_productImages, undo_productImages
from .productStocks import seed_productStocks, undo_productStocks

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_reppPages()
        undo_products()
        undo_productImages()
        undo_productStocks()
    seed_users()
    seed_reppPages()
    seed_products()
    seed_productImages()
    seed_productStocks()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_reppPages()
    undo_products()
    undo_productImages()
    undo_productStocks()
    # Add other undo functions here
