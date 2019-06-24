import { combineReducers } from 'redux';

import itemsToShow from './itemsToShow';
import list from './list';

export default combineReducers({
	itemsToShow,
	newsList: list,
});
