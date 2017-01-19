import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Meteor.methods({
    'client.insert': function(form) {
        const clientInfo = {};
        Object.keys(form.fields).forEach((key) => {
            clientInfo[key] = form.fields[key].value
        });
        clientInfo.cancellationAvailability = form.cancellationAvailability;
        clientInfo.conditions = form.medicalConditions.map((condition) => {
            if (condition.value) {
                return condition.id;
            }
        }).filter((condition) => condition);

        return Client.insert(clientInfo);
    },
    'client.fetchOne': function(clientID) {
        return Client.findOne({_id: clientID});
    }
});

export default Client = new Mongo.Collection('client');