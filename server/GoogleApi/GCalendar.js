import { HTTP } from 'meteor/http';
import google from 'googleapis';
import googleAuth from 'google-auth-library';

const clientSecret = Meteor.settings.google.client_secret;
const clientID = Meteor.settings.google.client_id;
const redirectURL = Meteor.settings.google.redirect_uris;

const authFactory = new googleAuth();
const oauth2Client = new authFactory.OAuth2(clientID, clientSecret, redirectURL);

const calendar = google.calendar('v3');

GCalendar = {
    insertEvent: function (event, calendarID) {

        oauth2Client.setCredentials({
            access_token: Meteor.user().services.google.accessToken,
            refresh_token: Meteor.user().services.google.refreshToken,
            expiry_date: Meteor.user().services.google.expiresAt
        });

        const testStart = new Date();
        const testEnd = new Date();
        testEnd.setHours(20);

        calendar.events.insert({
            auth: oauth2Client,
            calendarId: calendarID,
            resource: event

        }, function(err, res) {
            if (err) {
                console.log(err);
                return;
            }
            // console.log(res);
        });

        // HTTP.call(
        //     'POST',
        //     `https://www.googleapis.com/calendar/v3/calendars/${encodeURI(artist.calendarID)}/events`,
        //     {data: event}
        // )
    }
};