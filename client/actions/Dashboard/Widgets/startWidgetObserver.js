import { fetchIntakeListData } from './IntakeList';
import IntakeForm from '../../../../imports/IntakeForm/intakeForm';

export default startWidgetObserver = (dispatch, id) => {
    switch (id) {
        case 'intakeList':
            const observer = IntakeForm.find({}).observe(({
                added: function() {
                    console.log('added');
                    dispatch(fetchIntakeListData(dispatch, id));
                }
            }));
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