import React, { Component } from 'react';

class Search extends Component {
  state = { keyword: '' }

  handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();

    const relRef = `?keyword=${this.state.keyword}&limit=15`;

    this.props.setObjects(
      `Displaying results for: ${this.state.keyword}`,
    relRef, 
    () => this.props.redirect && this.props.toggleRedirect()
  );
  }

  onChange = (e) => this.setState({ keyword: e.target.value });

  render() { 
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="keyword"></label>
        <input
          type="text" id="keyword" name="keyword"
          onChange={this.onChange}
          placeholder="Search"
          />

        <input type="submit" id="submit" />
      </form>
    )
  }
}
 
export default Search;