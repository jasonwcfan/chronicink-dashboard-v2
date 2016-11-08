import { connect } from 'react-redux';
import Intake from '../components/Intake';
import { setField, toggleCondition, incrementStep, decrementStep } from '../actions';

const mapStateToProps = (state) => ({
    fields: state.intake.fields,
    conditions: state.intake.conditions,
    stepIndex: state.intake.stepIndex
});

const mapDispatchToProps = (dispatch) => ({
    onFieldChange: (id, value, valid) => {
        dispatch(setField(id, value, valid))
    },
    onToggleCondition: (id) => {
        dispatch(toggleCondition(id))
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