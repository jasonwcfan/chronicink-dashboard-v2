import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Meteor.methods({
    'client.insert': function(form) {
        const clientInfo = {};
        form.fields.forEach(function(field) {
            clientInfo[field.id] = {
                label: field.label,
                type: field.inputType,
                value: field.value
            };
        });
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