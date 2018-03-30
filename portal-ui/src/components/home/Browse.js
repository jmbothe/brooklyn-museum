import React, { Component } from 'react';

import {regions, media} from '../../selectOptions.js'

class Browse extends Component {
  handleChange = (e) => {
    const queryString = `${e.target.name}=${e.target.value}`
    this.props.getObjects(queryString, 1, this.props.toggleRedirect);
  }

  getFavorites = () => {
    const queryString = `objectId=${this.props.currentUser.favorites.map(item => {
      return item.itemId;
    })
    .join(',')}`

    this.props.getObjects(queryString, null, this.props.toggleRedirect);
  }

  render() { 
    const regionOptions = Object.entries(regions).map((item, index) => {
      return <option key={index} value={`${item[1].join(',')}`}>{item[0]}</option>
    });

    const mediaOptions = media.map((item, index) => {
      return <option key={index} value={item}>{item}</option>
    });

    return (
    <section className="browse-container">
      <header>
        <h2>Browse Collection</h2>
      </header>
      <div className="browse-inputs">
        <div>
          <button
            onClick={this.getFavorites}
            disabled={!this.props.currentUser.favorites || !this.props.currentUser.favorites.length}
          >
            View Your Favorites
          </button>  
        </div>
        <div>
          <select name="Creator" onChange={this.handleChange}>
            <option value="" selected disabled hidden>Browse by Region</option>
            {regionOptions}
          </select>
        </div>
        <div>
          <select name="Classification" onChange={this.handleChange}>
            <option value="" selected disabled hidden>Browse by Medium</option>
            {mediaOptions}
          </select>
        </div>
      </div>      
    </section>
    )
  }
}
 
export default Browse;