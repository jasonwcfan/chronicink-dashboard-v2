import { combineReducers } from 'redux';
import intakeForm from './intakeForm';
import consultationForm from './consultationForm';

const activeApp = (state = 'intakeForm', action) => {
        switch (action.type) {
            case 'CHANGE_APP':
                return action.id;
            default:
                return state;
        }
};

const reducer = combineReducers({
    intakeForm,
    consultationForm,
    activeApp
});

export default reducer;