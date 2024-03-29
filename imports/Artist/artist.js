import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

function getBookedHours(artist, timeFrame) {
    GCalendar.getBookedHours(artist.calendarID, timeFrame, Meteor.bindEnvironment((err, hours) => {

        // Create key value pair for # of hours booked within specified timeframe
        let obj = {};
        obj['hoursIn' + String(timeFrame) + 'Days'] = hours;
        timeFrame = String(timeFrame);

        // Update the hours of the artist with matching calendarID in the Artist collection
        Artist.update({calendarID: artist.calendarID}, {$set:obj},(err,response) => {
            if (err) {
                console.log(err)
            }
        })
    }));
}

Meteor.methods({
    'artist.getEarliestOpening': function() {
        if (Meteor.isServer) {

            const artists = Artist.find().fetch();
            artists.forEach((artist) => {
                GCalendar.getEarliestOpening(artist.calendarID, artist.schedule, artist.minimumOpening, Meteor.bindEnvironment((err, res) => {
                    if (err) {console.log(err); return}
                    Artist.update({calendarID: artist.calendarID}, {$set: {earliestOpening: res ? {
                        startTime: res.startTime.toDate(),
                        endTime: res.endTime.toDate()
                    } : null}})
                }))
            });
        }    
    },
    'artist.getHoursBooked': function(timeFrame) {
        // Timeframe given in days (e.g. 60 = 2 months)
        if (Meteor.isServer) {
            const timeFrames = [7, 14, 30, 60, 90];
            const artists = Artist.find().fetch();
            artists.forEach((artist) => {
                if (timeFrame) {
                    getBookedHours(artist, timeFrame);
                } else {
                    timeFrames.forEach((elem) => {
                        getBookedHours(artist, elem);
                    })
                }
            });
        }
    },
    'artist.setStylePreferences': function(id, newStylePreferences) {
        Artist.update({_id: new Mongo.ObjectID(id)}, {$set: {'preferences.styles': newStylePreferences}}, (err, res) => {
            if (err) {
                console.log(err);
            }
        })
    },
    'artist.setKeywordPreferences': function(id, preferredKeywords, refusedKeywords) {
        if (preferredKeywords) {
            Artist.update({_id: new Mongo.ObjectID((id))}, {$set: {'preferences.preferredKeywords': preferredKeywords}}, (err, res) => {
                if (err) throw err;
            });
        }
        if (refusedKeywords) {
            Artist.update({_id: new Mongo.ObjectID((id))}, {$set: {'preferences.refusedKeywords': refusedKeywords}}, (err, res) => {
                if (err) throw err;
            });
        }
    },
    'artist.update': function(id, delta, cb) {
        return Artist.update({_id: id}, {$set: delta}, (error, affectedCount) => {
            if(cb) {
                return cb(error, response)
            }

            if(error) {
                throw error;
            }

        });
    }
});

export default Artist = new Mongo.Collection('artist');
