import React, { Component } from 'react';

class Search extends Component {
  state = { keyword: '' }

  handleSubmit = (e) => {
    this.props.getObjects(this.state.keyword, this.props.toggleRedirect);
    e.target.reset();
  }

  onChange = (e) => this.setState({ keyword: e.target.value });

  render() { 
    return (
      <form className="search-form" onSubmit={this.handleSubmit}>

        <div>
          <label htmlFor="keyword">Search</label>
          <input
            type="text" id="keyword" name="keyword"
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
 
export default Search;