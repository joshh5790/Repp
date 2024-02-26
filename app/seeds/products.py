from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text


def seed_products():
    product1 = Product(
        profileId=1,
        name="World Tour Hoodie",
        price=65,
        previewImage="https://cdn.shopify.com/s/files/1/0091/7454/8577/files/hoodiefront_550x825.png",
    )
    product2 = Product(
        profileId=1,
        name="World Tour Long Sleeve",
        price=50,
        previewImage="https://cdn.shopify.com/s/files/1/0091/7454/8577/files/redhousefront_550x825.png",
    )
    product3 = Product(
        profileId=1,
        name="World Tour Tee",
        price=35,
        previewImage="https://cdn.shopify.com/s/files/1/0091/7454/8577/files/gardentee_550x825.png",
    )
    product4 = Product(
        profileId=1,
        name="House on a Hill Tee",
        price=35,
        previewImage="https://cdn.shopify.com/s/files/1/0091/7454/8577/files/tourteefront_550x825.png",
    )
    product5 = Product(
        profileId=1,
        name="Eric Nam Dad Hat",
        price=30,
        previewImage="https://cdn.shopify.com/s/files/1/0091/7454/8577/files/2023hat_550x825.png",
    )
    product6 = Product(
        profileId=1,
        name="House on a Hill Tote",
        price=25,
        previewImage="https://cdn.shopify.com/s/files/1/0091/7454/8577/files/tote_550x825.png",
    )
    product7 = Product(
        profileId=4,
        name="guitar sweatshirt",
        price=38.29,
        description="A sturdy and warm sweatshirt bound to keep you warm in the colder months. A pre-shrunk, classic fit sweater that's made with air-jet spun yarn for a soft feel and reduced pilling.",
        previewImage="https://ucarecdn.com/ff1c03eb-181e-4dba-917e-054172159a28/",
    )
    product8 = Product(
        profileId=4,
        name="phone shirt",
        price=22.73,
        description="This t-shirt is everything you've dreamed of and more. It feels soft and lightweight, with the right amount of stretch. It's comfortable and flattering for all.",
        previewImage="https://ucarecdn.com/902d9757-bcd3-47d3-bd69-f746ac7ebd45/",
    )
    product9 = Product(
        profileId=4,
        name="will i see u again shirt",
        price=17.80,
        description="You've now found the staple t-shirt of your wardrobe. It's made of 100% ring-spun cotton and is soft and comfy. The double stitching on the neckline and sleeves add more durability to what is sure to be a favorite!",
        previewImage="https://ucarecdn.com/8ee8689b-ca0b-4009-9815-80c5c0f9c4a0/",
    )
    product10 = Product(
        profileId=4,
        name="Why Should We Turn Around? - Digital",
        price=5,
        previewImage="https://ucarecdn.com/599e0c18-0696-4d0f-9149-419cab048abe/",
    )
    product11 = Product(
        profileId=4,
        name="The Art of Overthinking - Digital",
        price=7,
        description="shoutout to ed sheeran for always telling me to believe in myself",
        previewImage="https://ucarecdn.com/9482589d-d485-4700-856c-816e4be7d35e/",
    )


    db.session.add(product1)
    db.session.add(product2)
    db.session.add(product3)
    db.session.add(product4)
    db.session.add(product5)
    db.session.add(product6)
    db.session.add(product7)
    db.session.add(product8)
    db.session.add(product9)
    db.session.add(product10)
    db.session.add(product11)
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
