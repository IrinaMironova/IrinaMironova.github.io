import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Authorization from './components/Authorization/authorization';
import Main from './components/Main/main';
import About from './components/About/about';
import App from './components/App/App';

ReactDOM.render(
    <BrowserRouter>
        <div>
            <App />
            <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/Authorization" component={Authorization} />
                <Route path="/About" component={About} />
            </Switch>
        </div>
    </BrowserRouter>,
    document.getElementById('app'),
);
