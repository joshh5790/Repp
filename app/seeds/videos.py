from app.models import db, Video, environment, SCHEMA
from sqlalchemy.sql import text


def seed_videos():
    video1 = Video(
        profileId=2,
        name="Calone",
        video="https://www.youtube.com/embed/gB9NxOmwPjI",
    )
    video2 = Video(
        profileId=2,
        name="IF I DON'T TEXT YOU FIRST",
        video="https://www.youtube.com/embed/Jr2R5My0Bnc",
    )
    video3 = Video(
        profileId=2,
        name="APESHIT",
        video="https://www.youtube.com/embed/Ck92vi2VWuU",
    )
    video4 = Video(
        profileId=2,
        name="PARTY W OUT ME",
        video="https://www.youtube.com/embed/DXNFBM7CRko",
    )
    video5 = Video(
        profileId=2,
        name="SPOILED BITCH",
        video="https://www.youtube.com/embed/hD16PbFfEnA",
    )
    video6 = Video(
        profileId=1,
        name="Exist",
        video="https://www.youtube.com/embed/rxdjL1nx_eY",
    )
    video7 = Video(
        profileId=1,
        name="House on a Hill",
        video="https://www.youtube.com/embed/MUMFc7Wt5G4",
    )
    video8 = Video(
        profileId=1,
        name="Any Other Way",
        video="https://www.youtube.com/embed/oril2uJAiJY",
    )
    video9 = Video(
        profileId=1,
        name="I Don't Know You Anymore",
        video="https://www.youtube.com/embed/GHJyfokY5Dw",
    )
    video10 = Video(
        profileId=3,
        name="Ivoris - I Wish My Mind Would Shut Up (Official Audio)",
        video="https://www.youtube.com/embed/usgQIvI_JAo",
    )
    video11 = Video(
        profileId=3,
        name="Cocopops (Official Music Video) - Ivoris",
        video="https://www.youtube.com/embed/vZM8P0EJCIc",
    )
    video12 = Video(
        profileId=4,
        name="need u the most",
        video="https://www.youtube.com/embed/yElzEgf6lAg",
    )
    video13 = Video(
        profileId=4,
        name="Pretty Girl",
        video="https://www.youtube.com/embed/wyOIYOXswcI",
    )
    video14 = Video(
        profileId=4,
        name="Ghosts",
        video="https://www.youtube.com/embed/bUsw-Tk8edc",
    )

    db.session.add_all(
        [
            video1,
            video2,
            video3,
            video4,
            video5,
            video6,
            video7,
            video8,
            video9,
            video10,
            video11,
            video12,
            video13,
            video14
        ]
    )

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_videos():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.videos RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM videos"))

    db.session.commit()
