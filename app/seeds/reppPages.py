from app.models import db, ReppPage, environment, SCHEMA
from sqlalchemy.sql import text


def seed_reppPages():
    tiff = ReppPage(
      reppId=1,
      mainImage='https://yt3.googleusercontent.com/PyO-pFli2SK8gl5zFahqbZbrvN5AvKvyDE986bUw3JtHhe8ZX6KIRddNts_X16tPE7m7Gd6YcPE=w1138-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj',
      isBanner=True,
      bio='my name is tiff. im 23 years old and i make music. um. that’s pretty much most of my life. um. i live in los angeles and um. it’s great here. um. i enjoy um rice. and um pasta. and i really like pickles but i have a health condition that um uh doesn’t um really let me eat them properly. um. anyways. the goal is the be um. a really big pop star. um. maybe you can help wid that. um. thanks. >.<',
      videoSection=False,
      shopSection=False)
    josiah = ReppPage(
      reppId=2,
      mainImage='https://yt3.googleusercontent.com/zhl6DOxlSDilSJWsCG_BUIgciPfSZu4OSTITWCp7OOTl6JrdxROhxZF97ia_bfISW5hYVSwQwQ=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj',
      isBanner=True,
      bio='Sailing precariously between the borders of alternative rnb, indie pop, and electronic dance genres, Highvyn searches for an identity that blends sounds and emotions into a beautifully curated mess. Self-produced, written, and recorded in his DIY home studio in the dmv, Highvyn has carved out a space for himself as an artist that has no true equivalents. \nHighvyn balances his ever-changing sound with lyrics from the heart, with an intimate writing style that explores themes of self-discovery and the struggles of young love. In 2024, Highvyn hopes to expand the full potential of his artistry to create music that transcends time, space, and mediums.',
      videoSection=False,
      shopSection=False)
    eric = ReppPage(
      reppId=3,
      mainImage='https://dynamicmedia.livenationinternational.com/e/d/w/a364d3d4-534b-40c8-a4d1-f0e0f2245eba.jpg',
      isBanner=False,
      bio='Named GQ Korea’s Man of the Year and Forbes 30 Under 30 Asia, the multifaceted musician, actor and television personality Eric Nam is one of the most successful Korean-American figures of recent times, having built what GQ calls “one of the most varied and entrepreneurial legacies in the K-Pop scene.” With 3.5M+ monthly listeners and 4.6M+ followers on Instagram, Eric has amassed over 1B streams on Spotify and most recently headlined a sold-out world tour playing 59 headline shows across 54 cities including Los Angeles, New York, Paris, London and Melbourne. In addition to music, Eric is a co-founder and creative director at DIVE Studios, the world’s leading AAPI and K-pop focused media company with multiple award-winning podcasts, and Mindset, a mental health and wellness platform for Gen Z audiences.',
      businessInquiries='info@enmgmt.com',
      videoSection=False,
      shopSection=True)

    db.session.add(tiff)
    db.session.add(josiah)
    db.session.add(eric)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_reppPages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.repppages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM repppages"))

    db.session.commit()
