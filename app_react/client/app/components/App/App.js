import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/styles.scss';

class App extends React.Component {
    render() {
        return (
            <nav>
                <ul>
                    <li><Link to="/"> Main </Link></li>
                    <li><Link to="/Authorization"> Authorization </Link></li>
                    <li><Link to="/About"> About </Link></li>
                </ul>
            </nav>
        );
    }
}

export default App;
