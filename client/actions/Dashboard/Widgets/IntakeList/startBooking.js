export default startBooking = (dispatch, clientID) => {
    return () => {
        Meteor.call('booking.findByClientID', clientID, function(error, result) {
            if (error) {
                dispatch({
                    type: 'FETCH_BOOKING_ERROR',
                    clientID,
                    error
                });
            } else {
                dispatch({
                    type: 'RECEIVE_BOOKING_FORM_AND_CLIENT',
                    client: result.client,
                    form: result.form
                });
            }
        });
    }
}