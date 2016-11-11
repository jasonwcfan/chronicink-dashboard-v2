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

const session = (state, action) => {
    if (state.sessionIndex == action.sessionIndex) {
        switch (action.type) {
            case 'EDIT_SESSION':
                return {
                    sessionIndex: action.sessionIndex,
                    sessionType: action.sessionType,
                    date: action.date,
                    startTime: action.startTime,
                    endTime: action.endTime,
                };
            default:
                return state;
        }
    }
    return state;

};

const fields = (state = defaultFields, action) => {
    return state.map(f => field(f, action))
};

const sessions = (state = [], action) => {
    switch (action.type) {
        case 'ADD_SESSION':
            return Object.assign({}, state).push({
                sessionIndex: state.length,
                sessionType: action.sessionType,
                date: action.date,
                startTime: action.startTime,
                endTime: action.endTime
            });
        case 'REMOVE_SESSION':
            return Object.assign({}, state).splice(action.sessionIndex, 1);
        case 'EDIT_SESSION':
            return state.map(s => session(s, action));
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

export default consultation = (state = {}, action) => {
    const newState =  {
        fields: fields(state.fields, action),
        sessions: sessions(state.sessions, action),
        isSaved: isSaved(state.isSaved, action),
        savingForm: savingForm(state.savingForm, action),
        formID: formID(state.formID, action)
    };
    return newState;
};