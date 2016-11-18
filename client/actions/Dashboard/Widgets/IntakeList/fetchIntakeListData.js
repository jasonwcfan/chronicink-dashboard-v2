export default fetchIntakeListData = (dispatch, id) => {
    return () => {
        Meteor.call('intakeForm.fetch', function(error, data) {
            if (error) {
                dispatch({
                    type: 'FETCH_INTAKE_LIST_ERROR',
                    id,
                    error
                });
            } else {
                dispatch({
                    type: 'RECEIVE_INTAKE_LIST_DATA',
                    id,
                    data
                });
            }
        });
    }
};