
const defaultWidgets = [
    {
        id: 'intakeList',
    }
];

const widgets = (state = defaultWidgets, action) => {
    return defaultWidgets;
};

export default dashboard = (state = {}, action) => {
    const newState =  {
        widgets: widgets(state.widgets, action)
    };
    return newState;
};