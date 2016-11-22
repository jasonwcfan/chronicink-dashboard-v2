import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Meteor.methods({
    'client.insert': function(form) {
        const clientInfo = {};
        form.fields.forEach(function(field) {
            clientInfo[field.id] = {
                label: field.label,
                value: field.value
            };
        });
        clientInfo.conditions = form.medicalConditions.map((condition) => (condition.value ? condition.id : null));

        return Client.insert(clientInfo);
    },
    'client.fetchOne': function(clientID) {
        return Client.findOne({_id: clientID});
    }
});

export default Client = new Mongo.Collection('client');