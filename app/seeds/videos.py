from app.models import db, Video, environment, SCHEMA
from sqlalchemy.sql import text


def seed_videos():
    video1 = Video(
        pageId=1,
        name="Calone",
        video="https://www.youtube.com/embed/gB9NxOmwPjI",
    )
    video2 = Video(
        pageId=1,
        name="IF I DON'T TEXT YOU FIRST",
        video="https://www.youtube.com/embed/Jr2R5My0Bnc",
    )
    video3 = Video(
        pageId=1,
        name="APESHIT",
        video="https://www.youtube.com/embed/Ck92vi2VWuU",
    )
    video4 = Video(
        pageId=1,
        name="PARTY W OUT ME",
        video="https://www.youtube.com/embed/DXNFBM7CRko",
    )
    video5 = Video(
        pageId=1,
        name="SPOILED BITCH",
        video="https://www.youtube.com/embed/hD16PbFfEnA",
    )
    video6 = Video(
        pageId=3,
        name="Exist",
        video="https://www.youtube.com/embed/rxdjL1nx_eY",
    )
    video7 = Video(
        pageId=3,
        name="House on a Hill",
        video="https://www.youtube.com/embed/MUMFc7Wt5G4",
    )
    video8 = Video(
        pageId=3,
        name="Any Other Way",
        video="https://www.youtube.com/embed/oril2uJAiJY",
    )
    video9 = Video(
        pageId=3,
        name="I Don't Know You Anymore",
        video="https://www.youtube.com/embed/GHJyfokY5Dw",
    )

    db.session.add(video1)
    db.session.add(video2)
    db.session.add(video3)
    db.session.add(video4)
    db.session.add(video5)
    db.session.add(video6)
    db.session.add(video7)
    db.session.add(video8)
    db.session.add(video9)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_videos():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.videos RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM videos"))

    db.session.commit()
