import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Meteor.methods({
    'intakeForm.insert': function(form) {
        return IntakeForm.insert({
            agreements: form.agreements,
            fields: form.fields,
            medicalConditions: form.medicalConditions,
            consultPending: true
        });
    },
    'intakeForm.fetch': function() {
        return IntakeForm.find({}).fetch();
    }
});

export default IntakeForm = new Mongo.Collection('intakeForm');