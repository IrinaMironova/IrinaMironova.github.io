import React, { Component } from 'react';
import 'whatwg-fetch';

import {
  getFromStorage,
  setInStorage,
} from '../../utils/storage';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      token: '',
      signUpError: '',
      signInError: '',
      signInEmail: '',
      signInPassword: '',
      signUpEmail: '',
      signUpPassword: '',
      isAccountExists: false,
    };
    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.logout = this.logout.bind(this);
    this.checkAccount = this.checkAccount.bind(this);
    this.checkExistAccount = this.checkExistAccount.bind(this);
  }

  componentDidMount() {
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
      fetch(`/api/account/verify?token=${token}`)
        .then(res => res.json())
        .then((json) => {
          if (json.success) {
            this.setState({
              token,
              isLoading: false,
            });
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }

  onTextboxChangeSignInEmail(event) {
    this.setState({
      signInEmail: event.target.value,
    });
  }

  onTextboxChangeSignInPassword(event) {
    this.setState({
      signInPassword: event.target.value,
    });
  }

  onTextboxChangeSignUpEmail(event) {
    this.setState({
      signUpEmail: event.target.value,
    });
  }

  onTextboxChangeSignUpPassword(event) {
    this.setState({
      signUpPassword: event.target.value,
    });
  }

  onSignUp() {
    const {
      signUpEmail,
      signUpPassword,
    } = this.state;

    this.setState({
      isLoading: true,
    });

    // Post request to backend
    fetch('/api/account/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: signUpEmail,
        password: signUpPassword,
      }),
    }).then(res => res.json())
      .then((json) => {
        if (json.success) {
          this.setState({
            signUpError: json.message,
            isLoading: false,
            signUpEmail: '',
            signUpPassword: '',
          });
        } else {
          this.setState({
            signUpError: json.message,
            isLoading: false,
            signInPassword: '',
            signInEmail: '',
          });
        }
      });
  }

  onSignIn() {
    const {
      signInEmail,
      signInPassword,
    } = this.state;

    this.setState({
      isLoading: true,
    });

    // Post request to backend
    fetch('/api/account/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    }).then(res => res.json())
      .then((json) => {
        if (json.success) {
          setInStorage('the_main_app', { token: json.token });
          this.setState({
            signInError: json.message,
            isLoading: false,
            signInPassword: '',
            signInEmail: '',
            token: json.token,
          });
        } else {
          this.setState({
            signInError: json.message,
            isLoading: false,
          });
        }
      });
  }

  logout() {
    this.setState({
      isLoading: true,
    });
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch(`/api/account/logout?token=${token}`)
        .then(res => res.json())
        .then((json) => {
          if (json.success) {
            this.setState({
              token: '',
              isLoading: false,
            });
            localStorage.clear();
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }

  checkAccount() {
    this.setState({
        isAccountExists: true,
    });
  }

  checkExistAccount() {
    this.setState({
        isAccountExists: false,
    });
  }

  render() {
    const {
      isLoading,
      token,
      signInError,
      signInEmail,
      signInPassword,
      signUpEmail,
      signUpPassword,
      signUpError,
      isAccountExists,
    } = this.state;

    if (isLoading) {
      return (<div><p>Loading...</p></div>);
    }

    if (!token) {
      return (
          <div className="form">
              <div className="sign_btn">
                  <button type="button" onClick={this.checkAccount}> sign in </button>
                  <button type="button" onClick={this.checkExistAccount}> sign up </button>
              </div>
              {
                (isAccountExists) ? (
                    <form>
                        <p>Sign In</p>
                        <input
                          type="email"
                          placeholder="Email"
                          value={signInEmail}
                          onChange={this.onTextboxChangeSignInEmail}
                        />
                        <br />
                        <input
                          type="password"
                          placeholder="Password"
                          value={signInPassword}
                          onChange={this.onTextboxChangeSignInPassword}
                        />
                        <br />
                        <button
                          type="submit"
                          onClick={this.onSignIn}
                        >
                            Sign In
                        </button>
                        {
                            (signInError) ? (
                                <p>{signInError}</p>
                            ) : (null)
                        }
                    </form>
                ) : (
                    <form>
                        <p>
                          please create an account.
                          If you already have an account,
                          go to the tab `&rsquo;Sign in`&rsquo; and login
                        </p>
                        <input
                          type="email"
                          placeholder="Email"
                          value={signUpEmail}
                          onChange={this.onTextboxChangeSignUpEmail}
                        />
                        <br />
                        <input
                          type="password"
                          placeholder="Password"
                          value={signUpPassword}
                          onChange={this.onTextboxChangeSignUpPassword}
                        />
                        <br />
                        <button
                          type="submit"
                          onClick={this.onSignUp}
                        >
                          Sign Up
                        </button>
                        {
                        (signUpError) ? (
                            <p>{signUpError}</p>
                        ) : (null)
                        }
                    </form>
                )
            }
          </div>
      );
    }

    return (
        <div>
            <p>You have successfully logged in.
              To get started with the map press `&rsquo;Main`&rsquo;.
              If you want to exit please press Logout.
            </p>
            <div className="logout">
                <button
                  type="button"
                  onClick={this.logout}
                >
                  Logout
                </button>
            </div>
        </div>
    );
  }
}

export default Home;
