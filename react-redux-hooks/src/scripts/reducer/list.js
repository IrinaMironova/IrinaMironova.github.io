import CONSTANTS from '../constants';

const _news = JSON.parse(localStorage.getItem('newsList')) || CONSTANTS.data;

const list = (store = _news, { type, payload }) => {
	switch (type) {
		case 'APP_ADD':
			return [payload, ...store];
		case 'APP_UPDATE':
			return store.map(item => item.id === payload.id ? payload : item);
		case 'APP_REMOVE':
			return store.filter(item => item.id !== payload);
		default:
			return store;
	}
};

export default list;
