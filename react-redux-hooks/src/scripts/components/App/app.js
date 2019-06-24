import React from 'react';
import {
    HashRouter as Router,
    Route,
    Switch,
    NavLink,
} from 'react-router-dom';

import About from '../About/about';
import Form from '../Form/form';
import ArticleList from '../List/list';

import styles from './style.scss';
import bg from './bg.jpg';

const App = () => (
    <Router>
        <div
          className={styles.app}
          style={{
            background: `url(${bg})`,
          }}
        >
            <header>
                <nav>
                    <ul className={styles.nav}>
                        <li>
                            <NavLink
                              activeStyle={{ color: 'yellow' }}
                              exact
                              to="/"
                            >
                                About
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                              activeStyle={{ color: 'yellow' }}
                              to="/list"
                            >
                                View all news
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                              activeStyle={{ color: 'yellow' }}
                              to="/form"
                            >
                                Add news
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </header>

            <Switch>
                <Route path="/" exact component={About} />
                <Route path="/list" component={ArticleList} />
                <Route path="/form" component={Form} />
            </Switch>
        </div>
    </Router>
);

export default App;
