import { HTTP } from 'meteor/http';
import google from 'googleapis';
import googleAuth from 'google-auth-library';
import Moment from 'moment';

const clientSecret = Meteor.settings.google.client_secret;
const clientID = Meteor.settings.google.client_id;
const redirectURL = Meteor.settings.google.redirect_uris;

const authFactory = new googleAuth();
const oauth2Client = new authFactory.OAuth2(clientID, clientSecret, redirectURL);

const calendar = google.calendar('v3');

GCalendar = {
    insertEvent: function (event, calendarID, callback) {

        oauth2Client.setCredentials({
            access_token: Meteor.user().services.google.accessToken,
            refresh_token: Meteor.user().services.google.refreshToken,
            expiry_date: Meteor.user().services.google.expiresAt
        });

        calendar.events.insert({
            auth: oauth2Client,
            calendarId: calendarID,
            resource: event

        }, function(err, res) {
            if (err) {
                console.log('throwing error!');
                callback(err, null);
                return;
            }
            callback(null, res);
        });

    },
    getBookedHours: function(calendarID, timeframe, callback) {
        const timeMin = new Moment();
        const timeMax = new Moment();

        timeMax.add(timeframe, 'days');
        timeMax.set({'hour': 11, 'minute': 59, 'second': 59});

        oauth2Client.setCredentials({
            access_token: Meteor.user().services.google.accessToken,
            refresh_token: Meteor.user().services.google.refreshToken,
            expiry_date: Meteor.user().services.google.expiresAt
        });

        calendar.events.list({
            auth: oauth2Client,
            calendarId: calendarID,
            maxResults: 500,
            timeMin: timeMin.toISOString(),
            timeMax: timeMax.toISOString()
        }, function (err, res) {
            if (err) {
                console.log(err);
                callback(err, null);
                return;
            }

            let bookedHours = 0;

            res.items.forEach(function(event) {
                const startTime = Moment(event.start.dateTime);
                const endTime = Moment(event.end.dateTime);
                const eventLength = endTime.diff(startTime, 'hours');
                bookedHours += eventLength;
            });
            
            callback(null, bookedHours);
        })
    }
};