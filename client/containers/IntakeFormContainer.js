import { connect } from 'react-redux';
import Intake from '../components/Intake';
import { setField, incrementStep, decrementStep } from '../actions';

const mapStateToProps = (state) => ({
    fields: state.intake.fields,
    stepIndex: state.intake.stepIndex
});

const mapDispatchToProps = (dispatch) => ({
    onFieldChange: (id, value, valid) => {
        dispatch(setField(id, value, valid))
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