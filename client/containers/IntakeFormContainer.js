import { connect } from 'react-redux';
import IntakeForm from '../components/IntakeForm';
import { submitIntakeForm, setField, toggleMedicalCondition, toggleAgreement, incrementStep, decrementStep } from '../actions/IntakeForm';

const mapStateToProps = (state) => ({
    fields: state.intakeForm.fields,
    medicalConditions: state.intakeForm.medicalConditions,
    agreements: state.intakeForm.agreements,
    stepIndex: state.intakeForm.stepIndex,
    isSaved: state.intakeForm.isSaved,
    savingForm: state.intakeForm.savingForm,
    formID: state.intakeForm.formID
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
)(IntakeForm);

export default IntakeFormContainer;