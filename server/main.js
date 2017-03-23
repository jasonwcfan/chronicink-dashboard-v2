import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(() => {
    // code to run on server at startup

    Accounts.config({
        restrictCreationByEmailDomain: 'chronicinktattoo.com'
    });

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
