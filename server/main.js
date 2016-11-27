import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
    // code to run on server at startup

    ServiceConfiguration.configurations.upsert(
        { service: 'google'},
        {
            $set: {
                clientId: Meteor.settings.google.client_id,
                loginStyle: 'popup',
                secret: Meteor.settings.google.client_secret
            }
        }
    );
});
