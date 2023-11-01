from app.models import db, ProductImage, environment, SCHEMA
from sqlalchemy.sql import text


def seed_productImages():
  image1 = ProductImage(
    productId=1,
    image='https://cdn.shopify.com/s/files/1/0091/7454/8577/files/hoodieback_280x420.png'
  )
  image2 = ProductImage(
    productId=2,
    image='https://cdn.shopify.com/s/files/1/0091/7454/8577/files/redhouseback_280x420.png'
  )
  image3 = ProductImage(
    productId=3,
    image='https://cdn.shopify.com/s/files/1/0091/7454/8577/files/gardenteeback_280x420.png'
  )

  db.session.add(image1)
  db.session.add(image2)
  db.session.add(image3)
  db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_productImages():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.productimages RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM productimages"))

  db.session.commit()
