import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Meteor.methods({
    'consultationForm.insert': function(form) {
        console.log(form);
        return ConsultationForm.insert({
            fields: form.fields,
            sessions: form.sessions
        });
    }
});

export default ConsultationForm = new Mongo.Collection('consultationForm');