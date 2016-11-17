
const defaultWidgets = [
    {
        id: 'intakeList',
        data: []
    }
];

const widget = (state = {}, action) => {
    switch (action.type) {
        case 'RECEIVE_INTAKE_LIST_DATA':
            if (state.id == action.id) {
                return {
                    id: state.id,
                    data: action.data
                };
            }
            return state;
        default:
            return state;
    }
};

const widgets = (state = defaultWidgets, action) => {
    switch (action.type) {
        case 'RECEIVE_INTAKE_LIST_DATA':
            return state.map(w => widget(w, action));
        default:
            return state;
    }

};

export default dashboard = (state = {}, action) => {
    const newState =  {
        widgets: widgets(state.widgets, action)
    };
    return newState;
};