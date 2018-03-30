import React, { Component } from 'react';

import { cultures, media, orderBy } from '../../selectOptions'

class Search extends Component {
  state = {
    search: {}
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const queryString = Object.entries(this.state.search).map(item => {
      return item.join('=');
    }).join('&');
    this.props.getObjects(queryString, 1, this.props.toggleRedirect);
    e.target.reset();
  }

  onChange = (e) => {
    const search = {...this.state.search}
    search[e.target.name] = e.target.value;
    this.setState({search});
  }

  render() { 
    const orderByOptions = Object.entries(orderBy).map((item, index) => {
      return <option key={index} value={item[1]}>{item[0]}</option>
    });

    const cultureOptions = cultures.map((item, index) => {
      return <option key={index} value={item}>{item}</option>
    });
    
    const mediaOptions = media.map((item, index) => {
      return <option key={index} value={item}>{item}</option>
    });

    return (
      <section className="search-container">
        <header>
          <h2>Search Collection</h2>
        </header>
        <section>
          <form className="search-form" onSubmit={this.handleSubmit}>
            <div className="form-row">
              <label htmlFor="Title">Title:</label>
              <input
                type="text" id="Title" name="Title"
                onChange={this.onChange}
                />
            </div>
            <div className="form-row">
              <label htmlFor="DateBeginYear">Date Range:</label>
              <input
                type="number" id="DateBeginYear" name="DateBeginYear" min="-3000" max="1550"
                onChange={this.onChange}
              />
              <input
                type="number" id="DateEndYear" name="DateEndYear" min="-2000" max="2000"
                onChange={this.onChange}
              />
            </div>
            <div className="form-row">
              <label htmlFor="Creator">Culture:</label>
              <select id="Creator" name="Creator" onChange={this.onChange}>
                <option value="" selected></option>
                {cultureOptions}
              </select>
            </div>
            <div className="form-row">
              <label htmlFor="Classification">Media:</label>
              <select id="Classification" name="Classification" onChange={this.onChange}>
                <option value="" selected></option>
                {mediaOptions}
              </select>
            </div>
            <div className="form-row">
              <label htmlFor="OrderBy">Order By:</label>
              <select id="OrderBy" name="OrderBy" onChange={this.onChange}>
                <option value="" selected></option>
                {orderByOptions}
              </select>
            </div>
            <div className="form-row">
              <input type="submit" id="search-submit" />
            </div>
          </form>
        </section>
        
      </section>
    )
  }
}
 
export default Search;