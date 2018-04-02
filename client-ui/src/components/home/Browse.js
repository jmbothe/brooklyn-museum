import React, { Component } from 'react';

class Browse extends Component {

  handleChange = (e) => {
    const relRef = `?collection_id=${e.target.value}&limit=30`;

    this.props.setObjects(relRef, () => this.props.redirect && this.props.toggleRedirect());
  }

  render() {
    const collectionsOptions = this.props.collections.map(item =>
      <option key={item.id} value={item.id}>{item.name}</option>
    );

    return (
      <select name="collection" onChange={this.handleChange}>
        <option value="" selected disabled hidden>Browse Collections</option>
        {collectionsOptions}
      </select>
    )
  }
}
 
export default Browse;