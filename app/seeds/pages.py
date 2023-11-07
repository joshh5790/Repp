from app.models import db, Page, environment, SCHEMA
from sqlalchemy.sql import text


def seed_pages():
    tiff = Page(
        userId=1,
        displayName="Tiffany Day",
        linkName="tiffany-day",
        tiktok="https://www.tiktok.com/@tiffdidwhat",
        youtube="https://www.youtube.com/@TiffanyDay",
        instagram="https://www.instagram.com/tiffdidwhat/",
        spotify="https://open.spotify.com/artist/5D5Qbe1lf3aMnLsPSzXItu",
        discord="https://discord.com/invite/PG2s2b3Mgg",
        external="https://www.tiffdidwhat.com/",
        mainImage="https://images.squarespace-cdn.com/content/v1/637d57dd5eff390eb0e98337/5c9a89cf-68a5-4cd7-8f3f-a28d6207cb69/image00002.jpeg",
        mainVideo="https://www.youtube.com/embed/MzkQVaiAlrE",
        bio="my name is tiff. im 23 years old and i make music. um. that’s pretty much most of my life. um. i live in los angeles and um. it’s great here. um. i enjoy um rice. and um pasta. and i really like pickles but i have a health condition that um uh doesn’t um really let me eat them properly. um. anyways. the goal is the be um. a really big pop star. um. maybe you can help wid that. um. thanks. >.<",
        newsletter="tiffanydaynewsletter@gmail.com",
        videoSection=True,
        shopSection=False,
    )
    josiah = Page(
        userId=2,
        displayName="Highvyn",
        linkName="highvyn",
        tiktok="https://www.tiktok.com/@highvyn",
        youtube="https://www.youtube.com/channel/UCWlhD5_iISfDwsjZ7x3eOuQ",
        instagram="https://www.instagram.com/highvyn",
        spotify="https://open.spotify.com/artist/1HlyA7Fg1HymDUmG0xaB13",
        mainImage="https://i.ytimg.com/vi/X2UINYpMOOw/hq720.jpg",
        mainVideo="https://www.youtube.com/embed/zkZJ6J2M5GA",
        bio="Sailing precariously between the borders of alternative rnb, indie pop, and electronic dance genres, Highvyn searches for an identity that blends sounds and emotions into a beautifully curated mess. Self-produced, written, and recorded in his DIY home studio in the dmv, Highvyn has carved out a space for himself as an artist that has no true equivalents. \nHighvyn balances his ever-changing sound with lyrics from the heart, with an intimate writing style that explores themes of self-discovery and the struggles of young love. In 2024, Highvyn hopes to expand the full potential of his artistry to create music that transcends time, space, and mediums.",
        newsletter="highvynnewsletter@gmail.com",
        videoSection=False,
        shopSection=False,
    )
    eric = Page(
        userId=3,
        displayName="Eric Nam",
        linkName="eric-nam",
        tiktok="https://www.tiktok.com/@ericnam",
        youtube="https://www.youtube.com/@ericnam",
        instagram="https://www.instagram.com/ericnam/",
        spotify="https://open.spotify.com/artist/2FLqlgckDKdmpBrvLAT5BM",
        twitter="https://twitter.com/ericnamofficial",
        external="https://www.ericnam.com/",
        mainImage="https://images.squarespace-cdn.com/content/v1/63eae897c2c95606c0640635/56a21110-9888-4b55-be84-8caf529f9453/Website+Banner+-+HOAH.png",
        mainVideo="https://www.youtube.com/embed/Se6KGVNZDvw",
        bio="Named GQ Korea’s Man of the Year and Forbes 30 Under 30 Asia, the multifaceted musician, actor and television personality Eric Nam is one of the most successful Korean-American figures of recent times, having built what GQ calls “one of the most varied and entrepreneurial legacies in the K-Pop scene.” With 3.5M+ monthly listeners and 4.6M+ followers on Instagram, Eric has amassed over 1B streams on Spotify and most recently headlined a sold-out world tour playing 59 headline shows across 54 cities including Los Angeles, New York, Paris, London and Melbourne. In addition to music, Eric is a co-founder and creative director at DIVE Studios, the world’s leading AAPI and K-pop focused media company with multiple award-winning podcasts, and Mindset, a mental health and wellness platform for Gen Z audiences.",
        newsletter="ericnamnewsletter@gmail.com",
        businessInquiries="info@enmgmt.com",
        videoSection=True,
        shopSection=True,
    )

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
def undo_pages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.pages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM pages"))

    db.session.commit()
