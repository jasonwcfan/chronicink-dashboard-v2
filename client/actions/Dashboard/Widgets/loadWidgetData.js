import { fetchIntakeListData } from './IntakeList';

export default loadWidgetData = (dispatch, id) => {
    switch (id) {
        case 'intakeList':
            Meteor.call('intakeForm.observe', {}, function() {
                console.log('added');
                dispatch(fetchIntakeListData(dispatch, id));
            }, _, _);
            return fetchIntakeListData(dispatch, id);
        default:
            return {
                type: 'WIDGET_NOT_FOUND_ERROR',
                id
            };
    }
};