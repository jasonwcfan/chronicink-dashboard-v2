import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Meteor.methods({
    'artist.getHoursBooked': function(calendarID, timeFrame) {
        // Timeframe given in days (e.g. sixtyDays = 2 months)
        if (Meteor.isServer) {
            // const getHours = Meteor.wrapAsync(GCalendar.getBookedHours);
            // return getHours(calendarID, timeFrame);
            const numTimeFrame = (() => {
                switch (timeFrame) {
                    case 'sevenDays':
                        return 7;
                    case 'fourteenDays':
                        return 14;
                    case 'thirtyDays':
                        return 30;
                    case 'sixtyDays':
                        return 60;
                    case 'ninetyDays':
                        return 90;
                    default:
                        return 30;
                }
            })();
            GCalendar.getBookedHours(calendarID, numTimeFrame, Meteor.bindEnvironment(function(err, hours) {
                if (err) {
                    console.log(err);
                    return err;
                }

                let hoursBooked = {};
                hoursBooked[timeFrame] = hours;
                Artist.update({calendarID}, {$set: {hoursBooked}});
            }))
        }
    }
});

export default Artist = new Mongo.Collection('artist');