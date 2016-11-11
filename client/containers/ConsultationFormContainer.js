import { connect } from 'react-redux';
import Intake from '../components/Intake';
import { submitIntakeForm, setField, toggleMedicalCondition, toggleAgreement, incrementStep, decrementStep } from '../actions/IntakeForm';

const mapStateToProps = (state) => ({
    fields: state.intake.fields,
    medicalConditions: state.intake.medicalConditions,
    agreements: state.intake.agreements,
    stepIndex: state.intake.stepIndex,
    isSaved: state.intake.isSaved,
    savingForm: state.intake.savingForm,
    formID: state.intake.formID
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