import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import Client from '../Client/client';
import GCalendar from '../GoogleApi/GCalendar';

function createEventResource(form, client) {
    let artist = null;
    const event = { kind: 'calendar#event' };
    form.fields.forEach(function(field) {
        if (field.id == 'artist') {
            artist = field.value;
        }
    });

    // TODO:
    event.summary = null;
    event.start = null;
    event.end = null;
    event.description = null;
    event.location = null;
    event.status = null;
    


    console.log(artist);
    console.log(client);
}

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
        const event = createEventResource(form, client);
        // GCalendar.insertEvent(form, '');
    }
});

export default ConsultationForm = new Mongo.Collection('consultationForm');