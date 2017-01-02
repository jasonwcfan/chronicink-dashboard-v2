import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import Client from '../Client/client';

function createDescription(data) {
    let description = '';

    for (const key in data) {
        if (!data.hasOwnProperty(key)) {
            continue;
        }
        description = description + data[key].label + ':\n\t' + data[key].value + '\n';
    }

    return description;
}

function createEventResources(form, client) {
    const sessions = form.sessions;
    const events = [];

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
        event.description = createDescription(form.fields);
        event.location = `${client.primaryPhoneNumber.value}/${client.email.value}`;

        events.push(event);
    });

    return events;
}

Meteor.methods({
    'consultation.findByClientID': function(clientID) {
        const client = Client.findOne({_id: clientID});
        const form = Consultation.findOne({clientID: clientID});
        return {client, form}
    },
    'consultation.saveForm': function(form) {
        console.log('saving');
        console.log(form);
        if (form.formID) {
            Consultation.update({_id: form.formID}, {
                clientID: form.clientID,
                fields: form.fields,
                sessions: form.sessions
            });
            return form.formID;
        }
        return Consultation.insert({
            clientID: form.clientID,
            fields: form.fields,
            sessions: form.sessions
        });
    },
    'consultation.submitToCalendar': function(form) {
        if (Meteor.isServer) {
            const client = Client.findOne({_id: form.clientID});
            // Build events resource and pass it to GCalendar.insertEvent()
            const events = createEventResources(form, client);
            events.forEach(function(event) {
                // GCalendar.insertEvent(event, form.artist.calendarID);
                GCalendar.insertEvent(event, 'primary');
            });
        }
        Meteor.call('consultation.saveForm', form);
    }
});

export default Consultation = new Mongo.Collection('consultation');