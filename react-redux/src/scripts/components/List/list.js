import React from 'react';
import { connect } from 'react-redux';

import showMoreItems from '../../actions/actions_items';

import Article from '../Article/article';
import CONSTANTS from '../../constants';

import styles from './style.scss';

class ArticleList extends React.Component {
    constructor() {
        super();
        this.showMore = this.showMore.bind(this);
    }

    showMore() {
        const { showMoreItems: showMoreTwo } = this.props;
        showMoreTwo();
    }

    render() {
        const { listNews, itemsShow } = this.props;
        CONSTANTS.data = listNews;
        localStorage.setItem('newsList', JSON.stringify(CONSTANTS.data));
        return (
            <React.Fragment>
                <div className={styles.wrapper}>
                    {
                        listNews.slice(0, itemsShow).map(news => (
                            <Article
                              key={news.id}
                              id={news.id}
                              title={news.title}
                              author={news.author}
                              text={news.text}
                            />
                        ))
                    }

                </div>
                <div className={styles.btn}>
                    <button
                      className={styles.button}
                      type="button"
                      onClick={this.showMore}
                    >
                      Show more
                    </button>
                </div>
            </React.Fragment>
        );
    }
}

export default connect(store => ({
    listNews: store.newsList,
    itemsShow: store.itemsToShow,
}), { showMoreItems })(ArticleList);
