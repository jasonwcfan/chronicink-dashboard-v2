import { HTTP } from 'meteor/http';
import google from 'googleapis';
import googleAuth from 'google-auth-library';
import Moment from 'moment-timezone';
import btoa from 'btoa';

const clientSecret = Meteor.settings.google.client_secret;
const clientID = Meteor.settings.google.client_id;
const redirectURL = Meteor.settings.google.redirect_uris;

const authFactory = new googleAuth();
const oauth2Client = new authFactory.OAuth2(clientID, clientSecret, redirectURL);

const calendar = google.calendar('v3');
const gmail = google.gmail('v1');

const daysOfWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

/**
 * Google Calendar API helper functions
 */
GCalendar = {
    /**
     * Creates a new event resouce and inserts it into the calendar
     * @param event the event resource to be sent
     * @param calendarID the calendar in which the event will be created
     * @param callback a callback to be called when the event either inserts successfully or fails
     */
    insertEvent: function (event, calendarID, callback) {
        const primaryUser = Meteor.users.findOne({'services.google.email': Meteor.settings.public.primaryEmail});

        oauth2Client.setCredentials({
            access_token: primaryUser.services.google.accessToken,
            refresh_token: primaryUser.services.google.refreshToken,
            expiry_date: primaryUser.services.google.expiresAt
        });

        calendar.events.insert({
            auth: oauth2Client,
            calendarId: calendarID,
            resource: event

        }, function(err, res) {
            if (err) {
                console.log('throwing error!');
                callback(err, null);
                return;
            }
            callback(null, res);
        });

    },
    /**
     * Get the cumulative number of hours each artist is booked for
     * @param calendarID the calendar of the artist
     * @param timeframe how far out to calculate (7/15/30/60 days)
     * @param callback a callback to be called on completion or failure
     */
    getBookedHours: function(calendarID, timeframe, callback) {
        const timeMin = new Moment();
        const timeMax = new Moment();
        const primaryUser = Meteor.users.findOne({'services.google.email': Meteor.settings.public.primaryEmail});

        timeMax.add(timeframe, 'days');
        timeMax.set({'hour': 11, 'minute': 59, 'second': 59});

        oauth2Client.setCredentials({
            access_token: primaryUser.services.google.accessToken,
            refresh_token: primaryUser.services.google.refreshToken,
            expiry_date: primaryUser.services.google.expiresAt
        });

        calendar.events.list({
            auth: oauth2Client,
            calendarId: calendarID,
            maxResults: 500,
            showDeleted: false,
            singleEvents: true,
            timeMin: timeMin.toISOString(),
            timeMax: timeMax.toISOString()
        }, function (err, res) {
            if (err) {
                console.log(err);
                callback(err, null);
                return;
            }

            let bookedHours = 0;

            res.items.forEach(function(event) {
                if (event.start.dateTime && event.end.dateTime) {
                    const startTime = Moment(event.start.dateTime);
                    const endTime = Moment(event.end.dateTime);
                    const eventLength = endTime.diff(startTime, 'hours');
                    bookedHours += eventLength;
                }
            });

            callback(null, bookedHours);
        })
    },

    /**
     * Create an event resource based on information from the BookingForm
     * @param form the BookingForm
     * @param client
     * @param artist
     * @returns {Array}
     */

    createEventResources: function(form, client, artist) {
        const bookings = form.bookings;
        const events = [];
        let presentationInfo = form.presentationRequired ? '[PR]' : '[NPR]';

        bookings.forEach(function(booking) {
            if (booking.type == 'Presentation' || booking.type == 'Email Presentation') {
                presentationInfo = `[${Moment(booking.startTime).format('DD/MM/YYYY')}] `;
            }
        });

        bookings.map((booking, idx) => {
            const event = { kind: 'calendar#event' };
            let confirmationInfo = '';

            if (Moment(booking.startTime).diff(Moment({hour: 23, minute: 59})) < 86400000) {
                confirmationInfo = ' - confirmed x2';
            } else if (Moment(booking.startTime).diff(Moment({hour: 23, minute: 59})) < 1555200000) {
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
            event.description = createEventDescription(form.fields, form.bookedBy, form.bookedThru, artist);
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
    },
    /**
     * Get the earliest opening for this calendar that is at least 60 minutes in length
     * @param calendarID The calendar to search through
     * @param callback Called on error or with the opening, an object with a startTime and an endTime property
     */
    getEarliestOpening(calendarID, schedule, minOpening, callback) {

        const primaryUser = Meteor.users.findOne({'services.google.email': Meteor.settings.public.primaryEmail});
        const tomorrow = new Moment().hour(11).minute(59).add(1,'days').tz('America/Toronto')

        oauth2Client.setCredentials({
            access_token: primaryUser.services.google.accessToken,
            refresh_token: primaryUser.services.google.refreshToken,
            expiry_date: primaryUser.services.google.expiresAt
        });

        calendar.events.list({
            auth: oauth2Client,
            calendarId: calendarID,
            maxResults: 250,
            singleEvents: true, // Break recurring events into a single instances
            orderBy: 'startTime',
            timeMin: tomorrow.toISOString(), // List all events from tomorrow onward
        }, (err, res) => {
            if (err) {
                callback(err, null);
                return;
            }

            if (!res.items.length) {
                callback(null, 0);
                return;
            }

            // Tracks all of the buckets for each day, and whether they are off days
            let days = {};

            // The first and last dates in the returned items
            const firstDay =  Moment(tomorrow);
            const lastDay = Moment(res.items[res.items.length - 1].start.date || res.items[res.items.length - 1]
                    .start.dateTime).tz('America/Toronto');

            // Initializing 'days'
            for (let day = Moment(firstDay); day.diff(lastDay, 'days') <= 0; day.add(1, 'days')) {
                days[day.format('YYYY-MM-DD')] = {
                    off : false,
                    events: []
                }
            }

            // Sort events into buckets, one for each date
            res.items.map((event) => {
                if (!event.summary) {
                    return;
                }

                // This is an all day event
                if (event.start.date && event.end.date) {

                    const dateStr = Moment(event.start.date).format('YYYY-MM-DD');

                    // Add timezone to event start & end if needed
                    let eventStart = res.timeZone == 'America/Toronto' ? Moment(event.start.date)
                    : Moment(event.start.date).tz('America/Toronto');
                    let eventEnd = res.timeZone == 'America/Toronto' ? Moment(event.end.date)
                    : Moment(event.end.date).tz('America/Toronto');

                    // This indicates this is a day off
                    if (event.summary.toLowerCase().indexOf('off') > -1) {

                        // If the event spans multiple days
                        if (eventEnd.diff(eventStart,'days') > 1) {

                            // If the event starts before tomorrow, only consider dates tomorrow and onward
                            // NOTE - NO TIMEZONE SINCE FULL DAY EVENT
                            eventStart = eventStart.isBefore(tomorrow) ? Moment(tomorrow) : eventStart;

                            // Set each day during the span of the event to 'off'
                            for (let day = eventStart; day.diff(eventEnd,'days') <= 0 ; day.add(1,'days')) {
                                let dateStr2 = day.format('YYYY-MM-DD');
                                days[dateStr2].off = true;
                            }
                        }
                        else {
                            days[dateStr].off = true;
                        }
                        return;
                    }
                    return;
                }

                // If it's an off event that spans multiple days but has a dateTime property
                if (event.summary.toLowerCase().indexOf('off') > -1) {

                    // Add timezones if needed
                    let eventStart = res.timeZone == 'America/Toronto' ? Moment(event.start.dateTime)
                        : Moment(event.start.dateTime).tz('America/Toronto');
                    let eventEnd = res.timeZone == 'America/Toronto' ? Moment(event.end.dateTime)
                        : Moment(event.end.dateTime).tz('America/Toronto');

                    if (eventEnd.diff(eventStart,'days') > 1) {

                        // If the event starts before tomorrow, only consider dates tomorrow and onward
                        eventStart = eventStart.isBefore(tomorrow) ? Moment(tomorrow) : eventStart;

                        // Set each day during the span of the event to 'off'
                        for (let day = eventStart; day.diff(eventEnd,'days') <= 0 ;day.add(1,'days')) {
                            let dateStr2 = day.format('YYYY-MM-DD');
                            days[dateStr2].off = true;
                        }
                    }
                }
                else {
                    // This is a regular event, on a non off day add the event to that bucket
                    const dateStr = Moment(event.start.date || event.start.dateTime).tz('America/Toronto').format('YYYY-MM-DD');
                    if (!days[dateStr].off) {
                        if (res.timeZone != 'America/Toronto') {
                            // Specify timezone of event start and event end
                            event.start.dateTime = Moment(event.start.dateTime).tz('America/Toronto');
                            event.end.dateTime = Moment(event.end.dateTime).tz('America/Toronto');
                        }
                        days[dateStr].events.push(event);
                    }
                }

            });

            // Store the first opening, with Moments
            let opening = null;

            // Go through the bucket for each day and see if there is an opening
            for (let day = Moment(firstDay); day.diff(lastDay, 'days') <= 0; day.add(1, 'days')) {
                const dateStr = day.format('YYYY-MM-DD');
                const dayOfWeek = daysOfWeek[Moment(dateStr).day()];

                // If this day has events and is not an off day
                if (days[dateStr].events.length > 0 && !days[dateStr].off) {
                    const events = days[dateStr].events;

                    // Get dayStart and dayEnd from schedule by day of week
                    const dayStart = Moment(events[0].start.dateTime).tz('America/Toronto').hour(schedule[dayOfWeek].start).minute(0);
                    const dayEnd = Moment(events[0].start.dateTime).tz('America/Toronto').hour(schedule[dayOfWeek].finish).minute(0);

                    // If there is an opening between the start of the day and the start of the first event
                    if (Moment(events[0].start.dateTime).diff(dayStart, 'minutes') > minOpening*60) {
                        opening = {
                            startTime: dayStart,
                            endTime: Moment(events[0].start.dateTime)
                        };
                        break;
                    }

                    // Initialize latest event as the first event
                    let latestEventEndTime = Moment(events[0].end.dateTime).tz('America/Toronto');

                    // If there is more than one event, compare each of their start and end times to find openings
                    if (events.length > 1) {
                        let hasOpening = false;
                        for (var j = 0; j < events.length - 1; j++) {
                            // If the gap between the two events is more than an hour, and the first event ends after
                            // 12PM Noon
                            let event1End = Moment(events[j].end.dateTime).tz('America/Toronto');
                            let event2Start = Moment(events[j + 1].start.dateTime).tz('America/Toronto');

                            // If event1 ends after the latest event, it is the latest event
                            latestEventEndTime = event1End.isAfter(latestEventEndTime) ? event1End : latestEventEndTime;
                            
                            if (event2Start.diff(latestEventEndTime, 'minutes') > minOpening*60 && latestEventEndTime.hour() >= 12) {
                                opening = {
                                    startTime: latestEventEndTime,
                                    endTime: event2Start
                                };
                                hasOpening = true;
                                break;
                            }
                        }
                        if (hasOpening) {break;}
                    }

                    // If last event of the day ends after latest event, it is the latest event
                    let lastEventEndTime = Moment(events[events.length-1].end.dateTime).tz('America/Toronto');
                    latestEventEndTime = lastEventEndTime.isAfter(latestEventEndTime) ? lastEventEndTime : latestEventEndTime;

                    // If there is an opening between the end of the latest event and the end of the day
                    if (dayEnd.diff(latestEventEndTime, 'minutes') > minOpening*60) {
                        opening = {
                            startTime: latestEventEndTime,
                            endTime: dayEnd
                        };
                        break;
                    }
                }
                // This day is not an off day, but has no events, so the opening is the whole day
                else if (!days[dateStr].off) {
                    opening = {
                        startTime: Moment(dateStr).tz('America/Toronto').hour(schedule[dayOfWeek].start).minute(0),
                        endTime: Moment(dateStr).tz('America/Toronto').hour(schedule[dayOfWeek].finish).minute(0)
                    };
                    break;
                }
            }
            callback(null, opening);
        })
    }
};

/**
 * Gmail API helper functions
 */
GMail = {
    /**
     * Self-explanatory
     * @param recipient
     * @param subject
     * @param body
     */
    sendEmail: function(recipient, subject, body) {
        if (!Meteor.settings.public.production) {
            console.log('Not sending email because the production flag is set to false');
            return;
        }
        const base64EncodedEmail = encodeEmail(recipient, subject, body);
        const primaryUser = Meteor.users.findOne({'services.google.email': Meteor.settings.public.primaryEmail});

        oauth2Client.setCredentials({
            access_token: primaryUser.services.google.accessToken,
            refresh_token: primaryUser.services.google.refreshToken,
            expiry_date: primaryUser.services.google.expiresAt
        });

        gmail.users.messages.send({
            auth: oauth2Client,
            userId: 'me',
            resource: {
                raw: base64EncodedEmail
            }
        }, function(err, response) {
            if (err) {
                console.log('The API returned an error: ' + err);
            } else {
                console.log('Email successfully sent to', recipient);
            }
        });
    },
    /**
     * Creates the body of the email to be sent to the client, based on fields from the BookingForm
     * @param artist
     * @param client
     * @param form the BookingForm
     * @returns {string}
     */
    createClientEmail: function(artist, client, form) {

        let body = `Hi ${client.firstName}!\n\nThis is Chronic Ink Tattoos, we wanted to send you a friendly reminder ` +
            `that you have appointments booked with ${artist.name} for the following dates:\n`;

        form.bookings.forEach(function(booking) {
            const startTime = Moment(booking.startTime).tz('America/Toronto');
            const endTime = Moment(booking.endTime).tz('America/Toronto');
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
            'reserve the right to refuse a tattoo at any point prior to the start of a tattoo, in which case the deposit ' +
            'would be returned if the sketch has yet to be drawn. We will only refuse a tattoo if we feel we cannot do the best artwork on a ' +
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

    },
    /**
     * Creates the body of the email to be sent to the artist, based on fields from the BookingForm
     * @param artist
     * @param client
     * @param form the BookingForm
     * @returns {string}
     */
    createArtistEmail: function(artist, client, form) {
        let body = `Hi ${artist.name}!\n\nThis is a friendly reminder ` +
            `that you have appointments with ${client.firstName} ${client.lastName} for the following dates:\n`;

        form.bookings.forEach(function(booking) {
            const startTime = Moment(booking.startTime).tz('America/Toronto');
            const endTime = Moment(booking.endTime).tz('America/Toronto');
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
    },
    /**
     * Creates the body of the email to be sent to qc, based on fields from the BookingForm
     * @param artist
     * @param client
     * @param form the BookingForm
     * @returns {string}
     */
    createQualityControlEmail: function(artist, client, form) {
        let body = `${artist.name} has appointments booked with ${client.firstName} ${client.lastName} for the following dates:\n`;

        form.bookings.forEach(function(booking) {
            const startTime = Moment(booking.startTime).utcOffset(-5);
            const endTime = Moment(booking.endTime).utcOffset(-5);
            body += `\t- ${booking.type}: ${startTime.format('dddd, MMMM Do YYYY')}, ${startTime.format('h:mmA')} to ${endTime.format('h:mmA')}\n`;
        });

        body += '\nDetails about this tattoo:';

        Object.keys(form.fields).forEach((key) => {
            const field = form.fields[key];
            if (key == 'artist') {
                body += `\n\tArtist: ${artist.name}`;
                return;
            } else if (key == 'rate') {
                body += `\n\tRate: ${getRateString(form.fields.rateType.value, form.fields.rate.value)}`;
                return;
            }

            body += `\n\t${field.label}: ${field.value}`
        });

        body += `\n\tBooked by ${form.bookedBy} ${form.bookedThru}`;

        body += '\n\nSome info about the client:';
        body += `\n\tName: ${client.firstName} ${client.lastName}`;
        body += `\n\tEmail: ${client.email}`;
        body += `\n\tPhone Number: ${client.primaryPhoneNumber}`;
        body += client.secondaryPhoneNumber.length > 0 ? `\tAlternate Phone Number: ${client.secondaryPhoneNumber}` : '';
        body += `\n\tDate of Birth: ${Moment(client.dateOfBirth).format('MMMM Do YYYY')}`;
        body += `\n\tMedical Conditions: ${client.conditions.join(', ')}`;

        return body;
    }
};

/**
 * Returns a string to be displayed that shows how much the rate is and how it's being charged (per hour or per piece)
 * @param rateType
 * @param rate
 * @returns {String}
 */
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

/**
 * Constructs a string representation of all the relevant fields in the booking form that was used to create this event
 * @param fields all the BookingForm fields
 * @param bookedBy who did the booking (from BookingForm)
 * @param bookedThru how they did the booking (from BookingForm)
 * @param artist an artist document
 * @returns {String}
 */
function createEventDescription(fields, bookedBy, bookedThru, artist) {
    let description = '';

    description = description + fields.rateType.label + ':\n\t' + fields.rateType.value + '\n';
    description = description + fields.rate.label + ':\n\t' + fields.rate.value + '\n';
    description = description + fields.deposit.label + ':\n\t' + fields.deposit.value + '\n';

    for (const key in fields) {
        if (!fields.hasOwnProperty(key)) {
            continue;
        }
        if (key =='rateType' || key == 'rate' || key == 'deposit') {
            continue;
        }
        if (key == 'artist') {
            description = description + 'Artist:\n\t' + artist.name + '\n';
            continue;
        }
        description = description + fields[key].label + ':\n\t' + fields[key].value + '\n';
    }

    description = description + `\nBooked by ${bookedBy} ${bookedThru} on ${Moment().format('MMMM Do YYYY')}`;

    return description;
}

/**
 * Uses the btao library to encode an email that the gmail api accepts. Fuzzy on the details of what btoa actually does
 * @param recipient the email address of the recipient
 * @param subject the subject line in the email
 * @param body the body of the email
 * @returns {String}
 */
function encodeEmail(recipient, subject, body) {
    var str = ["Content-Type: text/plain; charset=\"UTF-8\"\n",
        "MIME-Version: 1.0\n",
        "Content-Transfer-Encoding: 7bit\n",
        "to: ", recipient, "\n",
        "from: ", "me", "\n",
        "subject: ", subject, "\n\n",
        body
    ].join('');

    return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
}