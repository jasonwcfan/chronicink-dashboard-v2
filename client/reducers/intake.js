import conditions from '../constants/medicalConditions';

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
const defaultMedicalConditions = conditions.map((condition) => {
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

const medicalConditions = (state = defaultMedicalConditions, action) => {
    if (action.type === 'TOGGLE_MEDICAL_CONDITION') {
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

const stepIndex = (state = 0, action) => {
    switch (action.type) {
        case 'INCR_STEP':
            return state + 1;
        case 'DECR_STEP':
            return state > 0 ? state - 1 : 0;
        default:
            return state;
    }
};

const isSaved = (state = false, action) => {
    switch (action.type) {
        case 'SAVED_FORM':
            return true;
        case 'EDITED_FORM':
            return false;
        default:
            return state;
    }
};

const savingForm = (state = false, action) => {
    switch (action.type) {
        case 'SAVING_FORM':
            return true;
        case 'SAVED_FORM':
            return false;
        default:
            return state;
    }
};

const formID = (state, action) => {
    switch (action.type) {
        case 'SAVED_FORM':
            return action.formID;
        default:
            return state;
    }
};

export default intake = (state = {}, action) => {
    const newState =  {
        fields: fields(state.fields, action),
        medicalConditions: medicalConditions(state.medicalConditions, action),
        agreements: agreements(state.agreements, action),
        stepIndex: stepIndex(state.stepIndex, action),
        isSaved: isSaved(state.isSaved, action),
        savingForm: savingForm(state.savingForm, action),
        formID: formID(state.formID, action)
    };
    return newState;
};