import React from 'react';

import Form from '../Form/form';
import ArticleList from '../List/list';

import styles from './style.scss';
import bg from './bg.jpg';

const App = () => (
    <div
      className={styles.app}
      style={{
        background: `url(${bg})`,
      }}
    >
        <Form />
        <ArticleList />
    </div>
);

export default App;
