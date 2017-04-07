import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Meteor.methods({
    'artist.getHoursBooked': function(calendarID, timeFrame) {
        // Timeframe given in days (e.g. 60 = 2 months)

        if (Meteor.isServer) {
            GCalendar.getBookedHours(calendarID, timeFrame, Meteor.bindEnvironment((err, hours) => {

                // Create key value pair for # of hours booked within specified timeframe
                let obj = {};
                obj['hoursIn' + String(timeFrame) + 'Days'] = hours;
                timeFrame = String(timeFrame);

                // Update the hours of the artist with matching calendarID in the Artist collection
                Artist.update({calendarID}, {$set:obj},(err,response) => {
                    if (err) {
                        console.log(err)
                    }
                })
            }));


        }
    },
    'artist.setStylePreferences': function(id, newStylePreferences) {
        Artist.update({_id: new Mongo.ObjectID(id)}, {$set: {'preferences.styles': newStylePreferences}}, (err, res) => {
            if (err) {
                console.log(err);
            }
        })
    }
});

export default Artist = new Mongo.Collection('artist');