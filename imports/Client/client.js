import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Meteor.methods({
    'client.insert': function(form) {
        const clientInfo = {};
        form.fields.forEach(function(field) {
            clientInfo[field.id] = field.value;
        });

        return Client.insert(clientInfo);
    },
    'client.fetchOne': function(clientID) {
        return Client.findOne({_id: clientID});
    }
});

export default Client = new Mongo.Collection('client');