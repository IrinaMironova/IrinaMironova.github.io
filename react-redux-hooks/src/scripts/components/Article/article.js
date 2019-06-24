import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { removeNews } from '../../actions/actions';

import Form from '../Form/form';
import Icon from '../UI/Icon/Icon';

import styles from './style.scss';

const Article = ({
    id,
    title,
    author,
    text,
}) => {
    const [isChanging, handleUpdate] = useState(false);
    const dispatch = useDispatch();
    const removeNewsItem = newsId => dispatch(removeNews(newsId));
    useEffect(() => {
        handleUpdate(false);
    }, [title, author, text]);
    return (
        <div className={styles.article}>
            {
                isChanging ? (
                    <Form
                      defaultId={id}
                      defaultTitle={title}
                      defaultAuthor={author}
                      defaultText={text}
                      handleAction="update"
                    />
                ) : (
                    <div>
                        <h2 className={styles.h2}>{title}</h2>
                        <h4 className={styles.h4}>
                            by
                            {` ${author}`}
                        </h4>
                        <p className={styles.p}>{text}</p>
                    </div>
                )
            }

            <div className={styles.double_btn}>
                <button
                  className={styles.button}
                  type="button"
                  onClick={() => handleUpdate(!isChanging)}
                >
                    <Icon name="edit" />
                </button>
                <button
                  className={styles.button}
                  type="button"
                  onClick={() => removeNewsItem(id)}
                >
                    <Icon name="close" />
                </button>
            </div>
        </div>
    );
};


export default Article;
