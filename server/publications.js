import { Meteor } from 'meteor/meteor';
import Intake from '../imports/Intake/intake';
import Booking from '../imports/Booking/booking';
import Client from '../imports/Client/client';
import Artist from '../imports/Artist/artist';

Meteor.publish('intake', function() {
    return Intake.find({});
});

Meteor.publish('artist', function() {
    return Artist.find({});
});

Meteor.publish('booking', function() {
    return Booking.find({});
});

Meteor.publish('client', function() {
    return Client.find({});
});