from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    eric = User(
        firstName="Eric",
        lastName="Nam",
        email="ericnam@reppofficial.com",
        gender="Male",
        address1="121 Third St",
        city="Los Angeles",
        country="United States",
        subregion="CA",
        postal_code="96018",
        profileImage="https://i1.sndcdn.com/avatars-r559nwVkf8e18rUZ-vNUSGg-t500x500.jpg",
        isRepp=True,
        password="password",
    )
    tiff = User(
        firstName="Tiffany",
        lastName="Day",
        email="tiffanyday@reppofficial.com",
        gender="Female",
        address1="123 Main St",
        city="Los Angeles",
        country="United States",
        subregion="CA",
        postal_code="96018",
        profileImage="https://thehiddenhits.files.wordpress.com/2021/01/tiffany-day-the-hidden-hits.jpg",
        isRepp=True,
        password="password",
    )
    ivoris = User(
        firstName="Ivoris",
        lastName="Dunno",
        email="ivoris@reppofficial.com",
        gender="Female",
        address1="124 Third St",
        city="Los Angeles",
        country="United States",
        subregion="CA",
        postal_code="96018",
        profileImage="https://assets-au-01.kc-usercontent.com/a74cc67d-6861-022b-4d6d-57679e9d331f/75a5095d-7b67-4bc6-80f8-43dc24abe7af/20211107_ivoris_BonnCreative_36.jpg",
        isRepp=True,
        password="password",
    )
    chris = User(
        firstName="Chris",
        lastName="James",
        email="chrisjames@reppofficial.com",
        gender="Male",
        address1="125 Second St",
        city="Los Angeles",
        country="United States",
        subregion="CA",
        postal_code="96018",
        profileImage="https://i.scdn.co/image/ab6761610000e5eb466280922e99e53a2ccc2064",
        isRepp=True,
        password="password",
    )
    josiah = User(
        firstName="Josiah",
        lastName="Won",
        email="highvyn@reppofficial.com",
        gender="Male",
        address1="122 Second St",
        city="Los Angeles",
        country="United States",
        subregion="CA",
        postal_code="96018",
        profileImage="https://images.genius.com/e9a779c23099a34081cdd35250f273cc.539x539x1.jpg",
        isRepp=True,
        password="password",
    )
    josh = User(
        firstName="Josh",
        lastName="Ho",
        email="a@a.a",
        gender="Male",
        address1="125 Third St",
        city="Los Angeles",
        country="United States",
        subregion="CA",
        postal_code="96018",
        profileImage="https://i1.sndcdn.com/avatars-r559nwVkf8e18rUZ-vNUSGg-t500x500.jpg",
        isRepp=False,
        password="password",
    )

    db.session.add(eric)
    db.session.add(tiff)
    db.session.add(ivoris)
    db.session.add(chris)
    db.session.add(josiah)
    db.session.add(josh)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
