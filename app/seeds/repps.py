from app.models import db, Repp, environment, SCHEMA
from sqlalchemy.sql import text


def seed_repps():
    tiff = Repp(
      userId=1,
      displayName='Tiffany Day',
      linkName='tiffany-day',
      tiktok='https://www.tiktok.com/@tiffdidwhat',
      youtube='https://www.youtube.com/@TiffanyDay',
      instagram='https://www.instagram.com/tiffdidwhat/',
      spotify='https://open.spotify.com/artist/5D5Qbe1lf3aMnLsPSzXItu',
      external='https://www.tiffdidwhat.com/')
    josiah = Repp(
      userId=2,
      displayName='Highvyn',
      linkName='highvyn',
      tiktok='https://www.tiktok.com/@highvyn',
      youtube='https://www.youtube.com/channel/UCWlhD5_iISfDwsjZ7x3eOuQ',
      instagram='https://www.instagram.com/highvyn',
      spotify='https://open.spotify.com/artist/1HlyA7Fg1HymDUmG0xaB13')
    eric = Repp(
      userId=3,
      displayName='Eric Nam',
      linkName='eric-nam',
      tiktok='https://www.tiktok.com/@ericnam',
      youtube='https://www.youtube.com/@ericnam',
      instagram='https://www.instagram.com/ericnam/',
      spotify='https://open.spotify.com/artist/2FLqlgckDKdmpBrvLAT5BM',
      twitter='https://twitter.com/ericnamofficial',
      external='https://www.ericnam.com/')

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
def undo_repps():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.repps RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM repps"))

    db.session.commit()
