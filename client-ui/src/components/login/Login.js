import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

import LoginForm from './LoginForm';
import LoginHeader from './LoginHeader';
import PageHeader from '../pageWrapper/PageHeader';

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
      <section>
        <PageHeader />
        <LoginHeader 
          loginView={this.state.loginView}
          toggleLoginView={this.toggleLoginView}
        />
        <LoginForm
          inputs={inputs}
          submitAction={submitAction}
        />
      </section>
    )
  }
}
 
export default Login;