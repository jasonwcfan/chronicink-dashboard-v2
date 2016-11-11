import decrementStep from './decrementStep';

export default submitIntakeForm = (dispatch, form) => {
    return () => {
        Meteor.call('intakeForm.insert', form, function(error, result) {
            if (error) {
                return error;
            } else {
                console.log(result);
                dispatch(decrementStep());
            }
        });
    }
}