import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store/store';

import App from './components/App/app';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    window.document.getElementById('app'),
);
