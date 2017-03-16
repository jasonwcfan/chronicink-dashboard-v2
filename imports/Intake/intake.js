import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import Moment from 'moment';

function sendIntakeEmail(form) {
    let subject = 'Chronic Ink Deposit Reminder';
    let body = `Hi ${form.fields.firstName.value}, \n\nThank you for taking the time to complete our intake form.\n` +
                'If you have not yet called us to leave your deposit and confirm your booking, please do so ' +
                'within 24 hours. Our number is 416-544-0311.\n\nIf you have already called and left your deposit,' +
                ' thank you and we look forward to seeing you soon!\n\n- The Chronic Ink Family';
    let recipient = form.fields.email.value;
    GMail.sendEmail(recipient, subject, body);
}

Meteor.methods({
    'intake.insertForm': function(form) {
        console.log('inserting');

        // Have to do this here because for some reason it mutates state when doing it in IntakeForm.js!!!
        form.fields.dateOfBirth.value = Moment(form.fields.dateOfBirth.value, 'DD-MM-YYYY').toDate();

        return Intake.insert({
            filledInternally: form.filledInternally,
            agreements: form.agreements,
            fields: form.fields,
            medicalConditions: form.medicalConditions,
            cancellationAvailability: form.cancellationAvailability,
            bookingPending: true,
            missedCall: false,
            clientName: form.fields.firstName.value + ' ' + form.fields.lastName.value,
            date: new Date()
        }, function (error, formID) {
            if (error) {
                console.log(error);
            } else {
                if (Meteor.isServer) {
                    sendIntakeEmail(form);
                }

                Meteor.call('client.insert', form, function(error, clientID) {
                    if (error) {
                        console.log(error);
                    } else {
                        Intake.update({_id: formID}, {$set: {clientID: clientID}});
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
    },
    'intake.missedCall': function(formID) {
        if (formID) {
            return Intake.update({_id: formID}, {$set: {missedCall: true}})
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
