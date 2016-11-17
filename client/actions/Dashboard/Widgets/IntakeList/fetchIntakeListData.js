export default fetchIntakeListData = (dispatch, id) => {
    return () => {
        Meteor.call('intakeForm.fetch', function(error, data) {
            if (error) {
                return error;
            } else {
                // Although the results return almost instantaneously, show the user the loading animation for at least
                // 2 seconds to convince them it actually worked
                dispatch({
                    type: 'RECEIVE_INTAKE_LIST_DATA',
                    id,
                    data
                });
            }
        });
    }
};