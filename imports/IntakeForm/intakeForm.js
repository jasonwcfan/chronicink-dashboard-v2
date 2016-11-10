import { Mongo } from 'meteor/mongo';

Meteor.methods({
    'intakeForm.insert': function(form) {
        return IntakeForm.insert({
            firstName: form.firstName,
            lastName: form.lastName,
            address: form.address,
            secondaryAddress: form.secondaryAddress,
            city: form.city,
            country: form.country,
            region: form.region,
            postalCode: form.postalCode,
            email: form.email,
            primaryPhoneNumber: form.primaryPhoneNumber,
            secondaryPhoneNumber: form.secondaryPhoneNumber,
            dateOfBirth: form.dateOfBirth,
            medicalConditions: form.medicalConditions,
            disclaimerAccepted: form.disclaimerAccepted,
            depositAccepted: form.depositAccepted,
            newsletterAccepted: form.newsletterAccepted
        })
    }
});

export const IntakeForm = new Mongo.Collection('intakeForm');