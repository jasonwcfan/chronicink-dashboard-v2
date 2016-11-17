import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Meteor.methods({
    'intakeForm.insert': function(form) {
        Meteor.call('client.insert', form, function(error, clientID) {
            if (error) {
                console.log(error);
                return error;
            } else {
                IntakeForm.insert({
                    agreements: form.agreements,
                    fields: form.fields,
                    medicalConditions: form.medicalConditions,
                    consultPending: true,
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
    'intakeForm.fetch': function() {
        return IntakeForm.find({}).fetch();
    },
    'intakeForm.observe': function(query, onAdd, onRemove, onChange) {
        return IntakeForm.find(query).observe(({
            added: onAdd,
            removed: onRemove,
            changed: onChange
        }))
    }
});

IntakeFormSchema = new SimpleSchema({
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

export default IntakeForm = new Mongo.Collection('intakeForm');