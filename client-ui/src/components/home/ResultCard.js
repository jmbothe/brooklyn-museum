import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { MUSEUM_IMG_PATH } from '../../apis';

import React, { Component } from 'react';

class ResultCard extends Component {

  handleClick = () => {
    this.props.setDetail(this.props.object);
    this.props.history.push("/detail");
  }

  render() { 
    return (
      <div>

        <input type="checkbox" />

        <Link
          onClick={this.handleClick}
          to={{ pathname: "/detail" }}
        />

        <img
          src={
            this.props.object.copyright_restricted
            ? `${MUSEUM_IMG_PATH}_fairuse/${this.props.object.primary_image}`
            : `${MUSEUM_IMG_PATH}2/${this.props.object.primary_image}`
          }
          alt={this.props.object.title}
          className="result-card" />

      </div>
    )
  }
}
 
export default withRouter(ResultCard);