import React, { Component } from 'react';

class LoginForm extends Component {
  state = {
    user: {},
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.logIn(this.state.user);
    e.target.reset();
  }

  onChange = (e) => {
    const user = {...this.state.user}
    user[e.target.name] = e.target.value;
    this.setState({user});
  }

  render() { 
    return (
    <form className="login-form" onSubmit={this.handleSubmit}>
      <div className="form-row">
        <label htmlFor="email">Email</label>
        <input
          type="email" id="email" name="email" required
          onChange={this.onChange}
        />
      </div>
      <div className="form-row">
        <label htmlFor="password">Password</label>
        <input
          type="password" id="password" name="password" required
          onChange={this.onChange}  
        />
      </div>
      <div className="form-row">
        <input type="submit" id="submit" />
      </div>
    </form>
  )
  }
}
 
export default LoginForm;