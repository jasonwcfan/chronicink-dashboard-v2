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
                    consultPending: true,
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
    consultPending: {
        type: Boolean,
        label: "Whether this intake is waiting for a consult"
    },
    clientID: {
        type: String,
        label: "ID of the client associated with this form"
    }
});

export default Intake = new Mongo.Collection('intake');