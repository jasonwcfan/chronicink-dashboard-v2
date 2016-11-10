export default fetchIntakeForm = (text) => {
    return () => {
        Meteor.call('addIntakeForm', text);
    }
}