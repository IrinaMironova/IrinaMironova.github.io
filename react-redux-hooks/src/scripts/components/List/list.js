import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import showMoreItems from '../../actions/actions_items';

import Article from '../Article/article';
import CONSTANTS from '../../constants';

import styles from './style.scss';

const ArticleList = () => {
  const dispatch = useDispatch();
  const showMoreTwo = () => dispatch(showMoreItems());
  const listNews = useSelector(store => store.newsList);
  const itemsShow = useSelector(store => store.itemsToShow);
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
                onClick={showMoreTwo}
              >
                Show more
              </button>
          </div>
      </React.Fragment>
  );
};

export default ArticleList;
