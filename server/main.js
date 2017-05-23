import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(() => {
    // code to run on server at startup

    require('longjohn')

    Accounts.config({
        restrictCreationByEmailDomain: Meteor.settings.public.production ? 'chronicinktattoo.com' : null
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
