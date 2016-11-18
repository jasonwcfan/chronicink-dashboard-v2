import { fetchIntakeListData } from './IntakeList';

export default startWidgetObserver = (dispatch, id) => {
    switch (id) {
        case 'intakeList':
            const observer =  Meteor.call('intakeForm.observe', {}, function() {
                console.log('added');
                dispatch(fetchIntakeListData(dispatch, id));
        }, function(error, observer) {
            console.log(1);
            console.log(error);
            console.log(observer);
        });
            return {
                type: 'WIDGET_OBSERVER_STARTED',
                id,
                observer
            };
        default:
            return {
                type: 'WIDGET_NOT_FOUND_ERROR',
                id
            };
    }
};