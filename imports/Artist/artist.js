import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Meteor.methods({
    'artist.getBookedHours': function(calendarID, timeFrame) {
        // Timeframe given in days (e.g. 60 = 2 months)
        if (Meteor.isServer) {
            const getHours = Meteor.wrapAsync(GCalendar.getBookedHours);
            return getHours(calendarID, timeFrame);
        }
    }
});

export default Artist = new Mongo.Collection('artist');