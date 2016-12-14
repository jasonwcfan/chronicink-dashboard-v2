import { Meteor } from 'meteor/meteor';
import IntakeForm from '../imports/IntakeForm/intakeForm';
import ConsultationForm from '../imports/ConsultationForm/consultationForm';
import Client from '../imports/Client/client';
import Artist from '../imports/Artist/artist';

Meteor.publish('intakeForm', function() {
    return IntakeForm.find({});
});

Meteor.publish('artist', function() {
    return Artist.find({});
});