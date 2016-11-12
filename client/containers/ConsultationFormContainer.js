import { connect } from 'react-redux';
import ConsultationForm from '../components/ConsultationForm';
import { submitIntakeForm, setField, toggleMedicalCondition, toggleAgreement, incrementStep, decrementStep } from '../actions/IntakeForm';

const mapStateToProps = (state) => ({
    fields: state.consultationForm.fields,
    sessions: state.consultationForm.sessions,
    isSaved: state.consultationForm.isSaved,
    savingForm: state.consultationForm.savingForm,
    formID: state.consultationForm.formID
});

const mapDispatchToProps = (dispatch) => ({
    onSubmitConsultationForm: (form) => {
        // dispatch(submitIntakeForm(dispatch, form))
    },
    onFieldChange: (id, value, valid) => {
        // dispatch(setField(id, value, valid))
    }
});

const ConsultationFormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConsultationForm);

export default ConsultationFormContainer;