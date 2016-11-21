import { combineReducers } from 'redux';
import intakeForm from './intakeForm';
import consultationForm from './consultationForm';
import dashboard from './dashboard';

const reducer = combineReducers({
    intakeForm,
    consultationForm,
    dashboard
});

export default reducer;