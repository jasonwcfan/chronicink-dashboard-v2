import { Meteor } from 'meteor/meteor';
import IntakeForm from '../imports/IntakeForm/intakeForm';
import ConsultationForm from '../imports/ConsultationForm/consultationForm';

Meteor.publish('intakeForm', function() {
    return IntakeForm.find({})
});