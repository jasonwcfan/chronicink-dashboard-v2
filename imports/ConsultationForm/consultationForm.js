import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import Client from '../Client/client';
import GCalendar from '../GoogleApi/GCalendar';

Meteor.methods({
    'consultationForm.insert': function(form) {
        return ConsultationForm.insert({
            clientID: form.clientID,
            fields: form.fields.map((field) => ({id: field.id, label: field.label, value: field.value})),
            sessions: form.sessions
        });
    },
    'consultationForm.submitToCalendar': function(form) {
        const client = Client.findOne({_id: form.clientID});
        // Build events resource and pass it to GCalendar.insertEvent()
        GCalendar.insertEvent(form, '');
    }
});

export default ConsultationForm = new Mongo.Collection('consultationForm');