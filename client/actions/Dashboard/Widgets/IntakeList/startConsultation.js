export default startConsultation = (dispatch, clientID) => {
    return () => {
        Meteor.call('client.fetchOne', clientID, function(error, client) {
            if (error) {
                dispatch({
                    type: 'FETCH_CONSULTATION_CLIENT_ERROR',
                    clientID,
                    error
                });
            } else {
                dispatch({
                    type: 'RECEIVE_CONSULTATION_CLIENT',
                    client,
                });
            }
        });
    }
}