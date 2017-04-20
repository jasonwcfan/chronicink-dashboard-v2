import sys
import json
import numpy
import math
import datetime
from pymongo import MongoClient
from bson.objectid import ObjectId
import test_setup

mongo_client = MongoClient('mongodb://localhost:3001/')
db = mongo_client.meteor


# normalize a value given the max and min
def normalize(min, max, x):
    return (x - min) / (max - min)


# rank artists, giving them a final score based on style preferences, soonest opening, and booking volume
def rank(artist, style, min_booking_volume, max_booking_volume, min_soonest_opening, max_soonest_opening):

    # normalize input variables between 0 and 1 so we can assign them weights
    n_booking_volume = 1 - normalize(min_booking_volume, max_booking_volume, artist['bookingVolume'])

    # take 33 as the cutt-off for penalizing lower preferences
    n_style_preference = (artist['preference'] - 33)/67
    n_soonest_opening = normalize(min_soonest_opening, max_soonest_opening, artist['soonestOpeningTrans'])

    # apply the weights here
    score = (0.5 * n_booking_volume) + (1 * n_style_preference) + (2 * n_soonest_opening)

    return score


def main():
    # setup artists and randomize values
    # test_setup.main()

    # parse out tattoo properties
    data = json.loads(sys.stdin.readline())
    style = data['tattooStyle']

    # store all values for each of the transformed input variables
    artist_properties = []

    # find all artists
    for artist in db.artist.find({'preferences.styles.' + style: {'$gt': 0}}):
        soonest_opening = (artist['nextOpening']['start'] - datetime.datetime.now()).days
        preference = artist['preferences']['styles'][style]
        booking_volume = artist['hoursIn60Days']

        if (preference is None) or (soonest_opening is None) or (booking_volume is None):
            continue

        # optionally apply transformations to properties before normalizing
        values = {'name': artist['name'],
                  '_id': str(artist['_id']),
                  'preference': preference,
                  'soonestOpeningTrans': 1/math.log(soonest_opening + 2, 10),
                  'soonestOpening': soonest_opening,
                  'bookingVolume': booking_volume}
        artist_properties.append(values)

    # find min and max values for normalization
    booking_volume_seq = [x['bookingVolume'] for x in artist_properties]
    soonest_opening_seq = [x['soonestOpeningTrans'] for x in artist_properties]
    min_booking_volume = min(booking_volume_seq)
    max_booking_volume = max(booking_volume_seq)
    max_soonest_opening = max(soonest_opening_seq)
    min_soonest_opening = min(soonest_opening_seq)

    artist_properties.sort(key=lambda x: (rank(x,
                                               style,
                                               min_booking_volume,
                                               max_booking_volume,
                                               min_soonest_opening,
                                               max_soonest_opening)), reverse=True)

    result_set = []
    for elem in artist_properties:
        # print('Preference: {}, Soonest Opening: {}, Booking Volume: {}, Score: {}'.format(
        #     elem['preference'],
        #     elem['soonestOpening'],
        #     elem['bookingVolume'],
        #     (rank(elem,
        #           style,
        #           min_booking_volume,
        #           max_booking_volume,
        #           min_soonest_opening,
        #           max_soonest_opening)
        #      )
        # ))
        result_set.append(
            {'name': elem['name'], '_id': elem['_id'], 'preference': elem['preference'], 'soonestOpening': elem['soonestOpening'],
             'bookingVolume': elem['bookingVolume'], 'score': rank(elem,
                                                                style,
                                                                min_booking_volume,
                                                                max_booking_volume,
                                                                min_soonest_opening,
                                                                max_soonest_opening)})

    print(json.dumps(result_set))



if __name__ == '__main__':
    main()
