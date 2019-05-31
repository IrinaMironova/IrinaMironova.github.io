import React from 'react';
import styles from './style.scss';

class Form extends React.Component {
    constructor(props) {
        super(props);
        const { defaultTitle, defaultAuthor, defaultText } = this.props;
        this.state = {
            title: defaultTitle || '',
            author: defaultAuthor || '',
            text: defaultText || '',
        };

        this.titleChange = this.titleChange.bind(this);
        this.authorChange = this.authorChange.bind(this);
        this.textChange = this.textChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    titleChange(e) {
        this.setState({
            title: e ? e.target.value : '',
        });
    }

    authorChange(e) {
        this.setState({
            author: e ? e.target.value : '',
        });
    }

    textChange(e) {
        this.setState({
            text: e ? e.target.value : '',
        });
    }

    submitForm(e) {
        e.preventDefault();

        const { title, author, text } = this.state;
        const { defaultId, handleAction } = this.props;
        if (text && title && author) {
          const news = {
            id: defaultId || Date.now(),
            title,
            author,
            text,
          };
          handleAction(news);
          this.textChange();
          this.titleChange();
          this.authorChange();
        } else {
          alert('please fill in all the fields'); // eslint-disable-line no-alert
        }
    }

    render() {
        const { title, author, text } = this.state;
        return (
            <form
              className={styles.form}
              onSubmit={this.submitForm}
            >
                <input
                  className={styles.input}
                  placeholder="write title"
                  name="title"
                  onChange={this.titleChange}
                  value={title}
                />
                <input
                  className={styles.input}
                  placeholder="write author"
                  name="author"
                  onChange={this.authorChange}
                  value={author}
                />
                <input
                  className={styles.input}
                  placeholder="write your text"
                  name="text"
                  onChange={this.textChange}
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
    }
}

export default Form;
