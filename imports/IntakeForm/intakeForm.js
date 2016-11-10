import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Meteor.methods({
    'intakeForm.insert': function(form) {
        return IntakeForm.insert({
            agreements: form.agreements,
            fields: form.fields,
            medicalConditions: form.medicalConditions
        })
    }
});

export const IntakeForm = new Mongo.Collection('intakeForm');