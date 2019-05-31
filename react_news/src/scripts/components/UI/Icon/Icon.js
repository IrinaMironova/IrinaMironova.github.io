import React from 'react';

import Edit from './icons/edit.svg';
import Close from './icons/close.svg';

const Icon = ({ name }) => {
	switch (name) {
		case 'edit':
			return <Edit />;
		case 'close':
			return <Close />;
		default:
			return <div />;
	}
};

export default Icon;
