export default fetchIntakeForm = (id) => {
    return () => {
        Meteor.call('fetchIntakeForm', id);
    }
}