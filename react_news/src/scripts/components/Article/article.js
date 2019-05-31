import React from 'react';
import Form from '../Form/form';
import Icon from '../UI/Icon/Icon';
import styles from './style.scss';

class Article extends React.Component {
    constructor(props) {
        super(props);
        const { title, author, text } = this.props;
        this.state = {
            title,
            author,
            text,
            isChanging: false,
        };

        this.handleRemove = this.handleRemove.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }


    componentWillReceiveProps(nextProps) {
        const { title, author, text } = this.props;
        if (nextProps.text !== text
            || nextProps.title !== title
            || nextProps.author !== author) {
            this.setState({
                isChanging: false,
                title: nextProps.title,
                author: nextProps.author,
                text: nextProps.text,
            });
        }
    }

    handleUpdate() {
        const { isChanging } = this.state;
        this.setState({
            isChanging: !isChanging,
        });
    }

    handleRemove() {
        const { removeNews, id } = this.props;
        removeNews(id);
    }

    render() {
        const {
            isChanging,
            title,
            author,
            text,
        } = this.state;
        const {
            id,
            updateNews,
            title: titleProps,
            author: authorProps,
            text: textProps,
        } = this.props;

        return (
            <div className={styles.article}>
                {
                    isChanging ? (
                        <Form
                          defaultId={id}
                          defaultTitle={titleProps}
                          defaultAuthor={authorProps}
                          defaultText={textProps}
                          handleAction={updateNews}
                        />
                    ) : (
                        <div>
                            <h2 className={styles.h2}>{title}</h2>
                            <h4 className={styles.h4}>
                              by
                                {author}
                            </h4>
                            <p className={styles.p}>{text}</p>
                        </div>
                    )
                }

                <div className={styles.double_btn}>
                    <button
                      className={styles.button}
                      type="button"
                      onClick={this.handleUpdate}
                    >
                        <Icon name="edit" />
                    </button>
                    <button
                      className={styles.button}
                      type="button"
                      onClick={this.handleRemove}
                    >
                        <Icon name="close" />
                    </button>
                </div>
            </div>
        );
    }
}

export default Article;
