export const setField = (id, value, valid) => ({
    type: 'SET_FIELD',
    id,
    value,
    valid
});

export const toggleCondition = (id) => ({
    type: 'TOGGLE_CONDITION',
    id
});

export const incrementStep = () => ({
    type: 'INCR_STEP'
});

export const decrementStep = () => ({
    type: 'DECR_STEP'
});