import React, { Component } from 'react';

class Browse extends Component {
  handleChange = (e) => {
    const queryString = `${e.target.name}=${e.target.value}`
    this.props.getObjects(queryString, this.props.toggleRedirect);
  }

  render() { 

    const collectionsOptions = this.props.collections.map(item => {
      return <option key={item.id} value={item.name}>{item.name}</option>
    });

    return (
      <select name="collections" onChange={this.handleChange}>
        <option value="" selected disabled hidden>Browse Collections</option>
        {collectionsOptions}
      </select>
    )
  }
}
 
export default Browse;