import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import Client from '../Client/client';
import Studio from '../Studio/studio';
import Moment from 'moment';

Meteor.methods({
    'booking.findByClientID': function(clientID) {
        const client = Client.findOne({_id: clientID});
        const form = Booking.findOne({clientID: clientID});
        return {client, form}
    },
    'booking.saveForm': function(form) {
        if (form.formID) {
            Booking.update({_id: form.formID}, {
                clientID: form.clientID,
                fields: form.fields,
                bookings: form.bookings,
                bookedBy: form.bookedBy,
                bookedThru: form.bookedThru,
                presentationRequired: form.presentationRequired
            });
            return form.formID;
        }
        
        return Booking.insert({
            clientID: form.clientID,
            fields: form.fields,
            bookings: form.bookings,
            bookedBy: form.bookedBy,
            bookedThru: form.bookedThru,
            presentationRequired: form.presentationRequired
        });
    },
    'booking.submitToCalendar': function(form) {
        Meteor.call('booking.saveForm', form);

        if (Meteor.isServer) {
            const artist = Artist.findOne({_id: new Mongo.ObjectID(form.fields.artist.value)});
            console.log(artist);

            const client = Client.findOne({_id: form.clientID});
            // Build events resource and pass it to GCalendar.insertEvent()
            const events = GCalendar.createEventResources(form, client, artist);
            const responses = [];

            // Push events to calendar, keep track of errors/responses
            events.forEach(function(event) {
                const insertEvent = Meteor.wrapAsync(GCalendar.insertEvent);
                responses.push(insertEvent(event, artist.calendarID));
            });

            Meteor.call('booking.sendEmail', client, form);
            Meteor.call('intake.markBookingCompleted', form.clientID);
            return responses;
        }
    },
    'booking.sendEmail': function(client, form) {
        const artist = Artist.findOne({_id: new Mongo.ObjectID(form.fields.artist.value)});

        const clientEmailBody = GMail.createClientEmail(artist, client, form);
        const artistEmailBody = GMail.createArtistEmail(artist, client, form);
        const qcEmailBody = GMail.createQualityControlEmail(artist, client, form);

        GMail.sendEmail(client.email, 'Upcoming Tattoo Details', clientEmailBody);
        artist.emails.forEach(function(email) {
            GMail.sendEmail(email, `New Booking - ${client.firstName} ${client.lastName} - ${Moment(form.bookings[0].startTime).format('MMMM YYYY')}`, artistEmailBody);
        });

        // Send a client version of the email to the quality control email address
        GMail.sendEmail(Studio.findOne({name: 'Chronic Ink'}).emails.qualityControl, `New Booking - ${client.firstName} ${client.lastName} - ${Moment(form.bookings[0].startTime).format('MMMM YYYY')}`, qcEmailBody)
    }
});

export default Booking = new Mongo.Collection('booking');