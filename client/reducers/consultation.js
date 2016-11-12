import conditions from '../constants/medicalConditions';
import styles from '../constants/styles';
import placements from '../constants/placements';

const defaultFields = [
    {
        id: 'studioLocation',
        label: 'Studio location',
        inputType: 'radio',
        value: 'toronto',
        valid: true,
        required: true,
        items: [{
                value: 'toronto',
                label: 'Toronto'
            }, {
                value: 'markham',
                label: 'Markham'
            }]
    },
    {
        id: 'customTattoo',
        label: 'Is this a custom Tattoo?',
        inputType: 'radio',
        value: 'yes',
        valid: true,
        required: true,
        items: [{
            value: 'yes',
            label: 'Yes'
        }, {
            value: 'no',
            label: 'No'
        }]
    },
    {
        id: 'coverup',
        label: 'Is this a coverup?',
        inputType: 'radio',
        value: 'no',
        valid: true,
        required: true,
        items: [{
            value: 'yes',
            label: 'Yes'
        }, {
            value: 'no',
            label: 'No'
        }]
    },
    {
        id: 'style',
        label: 'Style',
        inputType: 'autocomplete',
        value: '',
        valid: false,
        required: true,
        items: styles
    },
    {
        id: 'placement',
        label: 'Placement',
        inputType: 'autocomplete',
        value: '',
        valid: false,
        required: true,
        items: placements
    },
    {
        id: 'size',
        label: 'Size',
        inputType: 'textField',
        value: '',
        valid: false,
        required: true
    },
    {
        id: 'colouring',
        label: 'Colouring',
        inputType: 'radio',
        value: 'colour',
        valid: true,
        required: true,
        items: [
            {
                value: 'colour',
                label: 'Colour'
            },
            {
                value: 'blackAndGrey',
                label: 'Black and Grey'
            },
            {
                value: 'blackAndGreyWithColour',
                label: 'Black and Grey with touches of colour'
            }]
    },
    {
        id: 'skinTone',
        label: 'Skin Tone',
        inputType: 'textField',
        value: '',
        valid: true,
        required: false
    },
    {
        id: 'subject',
        label: 'Subject',
        inputType: 'textBox',
        value: '',
        valid: true,
        required: false
    },
    {
        id: 'feel',
        label: 'Feel',
        inputType: 'textBox',
        value: '',
        valid: true,
        required: false
    },
    {
        id: 'rate',
        label: 'Rate',
        inputType: 'radio',
        value: 'hourly',
        valid: true,
        required: true,
        items: [
            {
                value: 'hourly',
                label: 'Hourly'
            },
            {
                value: 'perPiece',
                label: 'Per Piece'
            },
            {
                value: 'toBeDetermined',
                label: 'To Be Determined'
            }
        ]
    },
    {
        id: 'rate',
        label: 'Rate',
        inputType: 'textField',
        value: '',
        valid: false,
        required: true
    },
    {
        id: 'deposit',
        label: 'Deposit',
        inputType: 'textField',
        value: '',
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