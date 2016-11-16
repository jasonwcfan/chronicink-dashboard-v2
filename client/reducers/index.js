import { combineReducers } from 'redux';
import intakeForm from './intakeForm';
import consultationForm from './consultationForm';
import dashboard from './dashboard';

const appLabel = (state = 'Dashboard', action) => {
    switch (action.id) {
        case 'intakeForm':
            return 'Intake Form';
        case 'consultationForm':
            return 'Consultation Form';
        case 'dashboard':
            return 'Dashboard';
        default:
            return state;
    }
};

const activeApp = (state = {id: 'dashboard', label: 'Dashboard'}, action) => {
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
    dashboard,
    activeApp
});

export default reducer;