import React, { Component, Fragment } from 'react';
import {Redirect} from 'react-router-dom';

import LoginForm from './LoginForm';
import LoginHeader from './LoginHeader';
import PageHeader from '../PageHeader';

class Login extends Component {
  state = { loginView: false };

  toggleLoginView = boolean => this.setState({ loginView: boolean });

  render() {
    if (this.props.currentUser) return <Redirect to="/" />;

    const inputs = this.state.loginView
      ? [{type: 'email', name: 'email'}, {type: 'password', name: 'password'}]
      : [{type: 'text', name: 'fullName'}, {type: 'email', name: 'email'}, {type: 'password', name: 'password'}];

    const submitAction = this.state.loginView
    ? this.props.logIn
    : this.props.signUp;

    return (
      <Fragment>
        <PageHeader>
          </PageHeader>
          <section className="login-container">
            <LoginHeader 
              loginView={this.state.loginView}
              toggleLoginView={this.toggleLoginView}
            />
            <LoginForm
              inputs={inputs}
              submitAction={submitAction}
            />
        </section>
      </Fragment>
    )
  }
}
 
export default Login;