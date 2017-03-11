export default defaultIntakeFormFields = [
    {
        id: 'firstName',
        label: 'First Name',
        inputType: 'textField',
        value: '',
        errorText: null,
        required: true
    },
    {
        id: 'lastName',
        label: 'Last Name',
        inputType: 'textField',
        value: '',
        errorText: null,
        required: true
    },
    {
        id: 'address',
        label: 'Address',
        inputType: 'textField',
        value: '',
        errorText: null,
        required: true
    },
    {
        id: 'secondaryAddress',
        label: 'Address Line 2',
        inputType: 'textField',
        value: '',
        errorText: null,
        required: false
    },
    {
        id: 'city',
        label: 'City',
        inputType: 'textField',
        value: '',
        errorText: null,
        required: true
    },
    {
        id: 'country',
        label: 'Country',
        inputType: 'country',
        value: 'Canada',
        errorText: null,
        required: true
    },
    {
        id: 'region',
        label: 'Province/State/Region',
        inputType: 'region',
        value: '',
        errorText: null,
        required: true
    },
    {
        id: 'postalCode',
        label: 'Postal/ZIP Code',
        inputType: 'textField',
        value: '',
        errorText: null,
        required: false
    },
    {
        id: 'email',
        label: 'Email',
        inputType: 'email',
        value: '',
        errorText: null,
        required: true
    },
    {
        id: 'primaryPhoneNumber',
        label: 'Primary Phone Number',
        inputType: 'phoneNumber',
        value: '',
        errorText: null,
        required: true
    },
    {
        id: 'secondaryPhoneNumber',
        label: 'Additional Phone Number',
        inputType: 'phoneNumber',
        value: '',
        errorText: null,
        required: false
    },
    {
        id: 'dateOfBirth',
        label: 'Date of Birth (DD/MM/YYYY)',
        inputType: 'date',
        value: null,
        errorText: null,
        required: true
    },


];