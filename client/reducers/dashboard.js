
const defaultWidgets = [
    {
        id: 'intakeList',
        data: []
    }
];

const widget = (state = {}, action) => {
    if (state.id == action.id) {
        switch (action.type) {
            case 'RECEIVE_INTAKE_LIST_DATA':
                return {
                    id: state.id,
                    data: action.data,
                    observer: state.observer
                };
                return state;
            case 'WIDGET_OBSERVER_STARTED':
                return {
                    id: state.id,
                    data: state.data,
                    observer: action.observer
                };
            default:
                return state;
        }
    }
    return state;
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