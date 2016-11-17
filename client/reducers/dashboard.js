
const defaultWidgets = [
    {
        id: 'intakeList',
        data: []
    }
];

const widgets = (state = defaultWidgets, action) => {
    switch (action.type) {
        case 'RECEIVE_INTAKE_LIST_DATA':
            return state.map((widget) => {
                if (widget.id == action.id) {
                    widget.data = action.data;
                }
                return widget;
            });
        default:
            return defaultWidgets;
    }

};

export default dashboard = (state = {}, action) => {
    const newState =  {
        widgets: widgets(state.widgets, action)
    };
    return newState;
};