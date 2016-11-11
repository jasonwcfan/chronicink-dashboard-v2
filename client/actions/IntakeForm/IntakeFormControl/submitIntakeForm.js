import savingIntakeForm from './savingIntakeForm';
import savedIntakeForm from './savedIntakeForm';

export default submitIntakeForm = (dispatch, form) => {
    return () => {
        dispatch(savingIntakeForm());
        Meteor.call('intakeForm.insert', form, function(error, formID) {
            if (error) {
                return error;
            } else {
                // Although the results return almost instantaneously, show the user the loading animation for at least
                // 2 seconds to convince them it actually worked
                setTimeout(function() {dispatch(savedIntakeForm(formID))}, 2000);
            }
        });
    }
}