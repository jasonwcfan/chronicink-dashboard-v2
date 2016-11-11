export default setField = (id, value, valid) => ({
    type: 'SET_FIELD',
    id,
    value,
    valid
});