import React from 'react';
import Article from '../Article/article';

import styles from './style.scss';

class ArticleList extends React.Component {
    constructor() {
        super();

        this.state = {
            itemsToShow: 2,
        };

        this.showMore = this.showMore.bind(this);
    }

    showMore() {
        const { itemsToShow } = this.state;
        this.setState({
            itemsToShow: itemsToShow + 2,
        });
    }

    render() {
        const { list, removeNewsProps, updateNewsProps } = this.props;
        const { itemsToShow } = this.state;
        return (
            <React.Fragment>
                <div className={styles.wrapper}>
                    {
                        list.slice(0, itemsToShow).map(news => (
                            <Article
                              key={news.id}
                              id={news.id}
                              title={news.title}
                              author={news.author}
                              text={news.text}
                              removeNews={removeNewsProps}
                              updateNews={updateNewsProps}
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
export default ArticleList;
