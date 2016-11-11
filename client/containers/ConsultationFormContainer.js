import { connect } from 'react-redux';
import Consultation from '../components/Consultation';
import { submitIntakeForm, setField, toggleMedicalCondition, toggleAgreement, incrementStep, decrementStep } from '../actions/IntakeForm';

const mapStateToProps = (state) => ({
    fields: state.consultation.fields,
    sessions: state.consultation.sessions,
    isSaved: state.consultation.isSaved,
    savingForm: state.consultation.savingForm,
    formID: state.consultation.formID
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
)(Consultation);

export default ConsultationFormContainer;