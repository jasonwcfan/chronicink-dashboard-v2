export default startConsultation = (dispatch, clientID) => {
    return () => {
        Meteor.call('consultation.findByClientID', clientID, function(error, result) {
            if (error) {
                dispatch({
                    type: 'FETCH_CONSULTATION_ERROR',
                    clientID,
                    error
                });
            } else {
                dispatch({
                    type: 'RECEIVE_CONSULTATION_FORM_AND_CLIENT',
                    client: result.client,
                    form: result.form
                });
            }
        });
    }
}