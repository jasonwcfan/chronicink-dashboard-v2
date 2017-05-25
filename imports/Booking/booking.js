import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import Client from '../Client/client';
import Studio from '../Studio/studio';
import Artist from '../Artist/artist';
import TattooStyle from '../TattooStyle/tattooStyle';
import Moment from 'moment';

Meteor.methods({
    /**
     * Return a list of Artists, ranked by a score that represents how confident we are that thist artist would be a
     * good fit for this particular tattoo. Right now it just takes the style as input and determines the rest of the
     * factors from the calendar, but in the future it could also take a list of preferred/banned keywords as well
     * as size and colouring
     * @param data the input data (currently just style)
     */
    'booking.getArtistRecommendation': function(data) {
        if (Meteor.isServer) {

            const { tattooStyle, ...rest } = data;

            let recommendationList = [];
            let today = Moment();

            // Get all artists who prefer tattooStyle at a level greater than 0
            const artists = Artist.find({['preferences.styles.' + tattooStyle]:{'$gt':0}}).fetch();

            // Get # of days until earliest opening for each artist
            // If an artist has no earliestOpening field, it's because no opening was found within 250 events.
            //      Set those artists' daysUntilEarliestOpening value to the maximum value.
            let completelyBookedArtists = [];
            artists.forEach((artist, ind) => {

                if (artist.earliestOpening != null) {
                    artist.daysUntilEarliestOpening = Moment(artist.earliestOpening.startTime).diff(today,'days')
                }
                else {
                    completelyBookedArtists.push(ind);
                }
            });

            // Get list of values of hoursIn60Days and daysUntilEarliestOpening (with a transformation applied)
            let list_hoursIn60Days = artists.map((artist) => {return artist.hoursIn60Days});
            let list_daysUntilEarliestOpeningTrans = artists.map((artist) => {return 1/Math.log10(artist.daysUntilEarliestOpening+2)});

            // Remove NaN values from each list
            for (let i = 0; i < artists.length; i++) {
                if (isNaN(list_hoursIn60Days[i])){
                    list_hoursIn60Days.splice(i);
                }
                if (isNaN(list_daysUntilEarliestOpeningTrans[i])){
                    list_daysUntilEarliestOpeningTrans.splice(i);
                }
            }

            const min_booking_volume = Math.min(...list_hoursIn60Days);
            const max_booking_volume = Math.max(...list_hoursIn60Days);
            const min_soonest_opening = Math.min(...list_daysUntilEarliestOpeningTrans);
            const max_soonest_opening = Math.max(...list_daysUntilEarliestOpeningTrans);

            // Set artists who had no earliestOpening value to max_soonest_opening
            completelyBookedArtists.forEach((ind)=>{
               artists[ind].daysUntilEarliestOpening = max_soonest_opening;
            });

            // Rank each artist
            artists.forEach((artist) => {
                let score = recommendationEngine.rankArtists(artist.preferences.styles[tattooStyle], artist.hoursIn60Days, artist.daysUntilEarliestOpening,
                    min_booking_volume, max_booking_volume, min_soonest_opening, max_soonest_opening);

                recommendationList.push({
                    name: artist.name,
                    _id: artist._id,
                    preference: artist.preferences.styles[tattooStyle],
                    daysUntilEarliestOpening: artist.daysUntilEarliestOpening,
                    bookingVolume: artist.hoursIn60Days,
                    score: score
                })
            });

            // Return list of artists sorted by score
            return recommendationList.sort((a,b)=>{
                if (a.score > b.score) {
                    return 1
                }
                else if (a.score < b.score) {
                    return -1
                }
                else {
                    return 0;
                }
            })
        }
    },
    /**
     * Fetch a booking form from the database based on the client ID (Most recent one)
     * @param clientID
     * @returns {{client: any, form: any}}
     */
    'booking.findByClientID': function(clientID) {
        const client = Client.findOne({_id: clientID});
        const form = Booking.findOne({clientID: clientID});
        return {client, form}
    },
    /**
     * Saves the booking form to the database, but does not push the bookings to the calendar
     * @param form
     * @returns {*}
     */
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
    /**
     * Submit the form to the calendar and also saves the form to the database. Also marks the intake as no longer
     * pending a booking, so it no longer appears in the intake list
     * @param form
     * @returns {Array}
     */
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
    /**
     * Send an email to the client, the artist, and the quality control email to remind them of the appointment
     * @param client
     * @param form
     */
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