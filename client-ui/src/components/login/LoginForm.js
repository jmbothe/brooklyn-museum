import React, { Component } from 'react';

import LoginRow from './LoginRow'

class LoginForm extends Component {
  state = {user: {} };
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.submitAction(this.state.user);
    e.target.reset();
  }

  onChange = (e) => {
    const user = {...this.state.user}
    user[e.target.name] = e.target.value;
    this.setState({ user });
  }

  render() { 
    return (
    <form className="login-form" onSubmit={this.handleSubmit}>
      {
        this.props.inputs.map((input, index) =>
          <LoginRow {...input} onChange={this.onChange} key={input.name}/>)
      }
      <div>
        <input type="submit" id="submit" />
      </div>
    </form>
  )
  }
}
 
export default LoginForm;