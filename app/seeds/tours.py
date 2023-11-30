from app.models import db, Tour, environment, SCHEMA
from sqlalchemy.sql import text


def seed_tours():
    tour1 = Tour(
        pageId=1,
        name="HOUSE ON A HILL WORLD TOUR"
    )
    tour2 = Tour(
        pageId=2,
    )
    tour3 = Tour(
        pageId=1,
        name="The Thrill of the Chase Tour",
    )



    db.session.add(tour1)
    db.session.add(tour2)
    db.session.add(tour3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in tourion TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_tours():
    if environment == "tourion":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.tours RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM tours"))

    db.session.commit()
