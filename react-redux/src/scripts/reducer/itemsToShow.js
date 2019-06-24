const itemsToShow = (store = 2, { type }) => {
	switch (type) {
		case 'APP_SHOW':
			return store + 2;
		default:
			return store;
	}
};

export default itemsToShow;
