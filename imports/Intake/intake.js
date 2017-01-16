import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Meteor.methods({
    'intake.insertForm': function(form) {
        console.log('inserting');
        Meteor.call('client.insert', form, function(error, clientID) {
            if (error) {
                console.log(error);
                return error;
            } else {
                Intake.insert({
                    agreements: form.agreements,
                    fields: form.fields,
                    medicalConditions: form.medicalConditions,
                    cancellationAvailability: form.cancellationAvailability,
                    bookingPending: true,
                    clientName: form.fields.firstName.value + ' ' + form.fields.lastName.value,
                    clientID
                }, function (error, formID) {
                    if (error) {
                        return error;
                    } else {
                        return formID;
                    }
                });
            }
        });
    },
    'intake.markBookingCompleted': function(clientID, intakeID) {
        if(intakeID) {
            Intake.update({_id: intakeID}, {$set: {bookingPending: false}}, function(err, res) {
                if (err) {
                    console.log(err);
                    return err;
                }
                return res;
            });
        } else {
            Intake.update({clientID}, {$set: {bookingPending: false}}, function(err, res) {
                if (err) {
                    console.log(err);
                    return err;
                }
                return res;
            });
        }
    }
});

IntakeSchema = new SimpleSchema({
    fields: {
        type: [Object],
        label: "Fields"
    },
    medicalConditions: {
        type: [Object],
        label: "Medical Conditions"
    },
    agreements: {
        type: [Object],
        label: "Agreements"
    },
    bookingPending: {
        type: Boolean,
        label: "Whether the booking for this intake has been completed"
    },
    clientID: {
        type: String,
        label: "ID of the client associated with this form"
    }
});

export default Intake = new Mongo.Collection('intake');