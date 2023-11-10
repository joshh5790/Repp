from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    eric = User(
        firstName="Eric",
        lastName="Nam",
        username="ericnam",
        email="ericnam@aa.io",
        gender="Male",
        address="121 Third St",
        city="Los Angeles",
        state="CA",
        password="password",
        isRepp=True,
        profileImage="https://i1.sndcdn.com/avatars-r559nwVkf8e18rUZ-vNUSGg-t500x500.jpg",
    )
    tiff = User(
        firstName="Tiffany",
        lastName="Day",
        username="tiffanyday",
        email="demo@aa.io",
        gender="Female",
        address="123 Main St",
        city="Los Angeles",
        state="CA",
        password="password",
        isRepp=True,
        profileImage="https://thehiddenhits.files.wordpress.com/2021/01/tiffany-day-the-hidden-hits.jpg",
    )
    josiah = User(
        firstName="Josiah",
        lastName="Won",
        username="josiahwon",
        email="josiah@aa.io",
        gender="Male",
        address="122 Second St",
        city="Los Angeles",
        state="CA",
        password="password",
        isRepp=True,
        profileImage="https://images.genius.com/e9a779c23099a34081cdd35250f273cc.539x539x1.jpg",
    )
    josh = User(
        firstName="Josh",
        lastName="Ho",
        username="joshho",
        email="a@a.a",
        gender="Male",
        address="121 Third St",
        city="Los Angeles",
        state="CA",
        password="password",
        isRepp=False,
        profileImage="https://i1.sndcdn.com/avatars-r559nwVkf8e18rUZ-vNUSGg-t500x500.jpg",
    )

    db.session.add(eric)
    db.session.add(tiff)
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
