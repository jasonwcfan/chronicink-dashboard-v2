import sys
import json
import numpy
import datetime
from pymongo import MongoClient

from random import randint

mongo_client = MongoClient('mongodb://localhost:3001/')
db = mongo_client.meteor


def get_work_hours(x):
    return {
        0: {"start": 0, "end": 0},
        1: {"start": 12, "end": 16},
        2: {"start": 16, "end": 20},
        3: {"start": 12, "end": 20},
    }[x]


def main():

    # randomize artist styles
    for artist in db.artist.find():
        styles = artist["preferences"]["styles"]

        avail = {"monday": {},
                 "tuesday": {},
                 "wednesday": {},
                 "thursday": {},
                 "friday": {},
                 "saturday": {},
                 "sunday": {}, }

        # the next available opening for this artist
        date = datetime.datetime.now() + datetime.timedelta(days=(randint(1, 365)))

        start_time = randint(12, 18)
        end_time = randint(start_time + 1, 20)

        next_opening = {"start": date.replace(hour=start_time, minute=0, second=0),
                        "end": date.replace(hour=end_time, minute=0, second=0)}

        # hours booked in the next 60 days
        hours_booked = randint(0, 480)

        # the hours this artist works each day of the week
        for key in avail:
            avail[key] = get_work_hours(randint(0, 3))

        for key in styles:
            styles[key] = randint(0, 100)

        db.artist.update({"_id": artist["_id"]},
                         {"$set": {"preferences.styles": styles,
                                   "preferences.availability": avail,
                                   "nextOpening": next_opening,
                                   "hoursBooked": hours_booked}})


if __name__ == '__main__':
    main()
