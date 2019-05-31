import React from 'react';

import Form from '../Form/form';
import ArticleList from '../List/list';
import CONSTANTS from '../../constants';

import styles from './style.scss';
import bg from './bg.jpg';


class App extends React.Component {
    constructor() {
        super();
        this.state = {
            newsList: JSON.parse(localStorage.getItem('newsList')) || CONSTANTS.data,
        };

        this.addNews = this.addNews.bind(this);
        this.removeNews = this.removeNews.bind(this);
        this.updateNews = this.updateNews.bind(this);
    }

    addNews(news) {
        const { newsList } = this.state;
        this.setState({
            newsList: [news, ...newsList],
        });
    }

    updateNews(news) {
        const { newsList } = this.state;
        this.setState({
            newsList: newsList.map(item => (
                item.id === news.id ? news : item
             )),
        });
    }

    removeNews(id) {
        const { newsList } = this.state;
        this.setState({
            newsList: newsList.filter(news => news.id !== id),
        });
    }

    render() {
        const { newsList } = this.state;
        CONSTANTS.data = newsList;
        localStorage.setItem('newsList', JSON.stringify(CONSTANTS.data));
        return (
            <div
              className={styles.app}
              style={{
                background: `url(${bg})`,
              }}
            >
                <Form
                  handleAction={this.addNews}
                />
                <ArticleList
                  list={newsList}
                  removeNewsProps={this.removeNews}
                  updateNewsProps={this.updateNews}
                />
            </div>
        );
    }
}
export default App;
