import { combineReducers } from 'redux';
import medicalConditions from '../constants/conditions';

const defaultFields = [
    {
        id: 'firstName',
        label: 'First Name',
        inputType: 'text',
        value: '',
        valid: false,
        required: true
    },
    {
        id: 'lastName',
        label: 'Last Name',
        inputType: 'text',
        value: '',
        valid: false,
        required: true
    },
    {
        id: 'address',
        label: 'Address',
        inputType: 'text',
        value: '',
        valid: false,
        required: true
    },
    {
        id: 'secondaryAddress',
        label: 'Address Line 2',
        inputType: 'text',
        value: '',
        valid: false,
        required: false
    },
    {
        id: 'city',
        label: 'City',
        inputType: 'text',
        value: '',
        valid: false,
        required: true
    },
    {
        id: 'country',
        label: 'Country',
        inputType: 'country',
        value: 'Canada',
        valid: false,
        required: true
    },
    {
        id: 'region',
        label: 'Province',
        inputType: 'region',
        value: '',
        valid: false,
        required: true
    },
    {
        id: 'postalCode',
        label: 'Postal Code',
        inputType: 'text',
        value: '',
        valid: false,
        required: false
    },
    {
        id: 'email',
        label: 'Email',
        inputType: 'text',
        value: '',
        valid: false,
        required: true
    },
    {
        id: 'primaryPhoneNumber',
        label: 'Primary Phone Number',
        inputType: 'text',
        value: '',
        valid: false,
        required: true
    },
    {
        id: 'secondaryPhoneNumber',
        label: 'Additional Phone Number',
        inputType: 'text',
        value: '',
        valid: false,
        required: false
    },
    {
        id: 'dateOfBirth',
        label: 'Date of Birth',
        inputType: 'date',
        value: null,
        valid: false,
        required: true
    },


];
const defaultConditions = medicalConditions.map((condition) => {
    return {
        id: condition,
        value: false
    }
});
const defaultAgreement = [
    {
        id: 'acceptDisclaimer',
        value: false
    },
    {
        id: 'acceptDeposit',
        value: false
    },
    {
        id: 'acceptNewsletter',
        value: false
    }
];

const field = (state, action) => {
    switch(action.type) {
        case 'SET_FIELD':
            console.log(action);
            console.log(state.id);
            if (state.id == action.id) {
                console.log(action.value);
                return {
                    ...state,
                    id: action.id,
                    value: action.value,
                    valid: action.valid
                };
            }
            return state;
        default:
            return state;
    }
};

const fields = (state = defaultFields, action) => {
    return state.map(f => field(f, action))
};

const conditions = (state = defaultConditions, action) => {
    if (action.type === 'TOGGLE_CONDITION') {
        return state.map(c => {
            if (action.id === c.id) {
                return {
                    id: c.id,
                    value: !c.value
                }
            }
            return c;
        })
    }
    return state;
};

const agreements = (state = defaultAgreement, action) => {
    if (action.type === 'TOGGLE_AGREEMENT') {
        return state.map(a => {
            if (action.id === a.id) {
                return {
                    id: a.id,
                    value: !a.value
                }
            }
            return a
        })
    }
    return state;
};

const step = (state = 0, action) => {
    switch (action.type) {
        case 'INCR_STEP':
            return state + 1;
        case 'DECR_STEP':
            return state > 0 ? state - 1 : 0;
        default:
            return state;
    }
};

export default intake = (state = {}, action) => {
    console.log('old state:');
    console.log(state);
    const newState =  {
        fields: fields(state.fields, action),
        conditions: conditions(state.conditions, action),
        agreements: agreements(state.agreements, action),
        stepIndex: step(state.stepIndex, action)
    };
    console.log('new state:');
    console.log(newState);
    return newState;
};