export default fetchIntakeListData = (dispatch, id) => {
    return () => {
        Meteor.call('intakeForm.fetch', function(error, data) {
            if (error) {
                return error;
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