import React, { Component } from 'react';

class Favorites extends Component {
  handleClick = () => {
    this.props.getFavorites();
    if (this.props.redirect) this.props.toggleRedirect();
  }
  render() { 
    return (
      <button onClick={this.handleClick}>Browse Favorites</button>
    )
  }
}
 
export default Favorites;