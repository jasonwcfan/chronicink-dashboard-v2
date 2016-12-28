import { combineReducers } from 'redux';
import intakeForm from './intakeForm';
import dashboard from './dashboard';

const reducer = combineReducers({
    intakeForm,
    dashboard
});

export default reducer;