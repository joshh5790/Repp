from app.models import db, TourLocation, environment, SCHEMA
from sqlalchemy.sql import text


def seed_tourLocations():
    db.session.add_all(
        [
            TourLocation(
                tourId=1,
                venue="HOUSE OF BLUES",
                location="ORLANDO, FL",
                tourDate="SEP 21 THU",
                ticketsLink="https://www.ticketmaster.com/event/22005ECF7AF6B7EF",
            ),
            TourLocation(
                tourId=1,
                venue="THE RITZ YBOR",
                location="TAMPA, FL",
                tourDate="SEP 23 SAT",
                ticketsLink="https://www.ticketmaster.com/event/22005ECF7AF6B7EF",
            ),
            TourLocation(
                tourId=1,
                venue="REVOLUTION",
                location="FT. LAUDERDALE, FL",
                tourDate="SEP 24 SUN",
                ticketsLink="https://www.ticketmaster.com/event/22005ECF7AF6B7EF",
            ),
            TourLocation(
                tourId=1,
                venue="COCA-COLA ROXY",
                location="ATLANTA, GA",
                tourDate="SEP 26 TUE",
                ticketsLink="https://www.ticketmaster.com/event/22005ECF7AF6B7EF",
            ),
            TourLocation(
                tourId=1,
                venue="MARATHON MUSIC WORKS",
                location="NASHVILLE, TN",
                tourDate="SEP 27 WED",
                ticketsLink="https://www.ticketmaster.com/event/22005ECF7AF6B7EF",
            ),
            TourLocation(
                tourId=1,
                venue="THE FILLMORE",
                location="CHARLOTTE, NC",
                tourDate="SEP 29 FRI",
                ticketsLink="https://www.ticketmaster.com/event/22005ECF7AF6B7EF",
            ),
            TourLocation(
                tourId=1,
                venue="THE RITZ",
                location="RALEIGH, NC",
                tourDate="SEP 30 SAT",
                ticketsLink="https://www.ticketmaster.com/event/22005ECF7AF6B7EF",
            ),
            TourLocation(
                tourId=1,
                venue="THE NORVA",
                location="NORFOLK, VA",
                tourDate="OCT 01 SUN",
                ticketsLink="https://www.ticketmaster.com/event/22005ECF7AF6B7EF",
            ),
            TourLocation(
                tourId=1,
                venue="RAM'S HEAD LIVE",
                location="BALTIMORE, MD",
                tourDate="OCT 03 TUE",
                ticketsLink="https://www.ticketmaster.com/event/22005ECF7AF6B7EF",
            ),
            TourLocation(
                tourId=1,
                venue="ECHOSTAGE",
                location="WASHINGTON, DC",
                tourDate="OCT 04 WED",
                ticketsLink="https://www.ticketmaster.com/event/22005ECF7AF6B7EF",
            ),
            TourLocation(
                tourId=1,
                venue="ROXIAN THEATRE",
                location="PITTSBURGH, PA",
                tourDate="OCT 06 FRI",
                ticketsLink="https://www.ticketmaster.com/event/22005ECF7AF6B7EF",
            ),
            TourLocation(
                tourId=1,
                venue="THE FILLMORE",
                location="PHILADELPHIA, PA",
                tourDate="OCT 07 SAT",
                ticketsLink="https://www.ticketmaster.com/event/22005ECF7AF6B7EF",
            ),
            TourLocation(
                tourId=1,
                venue="COLLEGE STREET MUSIC HALL",
                location="NEW HAVEN, CT",
                tourDate="OCT 10 TUE",
                ticketsLink="https://www.ticketmaster.com/event/22005ECF7AF6B7EF",
            ),
            TourLocation(
                tourId=1,
                venue="ROOFTOP AT PIER 17",
                location="NEW YORK, NY",
                tourDate="OCT 11 WED",
                ticketsLink="https://www.ticketmaster.com/event/22005ECF7AF6B7EF",
            ),
            TourLocation(
                tourId=1,
                venue="ROADRUNNER",
                location="BOSTON, MA",
                tourDate="OCT 13 FRI",
                ticketsLink="https://www.ticketmaster.com/event/22005ECF7AF6B7EF",
            ),
            TourLocation(
                tourId=1,
                venue="MTELUS",
                location="MONTREAL, QC",
                tourDate="OCT 14 SAT",
                ticketsLink="https://www.ticketmaster.com/event/22005ECF7AF6B7EF",
            ),
            TourLocation(
                tourId=1,
                venue="HISTORY",
                location="TORONTO, ON",
                tourDate="OCT 16 MON",
                ticketsLink="https://www.ticketmaster.com/event/22005ECF7AF6B7EF",
            ),
            TourLocation(
                tourId=1,
                venue="THE FILLMORE",
                location="DETROIT, MI",
                tourDate="OCT 18 WED",
                ticketsLink="https://www.ticketmaster.com/event/22005ECF7AF6B7EF",
            ),
            TourLocation(
                tourId=1,
                venue="KEMBA LIVE",
                location="COLUMBUS, OH",
                tourDate="OCT 19 THU",
                ticketsLink="https://www.ticketmaster.com/event/22005ECF7AF6B7EF",
            ),
            TourLocation(
                tourId=1,
                venue="RIVIERA THEATRE",
                location="CHICAGO, IL",
                tourDate="OCT 21 SAT",
                ticketsLink="https://www.ticketmaster.com/event/22005ECF7AF6B7EF",
            ),
            TourLocation(
                tourId=1,
                venue="THE PAGEANT",
                location="ST. LOUIS, MO",
                tourDate="OCT 22 SUN",
                ticketsLink="https://www.ticketmaster.com/event/22005ECF7AF6B7EF",
            ),
            TourLocation(
                tourId=1,
                venue="THE MIDLAND THEATRE",
                location="KANSAS CITY, MO",
                tourDate="OCT 24 TUE",
                ticketsLink="https://www.ticketmaster.com/event/22005ECF7AF6B7EF",
            ),
            TourLocation(
                tourId=1,
                venue="THE FILLMORE",
                location="MINNEAPOLIS, MN",
                tourDate="OCT 25 WED",
                ticketsLink="https://www.ticketmaster.com/event/22005ECF7AF6B7EF",
            ),
            TourLocation(
                tourId=1,
                venue="THE OGDEN",
                location="DENVER, CO",
                tourDate="OCT 27 FRI",
                ticketsLink="https://www.ticketmaster.com/event/22005ECF7AF6B7EF",
            ),
            TourLocation(
                tourId=1,
                venue="UNION EVENT CENTER",
                location="SALT LAKE CITY, UT",
                tourDate="OCT 28 SAT",
                ticketsLink="https://www.ticketmaster.com/event/22005ECF7AF6B7EF",
            ),
            TourLocation(
                tourId=1,
                venue="MACEWAN HALL",
                location="CALGARY, AB",
                tourDate="OCT 30 MON",
                ticketsLink="https://www.ticketmaster.com/event/22005ECF7AF6B7EF",
            ),
            TourLocation(
                tourId=1,
                venue="VOGUE THEATRE",
                location="VANCOUVER, BC",
                tourDate="NOV 01 WED",
                ticketsLink="https://www.ticketmaster.com/event/22005ECF7AF6B7EF",
            ),
            TourLocation(
                tourId=1,
                venue="SHOWBOX SODO",
                location="SEATTLE, WA",
                tourDate="NOV 03 FRI",
                ticketsLink="https://www.ticketmaster.com/event/22005ECF7AF6B7EF",
            ),
            TourLocation(
                tourId=1,
                venue="ROSELAND THEATER",
                location="PORTLAND, OR",
                tourDate="NOV 04 SAT",
                ticketsLink="https://www.ticketmaster.com/event/22005ECF7AF6B7EF",
            ),
            TourLocation(
                tourId=1,
                venue="FOX THEATER",
                location="OAKLAND, CA",
                tourDate="NOV 06 MON",
                ticketsLink="https://www.ticketmaster.com/event/22005ECF7AF6B7EF",
            ),
            TourLocation(
                tourId=1,
                venue="HARD ROCK LIVE",
                location="WHEATLAND, CA",
                tourDate="NOV 07 TUE",
                ticketsLink="https://www.ticketmaster.com/event/22005ECF7AF6B7EF",
            ),
            TourLocation(
                tourId=1,
                venue="BROOKLYN BOWL",
                location="LAS VEGAS, NV",
                tourDate="NOV 10 FRI",
                ticketsLink="https://www.ticketmaster.com/event/22005ECF7AF6B7EF",
            ),
            TourLocation(
                tourId=1,
                venue="SHRINE EXPO HALL",
                location="LOS ANGELES, CA",
                tourDate="NOV 11 SAT",
                ticketsLink="https://www.ticketmaster.com/event/22005ECF7AF6B7EF",
            ),
            TourLocation(
                tourId=1,
                venue="HOUSE OF BLUES",
                location="ANAHEIM, CA",
                tourDate="NOV 13 MON",
                ticketsLink="https://www.ticketmaster.com/event/22005ECF7AF6B7EF",
            ),
            TourLocation(
                tourId=1,
                venue="SOMA",
                location="SAN DIEGO, CA",
                tourDate="NOV 14 TUE",
                ticketsLink="https://www.ticketmaster.com/event/22005ECF7AF6B7EF",
            ),
            TourLocation(
                tourId=1,
                venue="VAN BUREN",
                location="PHOENIX, AZ",
                tourDate="NOV 15 WED",
                ticketsLink="https://www.ticketmaster.com/event/22005ECF7AF6B7EF",
            ),
            TourLocation(
                tourId=1,
                venue="SOUTH SIDE BALLROOM",
                location="DALLAS, TX",
                tourDate="NOV 30 THU",
                ticketsLink="https://www.ticketmaster.com/event/22005ECF7AF6B7EF",
            ),
            TourLocation(
                tourId=1,
                venue="STUBB'S WALLER CREEK AMPHITHEATER",
                location="AUSTIN, TX",
                tourDate="DEC 02 SAT",
                ticketsLink="https://www.ticketmaster.com/event/22005ECF7AF6B7EF",
            ),
            TourLocation(
                tourId=1,
                venue="BAYOU MUSIC CENTER",
                location="HOUSTON, TX",
                tourDate="DEC 03 SUN",
                ticketsLink="https://www.ticketmaster.com/event/22005ECF7AF6B7EF",
            ),
            # TourLocation(
            #     tourId=2,
            #     venue="South Side Ballroom @ 7:30pm",
            #     location="Dallas, TX, United States",
            #     tourDate="NOV 30 THU",
            #     ticketsLink="https://www.ticketmaster.com/event/22005ECF7AF6B7EF",
			# 	rsvpLink="https://www.bandsintown.com/artist-rsvp/15485620?event_id=1029444266&utm_campaign=event&utm_medium=api&app_id=squarespace-oleander-amethyst-fgfz&utm_source=public_api&came_from=267&spn=0&signature=ZZ23a31594d7868333598c5afab9109127706a14762d769cdeca43aa37c3400e02"
            # ),
            # TourLocation(
            #     tourId=2,
            #     venue="Stubb's Waller Creek Amphitheater @ 6:30pm",
            #     location="Austin, TX, United States",
            #     tourDate="DEC 2 SAT",
            #     ticketsLink="https://www.ticketmaster.com/event/22005ECF7AF6B7EF",
			# 	rsvpLink="https://www.bandsintown.com/artist-rsvp/15485620?event_id=1029445130&utm_campaign=event&utm_medium=api&app_id=squarespace-oleander-amethyst-fgfz&utm_source=public_api&came_from=267&spn=0&signature=ZZ23a31594d7868333598c5afab9109127706a14762d769cdeca43aa37c3400e02"
            # ),
            # TourLocation(
            #     tourId=3,
            #     location="Hamburg, Germany",
            #     tourDate="Jan 23, 2024",
            #     ticketsLink="https://tickets.kj.de/produkte/59564-tickets-chris-james-nochtspeicher-hamburg-am-23-01-2024",
			# 	rsvpLink="https://www.bandsintown.com/e/104803317?app_id=supertape_f8c3f1a149aaaa4bbd96c837182b1e3e&came_from=706&utm_medium=api&utm_source=public_api&utm_campaign=event&trigger=rsvp_going"
            # ),
            # TourLocation(
            #     tourId=3,
            #     location="Hannover, Germany",
            #     tourDate="Jan 24, 2024",
            #     ticketsLink="https://tickets.kj.de/produkte/59581-tickets-chris-james-lux-hannover-am-24-01-2024",
			# 	rsvpLink="https://www.bandsintown.com/e/104803330?app_id=supertape_f8c3f1a149aaaa4bbd96c837182b1e3e&came_from=706&utm_medium=api&utm_source=public_api&utm_campaign=event&trigger=rsvp_going"
            # ),
            # TourLocation(
            #     tourId=3,
            #     location="Berlin, Germany",
            #     tourDate="Jan 25, 2024",
            #     ticketsLink="https://tickets.kj.de/produkte/59570-tickets-chris-james-privatclub-berlin-am-25-01-2024",
			# 	rsvpLink="https://www.bandsintown.com/e/104803336?app_id=supertape_f8c3f1a149aaaa4bbd96c837182b1e3e&came_from=706&utm_medium=api&utm_source=public_api&utm_campaign=event&trigger=rsvp_going"
            # ),
            # TourLocation(
            #     tourId=3,
            #     location="Munich, Germany",
            #     tourDate="Jan 26, 2024",
            #     ticketsLink="https://tickets.kj.de/produkte/59571-tickets-chris-james-milla-club-muenchen-am-26-01-2024",
			# 	rsvpLink="https://www.bandsintown.com/e/104803336?app_id=supertape_f8c3f1a149aaaa4bbd96c837182b1e3e&came_from=706&utm_medium=api&utm_source=public_api&utm_campaign=event&trigger=rsvp_going"
            # ),
            # TourLocation(
            #     tourId=3,
            #     location="Cologne, Germany",
            #     tourDate="Jan 27, 2024",
            #     ticketsLink="https://tickets.kj.de/produkte/59568-tickets-chris-james-artheater-koeln-am-27-01-2024",
			# 	rsvpLink="https://www.bandsintown.com/e/104803340?app_id=supertape_f8c3f1a149aaaa4bbd96c837182b1e3e&came_from=706&utm_medium=api&utm_source=public_api&utm_campaign=event&trigger=rsvp_going"
            # ),
        ]
    )
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_tourLocations():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.tourlocations RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM tourlocations"))

    db.session.commit()
