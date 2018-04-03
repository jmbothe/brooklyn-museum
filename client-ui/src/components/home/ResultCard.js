import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { MUSEUM_IMG_PATH } from '../../apis';

import React, { Component } from 'react';

class ResultCard extends Component {

  handleClick = () => {
    this.props.setDetail(this.props.object);
    this.props.history.push("/detail");
  }

  handleSelect = (e) => {
    const id = this.props.object.id;

    e.target.checked
      ? this.props.addFavorite(id)
      : this.props.removeFavorite(id)
  }

  render() {
    const object = this.props.object;

    return (
      <div>

        <input
          type="checkbox"
          onChange={this.handleSelect}
          checked={this.props.currentUser.favorites.some(fav => fav.objectId == object.id)}
        />

        <Link
          onClick={this.handleClick}
          to={{ pathname: "/detail" }}
        />

        <img
          src={
            object.copyright_restricted
            ? `${MUSEUM_IMG_PATH}_fairuse/${object.primary_image}`
            : `${MUSEUM_IMG_PATH}2/${object.primary_image}`
          }
          alt={object.title}
          className="result-card" />

      </div>
    )
  }
}
 
export default withRouter(ResultCard);