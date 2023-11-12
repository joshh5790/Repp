from app.models import db, Genre, environment, SCHEMA
from sqlalchemy.sql import text


def seed_genres():
    db.session.add_all(
        [
            Genre(genre='Pop'),
            Genre(genre='Rock'),
            Genre(genre='Jazz'),
            Genre(genre='R & B'),
            Genre(genre='Hip Hop'),
            Genre(genre='Country'),
            Genre(genre='Electronic Music'),
            Genre(genre='Dubstep'),
            Genre(genre='Metal'),
        ]
    )
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_genres():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.genres RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM genres"))

    db.session.commit()
