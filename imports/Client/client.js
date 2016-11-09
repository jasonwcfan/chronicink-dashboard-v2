import { Mongo } from 'meteor/mongo';

Meteor.methods({
    'clients.insert': function(client) {
        return Clients.insert({
            firstName: client.firstName,
            lastName: client.lastName,
            address: client.address,
            secondaryAddress: client.secondaryAddress,
            city: client.city,
            country: client.country,
            region: client.region,
            postalCode: client.postalCode,
            email: client.email,
            primaryPhoneNumber: client.primaryPhoneNumber,
            secondaryPhoneNumber: client.secondaryPhoneNumber,
            dateOfBirth: client.dateOfBirth,
            medicalConditions: client.medicalConditions,
            disclaimerAccepted: client.disclaimerAccepted,
            depositAccepted: client.depositAccepted,
            newsletterAccepted: client.newsletterAccepted
        })
    }
});

export const Clients = new Mongo.Collection('clients');