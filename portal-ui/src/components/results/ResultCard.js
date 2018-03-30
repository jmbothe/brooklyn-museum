import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ResultCard extends Component {
  render() { 
    return (
      <Link
        onClick={() => this.props.setDetail(this.props.item)}
        className="result-card"
        to="/detail"
      >
        <img src={this.props.imgUrl} alt={this.props.item.Title} />
      </Link>
    )
  }
}
 
export default ResultCard;