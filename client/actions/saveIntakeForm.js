export default fetchIntakeForm = (form) => {
    return () => {
        Meteor.call('intakeForm.insert', form);
    }
}