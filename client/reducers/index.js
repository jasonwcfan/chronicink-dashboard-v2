import { combineReducers } from 'redux';
import intake from './intake';
import consultation from './consultation';

const reducer = combineReducers({
    intake,
    consultation
});

export default reducer;