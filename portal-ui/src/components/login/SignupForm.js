import React, { Component } from 'react';

class SignupForm extends Component {
  state = {
    user: {},
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signUp(this.state.user);
    e.target.reset();
  }

  onChange = (e) => {
    const user = {...this.state.user}
    user[e.target.name] = e.target.value;
    this.setState({user});
  }

  render() { 
    return (
      <form className="signup-form" onSubmit={this.handleSubmit}>
        <div className="form-row">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text" id="firstName" name="firstName" required
            onChange={this.onChange}
            />
        </div>
        <div className="form-row">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text" id="lastName" name="lastName" required
            onChange={this.onChange}
          />
        </div>
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
 
export default SignupForm;