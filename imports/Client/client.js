import { Mongo } from 'meteor/mongo';

Meteor.methods({
    'clients.insert': function(client) {
        return Clients.insert({
            firstName: client.firstName,
            lastName: client.lastName,
            address: client.address,
            addressSecondary: client.addressSecondary,
            city: client.city,
            country: client.country,
            region: client.region,
            postalCode: client.postalCode,
            email: client.email,
            homePhone: client.homePhone,
            cellPhone: client.cellPhone,
            birthDate: client.birthDate,
            medicalConditions: client.medicalConditions,
            disclaimerAccepted: client.disclaimerAccepted,
            newsletterAccepted: client.newsletterAccepted
        })
    }
});

export const Clients = new Mongo.Collection('clients');