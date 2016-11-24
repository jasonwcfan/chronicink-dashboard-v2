
const defaultWidgets = [
    {
        id: 'intakeList',
        data: []
    }
];

const widgets = (state = defaultWidgets, action) => {
    return state;

};

export default dashboard = (state = {}, action) => {
    const newState =  {
        widgets: widgets(state.widgets, action)
    };
    return newState;
};