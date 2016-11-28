import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Meteor.methods({
    'consultationForm.insert': function(form) {
        return ConsultationForm.insert({
            clientID: form.clientID,
            fields: form.fields.map((field) => ({id: field.id, label: field.label, value: field.value})),
            sessions: form.sessions
        });
    },
    'consultationForm.submitToCalendar': function(form) {
        const client = Meteor.findOne({_id: form.clientID});
        console.log(client);
    }
});

export default ConsultationForm = new Mongo.Collection('consultationForm');