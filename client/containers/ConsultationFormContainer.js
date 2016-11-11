import { connect } from 'react-redux';
import Intake from '../components/Intake';
import { submitIntakeForm, setField, toggleMedicalCondition, toggleAgreement, incrementStep, decrementStep } from '../actions/IntakeForm';

const mapStateToProps = (state) => ({
    fields: state.consultation.fields,
    sessions: state.consultation.sessions,
    isSaved: state.consultation.isSaved,
    savingForm: state.consultation.savingForm,
    formID: state.consultation.formID
});

const mapDispatchToProps = (dispatch) => ({
    onSubmitIntakeForm: (form) => {
        dispatch(submitIntakeForm(dispatch, form))
    },
    onFieldChange: (id, value, valid) => {
        dispatch(setField(id, value, valid))
    },
    onToggleMedicalCondition: (id) => {
        dispatch(toggleMedicalCondition(id))
    },
    onToggleAgreement: (id) => {
        dispatch(toggleAgreement(id))
    },
    onClickNextStep: () => {
        dispatch(incrementStep())
    },
    onClickPreviousStep: () => {
        dispatch(decrementStep())
    }
});

const IntakeFormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Intake);

export default IntakeFormContainer;