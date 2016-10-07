import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';

Meteor.methods({
    'fetchFollowers': function(access_token) {
        console.log(access_token);
        HTTP.call('GET', 'https://api.instagram.com/v1/users/self/followed-by', {
            params: {access_token: access_token}
        }, function (error, results) {
            if (!error) {
                console.log(results);
            } else {
                console.log(error);
            }
        });
    }
});

Meteor.startup(() => {
  // code to run on server at startup
});
