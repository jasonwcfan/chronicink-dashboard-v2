import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Meteor.methods({
    'consultationForm.insert': function(form) {
        console.log(form);
        return ConsultationForm.insert({
            clientID: form.clientID,
            fields: form.fields.map((field) => ({id: field.id, label: field.label, value: field.value})),
            sessions: form.sessions
        });
    },
    'consultationForm.pushToCalendar': function(form) {
        
    }
});

export default ConsultationForm = new Mongo.Collection('consultationForm');