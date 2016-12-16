import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import Client from '../Client/client';
import GCalendar from '../GoogleApi/GCalendar';

function createDescription(session) {

}

function createEventResources(form, client) {
    const data = {};
    const sessions = form.sessions;
    const events = [];
    form.fields.map((field) => {
        data[field.id] = {
            value: field.value,
            label: field.label
    };
    });
        console.log(sessions);

    // TODO:
    sessions.map((session) => {
        const event = { kind: 'calendar#event' };
        event.summary = `${client.firstName.value} ${client.lastName.value} [${session.sessionType} ${session.sessionIndex + 1}]`;
        event.start = {
            dateTime: session.startTime
        };
        event.end = {
            dateTime: session.endTime
        };
        event.description = createDescription(session);
        event.location = `${client.primaryPhoneNumber.value}/${client.email.value}`;

        events.push(event);
    });

    console.log(events);
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
        const events = createEventResources(form, client);
        // GCalendar.insertEvent(form, '');
    }
});

export default ConsultationForm = new Mongo.Collection('consultationForm');