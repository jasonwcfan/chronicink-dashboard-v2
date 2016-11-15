import savingConsultationForm from './ConsultationFormSaveAndLoad/savingConsultationForm';
import savedConsultationForm from './ConsultationFormSaveAndLoad/savedConsultationForm';

export default submitConsultationForm = (dispatch, form) => {
    return () => {
        dispatch(savingConsultationForm());
        console.log(form);
        Meteor.call('consultationForm.insert', form, function(error, formID) {
            if (error) {
                return error;
            } else {
                // Although the results return almost instantaneously, show the user the loading animation for at least
                // 2 seconds to convince them it actually worked
                setTimeout(function() {dispatch(savedConsultationForm(formID))}, 2000);
            }
        });
    }
}