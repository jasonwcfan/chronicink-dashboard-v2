import { Meteor } from 'meteor/meteor';
import Intake from '../imports/Intake/intake';
import Consultation from '../imports/Consultation/consultation';
import Client from '../imports/Client/client';
import Artist from '../imports/Artist/artist';

Meteor.publish('intake', function() {
    return Intake.find({});
});

Meteor.publish('artist', function() {
    return Artist.find({});
});

Meteor.publish('consultation', function() {
    return Consultation.find({});
});

Meteor.publish('client', function() {
    return Client.find({});
});