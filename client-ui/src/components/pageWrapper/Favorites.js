import React, { Component } from 'react';

class Favorites extends Component {
  render() { 
    return (
      <button onClick={this.props.getFavorites}>Browse Favorites</button>
    )
  }
}
 
export default Favorites;