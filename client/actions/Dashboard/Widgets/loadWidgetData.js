import { fetchIntakeListData } from './IntakeList';
import {IntakeForm} from '../../../../imports/IntakeForm/intakeForm'

export default loadWidgetData = (dispatch, id) => {
    switch (id) {
        case 'intakeList':
            return fetchIntakeListData(dispatch, id);
        default:
            return {
                type: 'WIDGET_NOT_FOUND_ERROR',
                id
            };
    }
};