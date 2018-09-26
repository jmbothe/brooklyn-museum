import React, { Component } from 'react';

import LoginRow from './LoginRow'

class LoginForm extends Component {
  state = {user: {} };
  
  handleSubmit = (e) => {
    e.preventDefault();
    const body = Object.keys(e.target.elements).reduce((acc, key) => {
      if (e.target.elements[key].name) {
        acc[e.target.elements[key].name] = e.target.elements[key].value;
      }
      return acc;
    }, {})
    console.log(body)
    this.props.submitAction(body);
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
          <LoginRow user={this.state.user} {...input} onChange={this.onChange} key={input.name + index}/>)
      }
      <div>
        <input type="submit" id="submit" />
      </div>
    </form>
  )
  }
}
 
export default LoginForm;