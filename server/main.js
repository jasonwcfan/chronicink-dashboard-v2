import { Meteor } from 'meteor/meteor';
import authorize from './GoogleApi/authorize';

Meteor.startup(() => {
  // code to run on server at startup
    authorize(function() {
        console.log('authorized');
    });
});
