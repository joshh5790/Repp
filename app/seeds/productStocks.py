from app.models import db, ProductStock, environment, SCHEMA
from sqlalchemy.sql import text


def seed_productStocks():
    db.session.add_all(
        [
            ProductStock(productId=2, size="S", stock=0),
            ProductStock(productId=2, size="M", stock=0),
            ProductStock(productId=2, size="L", stock=0),
            ProductStock(productId=2, size="XL", stock=0),
            ProductStock(productId=3, size="S", stock=10),
            ProductStock(productId=3, size="M", stock=10),
            ProductStock(productId=3, size="L", stock=10),
            ProductStock(productId=3, size="XL", stock=10),
            ProductStock(productId=4, size="S", stock=10),
            ProductStock(productId=4, size="M", stock=10),
            ProductStock(productId=4, size="L", stock=10),
            ProductStock(productId=4, size="XL", stock=10),
            ProductStock(productId=5, stock=10),
            ProductStock(productId=6, stock=10),
            ProductStock(productId=7, size="S", stock=10),
            ProductStock(productId=7, size="M", stock=10),
            ProductStock(productId=7, size="L", stock=10),
            ProductStock(productId=7, size="XL", stock=10),
            ProductStock(productId=8, size="S", stock=10),
            ProductStock(productId=8, size="M", stock=10),
            ProductStock(productId=8, size="L", stock=10),
            ProductStock(productId=8, size="XL", stock=10),
            ProductStock(productId=9, size="S", stock=10),
            ProductStock(productId=9, size="M", stock=10),
            ProductStock(productId=9, size="L", stock=10),
            ProductStock(productId=9, size="XL", stock=10),
            ProductStock(productId=10, stock=1000),
            ProductStock(productId=11, stock=1000),
        ]
    )
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_productStocks():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.productstocks RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM productstocks"))

    db.session.commit()
