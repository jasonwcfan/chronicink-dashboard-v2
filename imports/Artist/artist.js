import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Meteor.methods({
    'artist.getBookedHours': function(artistName, timeframe) {
        // Timeframe given in days (e.g. 60 = 2 months)
        if (Meteor.isServer) {
            const getHours = Meteor.wrapAsync(GCalendar.getBookedHours);
            return getHours('f59gej5v6rimvqccv8a79dikq0@group.calendar.google.com', 90);
        }
    }
});

export default Artist = new Mongo.Collection('artist');