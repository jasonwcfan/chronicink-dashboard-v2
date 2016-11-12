import { combineReducers } from 'redux';
import intakeForm from './intakeForm';
import consultationForm from './consultationForm';

const reducer = combineReducers({
    intakeForm,
    consultationForm
});

export default reducer;