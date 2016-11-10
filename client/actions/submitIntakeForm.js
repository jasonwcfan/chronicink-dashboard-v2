export default submitIntakeForm = (form) => {
    return () => {
        Meteor.call('intakeForm.insert', form);
    }
}