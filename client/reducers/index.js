import { combineReducers } from 'redux';
import intakeForm from './intakeForm';
import consultationForm from './consultationForm';

const appLabel = (state = 'Intake Form', action) => {
    switch (action.id) {
        case 'intakeForm':
            return 'Intake Form';
        case 'consultationForm':
            return 'Consultation Form';
        default:
            return state;
    }
};

const activeApp = (state = {id: 'intakeForm', label: 'Intake Form'}, action) => {
        switch (action.type) {
            case 'CHANGE_APP':
                return {
                    id: action.id,
                    label: appLabel(state.label, action)
                };
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