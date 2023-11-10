from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text


def seed_products():
    product1 = Product(
        pageId=1,
        name="World Tour Hoodie",
        price=65,
        previewImage="https://cdn.shopify.com/s/files/1/0091/7454/8577/files/hoodiefront_550x825.png",
    )
    product2 = Product(
        pageId=1,
        name="World Tour Long Sleeve",
        price=50,
        previewImage="https://cdn.shopify.com/s/files/1/0091/7454/8577/files/redhousefront_550x825.png",
    )
    product3 = Product(
        pageId=1,
        name="World Tour Tee",
        price=35,
        previewImage="https://cdn.shopify.com/s/files/1/0091/7454/8577/files/gardentee_550x825.png",
    )
    product4 = Product(
        pageId=1,
        name="House on a Hill Tee",
        price=35,
        previewImage="https://cdn.shopify.com/s/files/1/0091/7454/8577/files/tourteefront_550x825.png",
    )
    product5 = Product(
        pageId=1,
        name="Eric Nam Dad Hat",
        price=30,
        previewImage="https://cdn.shopify.com/s/files/1/0091/7454/8577/files/2023hat_550x825.png",
    )
    product6 = Product(
        pageId=1,
        name="House on a Hill Tote",
        price=25,
        previewImage="https://cdn.shopify.com/s/files/1/0091/7454/8577/files/tote_550x825.png",
    )

    db.session.add(product1)
    db.session.add(product2)
    db.session.add(product3)
    db.session.add(product4)
    db.session.add(product5)
    db.session.add(product6)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_products():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
