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
    const bookings = form.bookings;
    const events = [];

    // TODO:
    bookings.map((booking) => {
        const event = { kind: 'calendar#event' };
        event.summary = `${client.firstName.value} ${client.lastName.value} [${booking.bookingType} ${booking.bookingIndex + 1}]`;
        event.start = {
            dateTime: booking.startTime
        };
        event.end = {
            dateTime: booking.endTime
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
        if (form.formID) {
            Consultation.update({_id: form.formID}, {
                clientID: form.clientID,
                fields: form.fields,
                bookings: form.bookings
            });
            return form.formID;
        }
        
        return Consultation.insert({
            clientID: form.clientID,
            fields: form.fields,
            bookings: form.bookings
        });
    },
    'consultation.submitToCalendar': function(form) {
        Meteor.call('consultation.saveForm', form);

        if (Meteor.isServer) {
            const client = Client.findOne({_id: form.clientID});
            // Build events resource and pass it to GCalendar.insertEvent()
            const events = createEventResources(form, client);
            const responses = [];

            // Push events to calendar, keep track of errors/responses
            events.forEach(function(event) {
                const insertEvent = Meteor.wrapAsync(GCalendar.insertEvent);
                responses.push(insertEvent(event, 'primary'));
            });
            return responses;
        }
    }
});

export default Consultation = new Mongo.Collection('consultation');