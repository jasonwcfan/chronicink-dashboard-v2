import styles from './styles';
import placements from './placements';

export default defaultConsultationFormFields = [
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
        value: 'Colour',
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
        inputType: 'artistSelect',
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