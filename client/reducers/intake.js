import { combineReducers } from 'redux'

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

const field = (state, action) => {
    switch(action.type) {
        case 'SET_FIELD':
            if (state.id == action.id) {
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

const step = (state = 0, action) => {
    switch (action.type) {
        case 'INCR_STEP':
            return state++;
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
        stepIndex: step(state.stepIndex, action)
    };
    console.log('new state:');
    console.log(newState);
    return newState;
};