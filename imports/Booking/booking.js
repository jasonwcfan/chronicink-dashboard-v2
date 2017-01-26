import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import Client from '../Client/client';
import Moment from 'moment';

function createDescription(fields, bookedBy, bookedThru) {
    let description = '';

    description = description + fields.rateType.label + ':\n\t' + fields.rateType.value + '\n';
    description = description + fields.rate.label + ':\n\t' + fields.rate.value + '\n';
    description = description + fields.deposit.label + ':\n\t' + fields.deposit.value + '\n';

    for (const key in fields) {
        if (!fields.hasOwnProperty(key)) {
            continue;
        }
        if (key == 'artist' || key =='rateType' || key == 'rate' || key == 'deposit') {
            continue;
        }
        description = description + fields[key].label + ':\n\t' + fields[key].value + '\n';
    }

    description = description + `\nBooked by ${bookedBy} ${bookedThru} on ${Moment().format('MMMM Do YYYY')}`;

    return description;
}

function createEventResources(form, client) {
    const bookings = form.bookings;
    const events = [];
    let presentationInfo = '[PR]';

    bookings.forEach(function(booking) {
        if (booking.type == 'Presentation' || booking.type == 'Email Presentation') {
            presentationInfo = `[${Moment().format('DD/MM/YYYY')}] `;
        }
    });

    // TODO:
    bookings.map((booking, idx) => {
        const event = { kind: 'calendar#event' };
        let confirmationInfo = '';

        if (Moment({hour: 23, minute: 59}).diff(Moment(booking.startTime)) < 86400000) {
            confirmationInfo = ' - confirmed x2';
        } else if (Moment({hour: 23, minute: 59}).diff(Moment(booking.startTime)) < 1555200000) {
            confirmationInfo = ' - confirmed';
        }

        if (booking.type == 'Presentation' || booking.type == 'Email Presentation') {
            event.summary = `[${booking.type}] ${client.firstName} ${client.lastName}${confirmationInfo}`;
        } else {
            event.summary = `${booking.bookingNum == 1 && booking.type != 'Consultation' ? presentationInfo : ''}[${booking.type} ${booking.bookingNum}] ${client.firstName} ${client.lastName}${confirmationInfo}`;
        }
        event.start = {
            dateTime: booking.startTime
        };
        event.end = {
            dateTime: booking.endTime
        };
        event.description = createDescription(form.fields, form.bookedBy, form.bookedThru);
        event.location = `${client.primaryPhoneNumber}/${client.email}`;
        event.extendedProperties= {
            private: {
                bookingID: form.formID,
                clientID: form.clientID
            }
        };

        events.push(event);
    });

    return events;
}

function getRateString(rateType, rate) {
    switch(rateType) {
        case 'hourly':
            return `${rate}/hour`;
            break;
        case 'perPiece':
            return `${rate} for the piece`;
            break;
        default:
            return 'To be determined';
    }
}

function createClientEmail(artist, client, form) {

    let body = `Hi ${client.firstName}!\n\nThis is Chronic Ink Tattoos, we wanted to send you a friendly reminder ` +
        `that you have appointments booked with ${artist.name} for the following dates:\n`;

    form.bookings.forEach(function(booking) {
        const startTime = Moment(booking.startTime).utcOffset(-5);
        const endTime = Moment(booking.endTime).utcOffset(-5);
        body += `\t- ${booking.type}: ${startTime.format('dddd, MMMM Do YYYY')}, ${startTime.format('h:mmA')} to ${endTime.format('h:mmA')}\n`;
    });

    body += `\nHere's some more info about your bookings:\n`;
    body += `\tStudio location: ${form.fields.studioLocation.value}\n`;
    body += `\tSubject: ${form.fields.subject.value}\n`;
    body += `\tFeel: ${form.fields.feel.value}\n`;
    body += `\tPlacement: ${form.fields.placement.value}\n`;
    body += `\tArtist: ${artist.name}\n`;
    body += `\tRate: ${getRateString(form.fields.rateType.value, form.fields.rate.value)}\n`;

    body += '\nPlease reply directly to this email if you have any questions, and we\'ll get back to you as soon as we can!\n\n' +
    'Thank you for booking with us!\n\t- The Chronic Ink Family';

    body += '\n\n----------------------';

    body += '\n\nDISCLAIMER:\n\nDeposit Structure\n\nSmall – $80\nMedium – $150\nLarge – $350\n\nSmall to Medium tattoos are ' +
        'priced uniquely by the tattoo. Small to Medium tattoos are estimated to require less than 4 hours ' +
        'for completion. Large pieces are priced by the hour or by a day rate.* Large tattoos are estimated to ' +
        'require more than 4 hours for completion. *Day rates only apply to large tattoos. Day rates are fixed rates ' +
        'for an entire day of tattooing from an artist because some artists prefer to work on a day rate so they don’t ' +
        'feel the pressure of time. Think of it as hiring a photographer for a day of work.\n\nRight of Refusal\nWe ' +
        'reserve the right to refuse a tattoo at any point prior to the start of a tattoo. Deposits will be refunded ' +
        'if a sketch has not been drawn. We will only refuse a tattoo if we feel we cannot do the best artwork on a ' +
        'tattoo. Yes, this sounds subjective but we are in the business of doing tattoos, not to refuse them, and we hope ' +
        'our expertise will enable us to make sound judgements. This is the last thing we want to do and we realize you ' +
        'have to trust us, so we will do our best to make you proud.\n\nRefunds\nDeposits are non-refundable.\n\nChange of Idea' +
        '\nWe will require a 2nd deposit if you change your idea after a sketch has been done. The 1st deposit will be ' +
        'voided and the price for the 2nd deposit will be the same as the 1st deposit.\n\nRescheduling\nWe require 72 hours ' +
        'notice for rescheduling or the deposit will be forfeited.\n\nTouch Up Policy\nWe guarantee the quality of all of our ' +
        'tattoos, except for tattoos on the hands, fingers, and feet (please ask our staff for an explanation). Our ' +
        'guarantee covers all ink loss caused during the healing process, and thus is good for 90 days after your final ' +
        'session. Please follow our aftercare instructions for best results.\n\nUnder 18 Policy\nIf you are under 18 years ' +
        'old (for tattooing) or 17 years old (for piercing), we ask that you bring your Parent or Legal Guardian along to ' +
        'fill out the form below at the time of booking. The Parent or Guardian must be present when you are receiving your ' +
        'tattoo\/piercing and present government issued identification.';

    return body;

}

function createArtistEmail(artist, client, form) {
    let body = `Hi ${artist.name}!\n\nThis is a friendly reminder ` +
        `that you have appointments with ${client.firstName} ${client.lastName} for the following dates:\n`;

    form.bookings.forEach(function(booking) {
        const startTime = Moment(booking.startTime).utcOffset(-5);
        const endTime = Moment(booking.endTime).utcOffset(-5);
        body += `\t- ${booking.type}: ${startTime.format('dddd, MMMM Do YYYY')}, ${startTime.format('h:mmA')} to ${endTime.format('h:mmA')}\n`;
    });

    body += '\nDetails about this tattoo:';

    Object.keys(form.fields).forEach((key) => {
        const field = form.fields[key];
        if (key == 'artist' || key == 'rateType') {
            return;
        } else if (key == 'rate') {
            body += `\n\tRate: ${getRateString(form.fields.rateType.value, form.fields.rate.value)}`;
            return;
        }

        body += `\n\t${field.label}: ${field.value}`
    });

    body += '\n\nSome info about your client:';
    body += `\n\tName: ${client.firstName} ${client.lastName}`;
    body += `\n\tEmail: ${client.email}`;
    body += `\n\tPhone Number: ${client.primaryPhoneNumber}`;
    body += client.secondaryPhoneNumber.length > 0 ? `\tAlternate Phone Number: ${client.secondaryPhoneNumber}` : '';
    body += `\n\tDate of Birth: ${Moment(client.dateOfBirth).format('MMMM Do YYYY')}`;

    return body;
}

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
                bookedThru: form.bookedThru
            });
            return form.formID;
        }
        
        return Booking.insert({
            clientID: form.clientID,
            fields: form.fields,
            bookings: form.bookings,
            bookedBy: form.bookedBy,
            bookedThru: form.bookedThru
        });
    },
    'booking.submitToCalendar': function(form) {
        Meteor.call('booking.saveForm', form);

        if (Meteor.isServer) {
            const client = Client.findOne({_id: form.clientID});
            // Build events resource and pass it to GCalendar.insertEvent()
            const events = createEventResources(form, client);
            const responses = [];

            // Push events to calendar, keep track of errors/responses
            events.forEach(function(event) {
                const insertEvent = Meteor.wrapAsync(GCalendar.insertEvent);
                responses.push(insertEvent(event, form.fields.artist.value));
            });

            Meteor.call('booking.sendEmail', client, form);
            Meteor.call('intake.markBookingCompleted', form.clientID);
            return responses;
        }
    },
    'booking.sendEmail': function(client, form) {
        const artist = Artist.findOne({calendarID: form.fields.artist.value});

        const clientEmailBody = createClientEmail(artist, client, form);
        const artistEmailBody = createArtistEmail(artist, client, form);

        GMail.sendEmail(client.email, 'Upcoming Tattoo Details', clientEmailBody);
        artist.emails.forEach(function(email) {
            GMail.sendEmail(email, `New Booking - ${client.firstName} ${client.lastName} - ${Moment(form.bookings[0].startTime).format('MMMM YYYY')}`, artistEmailBody);
        })
    }
});

export default Booking = new Mongo.Collection('booking');