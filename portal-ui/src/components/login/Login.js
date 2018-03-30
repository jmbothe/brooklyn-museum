import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

import PageWrapper from '../PageWrapper';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

class Login extends Component {
  state = {
    loginView: false,
  }

  toggleLoginView = boolean => this.setState({loginView: boolean});

  render() {
    if (this.props.currentUser) return <Redirect to="/" />;

    const content = (this.state.loginView)
    ? <LoginForm
        logIn={this.props.logIn}
      />
    : <SignupForm
        signUp={this.props.signUp}
      />

    return (
      <PageWrapper
        currentUser={this.props.currentUser}
        logOut={this.props.logOut}
      >
         <section className="login-card-container">
          <section className="login-card">
            <header>
              <button
                className={this.state.loginView ? '' : 'tab-fade' }
                onClick={() => this.toggleLoginView(true)}
              >
                Log in
              </button>
              <button
                className={this.state.loginView ? 'tab-fade' : '' }
                onClick={() => this.toggleLoginView(false)}
              >
                Sign up
              </button>
            </header>
            {content}
          </section>
        </section>
      </PageWrapper>
    )
  }
}
 
export default Login;