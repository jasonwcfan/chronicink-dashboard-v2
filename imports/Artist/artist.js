import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Meteor.methods({
    'artist.getBookedHours': function(calendarID, timeframe) {
        // Timeframe given in days (e.g. 60 = 2 months)
        if (Meteor.isServer) {
            const getHours = Meteor.wrapAsync(GCalendar.getBookedHours);
            return getHours(calendarID, 90);
        }
    }
});

export default Artist = new Mongo.Collection('artist');