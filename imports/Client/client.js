import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import Moment from 'moment-timezone';
import Artist from '../Artist/artist';

Meteor.methods({
    'client.insert': function(form) {
        const clientInfo = {};
        Object.keys(form.fields).forEach((key) => {
            clientInfo[key] = form.fields[key].value
        });
        clientInfo.cancellationAvailability = form.cancellationAvailability;
        clientInfo.conditions = form.medicalConditions.map((condition) => {
            if (condition.value) {
                return condition.id;
            }
        }).filter((condition) => condition);

        return Client.insert(clientInfo);
    },
    'client.fetchOne': function(clientID) {
        return Client.findOne({_id: clientID});
    },
    'client.getCancellationList': async function(artistId, date, time) {
        if (Meteor.isServer) {
            const artist = Artist.findOne({_id: new Mongo.ObjectID(artistId)});
            const timeslotStr = Moment(time).tz('America/Toronto').hour() > 16 ? 'evening': 'afternoon';
            const queryStr = `cancellationAvailability.${Moment(date).format('dddd').toLowerCase()}.${timeslotStr}`;
            const query = {
                [queryStr]: true
            };
            if (artist) {
                const events = await GCalendar.syncCalendar(artist);
                const result = [];
                const insertedClients = [];

                // Sort events so we can easily find the next appointment for each client
                events.sort((a, b) => {
                    return a.start.dateTime < b.start.dateTime;
                });

                // Find all unique clients and the soonest appointment they have booked
                events.forEach((event) => {
                    if (event.extendedProperties.private) {
                        if (event.extendedProperties.private.clientID) {
                            query._id = event.extendedProperties.private.clientID;
                            const client = Client.findOne(query);
                            if (client) {
                                if (insertedClients.indexOf(client._id) < 0) {
                                    result.push({
                                        client,
                                        event
                                    });
                                    insertedClients.push(client._id);
                                }
                            }
                        }
                    }
                });
                console.log('length:', result.length);
                return result;
            }
        }
    }
});

export default Client = new Mongo.Collection('client');