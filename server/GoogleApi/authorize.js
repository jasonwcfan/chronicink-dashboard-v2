import fs from 'fs';
import readline from 'readline';
import google from 'googleapis';
import googleAuth from 'google-auth-library';

const SCOPES = ['https://www.googleapis.com/auth/calendar'];
const TOKEN_DIR = './.credentials/';
const TOKEN_PATH = TOKEN_DIR + 'calendar-token.js';

export default authorize = function(callback) {
    // const clientSecret = Meteor.settings.client_secret;
    // const clientID = Meteor.settings.client_id;
    // const redirectURL = Meteor.settings.redirect_uris[0];
    // const auth = new googleAuth();
    // const oauth2Client = new auth.OAuth2(clientID, clientSecret, redirectURL);
};