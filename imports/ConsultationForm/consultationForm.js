import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import Client from '../Client/client';

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
        // Parse the form and client, create events for all the sessions, save events to the collection, and then
        // push them to the calendar.
    }
});

export default ConsultationForm = new Mongo.Collection('consultationForm');