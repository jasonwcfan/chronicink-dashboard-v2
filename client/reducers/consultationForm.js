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
                value: 'Colour',
                label: 'Colour'
            },
            {
                value: 'Black and Grey',
                label: 'Black and Grey'
            },
            {
                value: 'Black and Grey with touches of colour',
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
        id: 'artist',
        label: 'Artist',
        inputType: 'autocomplete',
        value: '',
        valid: false,
        required: true,
        items: []
    },
    {
        id: 'rateType',
        label: 'Rate Type',
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
                    sessionIndex: action.session.sessionIndex,
                    sessionType: action.session.sessionType,
                    date: action.session.date,
                    startTime: action.session.startTime,
                    endTime: action.session.endTime,
                };
            default:
                return state;
        }
    }
    return state;

};

const fields = (state = defaultFields, action) => {
    switch (action.type) {
        case 'RECEIVE_CONSULTATION_FORM_AND_CLIENT':
            if (action.form) {
                return action.form.fields;
            }
            return state;
        default:
            return state.map(f => field(f, action));
    }
};

const sessions = (state = [], action) => {
    const newState = state.slice();
    switch (action.type) {
        case 'ADD_SESSION':
            newState.push({
                sessionIndex: state.length,
                sessionType: action.session.sessionType,
                date: action.session.date,
                startTime: action.session.startTime,
                endTime: action.session.endTime
            });
            return newState;
        case 'REMOVE_SESSION':
            newState.splice(action.sessionIndex, 1);
            return newState;
        case 'EDIT_SESSION':
            return state.map(s => session(s, action));
        case 'RECEIVE_CONSULTATION_FORM_AND_CLIENT':
            if (action.form) {
                return action.form.sessions;
            }
            return state;
        default:
            return state;
    }
};

const isSaved = (state = false, action) => {
    switch (action.type) {
        case 'SAVED_CONSULTATION_FORM':
            return true;
        case 'SET_FIELD':
        case 'ADD_SESSION':
            return false;
        default:
            return state;
    }
};

const savingForm = (state = false, action) => {
    switch (action.type) {
        case 'SAVING_CONSULTATION_FORM':
            return true;
        case 'SAVED_CONSULTATION_FORM':
            return false;
        default:
            return state;
    }
};

const formID = (state, action) => {
    switch (action.type) {
        case 'SAVED_CONSULTATION_FORM':
            return action.formID;
        case 'RECEIVE_CONSULTATION_FORM_AND_CLIENT':
            if (action.form) {
                return action.form._id;
            }
            return state;
        default:
            return state;
    }
};

const client = (state, action) => {
    switch (action.type) {
        case 'RECEIVE_CONSULTATION_FORM_AND_CLIENT':
            return action.client;
        default:
            return state;
    }
};

export default consultationForm = (state = {}, action) => {
    const newState =  {
        fields: fields(state.fields, action),
        sessions: sessions(state.sessions, action),
        isSaved: isSaved(state.isSaved, action),
        savingForm: savingForm(state.savingForm, action),
        formID: formID(state.formID, action),
        client: client(state.client, action)
    };
    return newState;
};