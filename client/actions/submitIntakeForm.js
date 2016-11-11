import decrementStep from './decrementStep';
import savingIntakeForm from './IntakeFormControl/savingIntakeForm';
import savedIntakeForm from './IntakeFormControl/savedIntakeForm';

export default submitIntakeForm = (dispatch, form) => {
    return () => {
        dispatch(savingIntakeForm());
        Meteor.call('intakeForm.insert', form, function(error, formID) {
            if (error) {
                return error;
            } else {
                console.log(formID);
                dispatch(savedIntakeForm(formID));
            }
        });
    }
}