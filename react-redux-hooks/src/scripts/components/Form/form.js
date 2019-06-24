import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addNews, updateNews } from '../../actions/actions';

import styles from './style.scss';

const Form = (props) => {
  const { defaultTitle, defaultAuthor, defaultText } = props;
  const [title, titleChange] = useState(defaultTitle || '');
  const [author, authorChange] = useState(defaultAuthor || '');
  const [text, textChange] = useState(defaultText || '');
  const dispatch = useDispatch();
  const addNewsItem = news => dispatch(addNews(news));
  const updateNewsItem = news => dispatch(updateNews(news));

  function submitForm(e) {
    e.preventDefault();

    const { defaultId, handleAction } = props;

    if (text && title && author) {
      const news = {
          id: defaultId || Date.now(),
          title,
          author,
          text,
      };

        if (handleAction === 'update') {
          updateNewsItem(news);
        } else {
          addNewsItem(news);
        }
        titleChange('');
        authorChange('');
        textChange('');
    } else {
        alert('please fill in all the fields'); // eslint-disable-line no-alert
    }
  }
  return (
      <form
        className={styles.form}
        onSubmit={submitForm}
      >
          <input
            className={styles.input}
            placeholder="write title"
            name="title"
            onChange={e => titleChange(e.target.value)}
            value={title}
          />
          <input
            className={styles.input}
            placeholder="write author"
            name="author"
            onChange={e => authorChange(e.target.value)}
            value={author}
          />
          <input
            className={styles.input}
            placeholder="write your text"
            name="text"
            onChange={e => textChange(e.target.value)}
            value={text}
          />
          <button
            className={styles.button}
            type="submit"
          >
            Add news
          </button>
      </form>
  );
};

export default Form;
