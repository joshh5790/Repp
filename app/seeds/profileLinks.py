from app.models import db, ProfileLink, environment, SCHEMA
from sqlalchemy.sql import text


def seed_profileLinks():
    db.session.add_all(
        [
            ProfileLink(
                profileId=1,
                text="PARTYING IN MUMBAI",
                link="https://www.youtube.com/watch?v=aHmt9GE3kkE",
            ),
            ProfileLink(
                profileId=1,
                text="Latest Happy Hour!",
                link="https://www.youtube.com/watch?v=nGtEIykygyE",
            ),
            ProfileLink(
                profileId=2,
                text="APESHIT OUT NOW",
                link="https://lnk.dmsmusic.co/tiffanyday_apeshit",
            ),
            ProfileLink(
                profileId=2,
                text="subscribe to my newsletter",
                link="https://tiffany-day.ck.page/9381985c5c",
            ),
        ]
    )
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_profileLinks():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.profilelinks RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM profilelinks"))

    db.session.commit()
