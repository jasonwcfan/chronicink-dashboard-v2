import { connect } from 'react-redux';
import Intake from '../components/Intake';
import { setField, toggleCondition, toggleAgreement, incrementStep, decrementStep } from '../actions';

const mapStateToProps = (state) => ({
    fields: state.intake.fields,
    conditions: state.intake.conditions,
    agreements: state.intake.agreements,
    stepIndex: state.intake.stepIndex
});

const mapDispatchToProps = (dispatch) => ({
    onFieldChange: (id, value, valid) => {
        dispatch(setField(id, value, valid))
    },
    onToggleCondition: (id) => {
        dispatch(toggleCondition(id))
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