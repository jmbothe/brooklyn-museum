import { Link } from 'react-router-dom';
import { MUSEUM_IMG_PATH } from '../../apis';

import React, { Component } from 'react';

class ResultCard extends Component {
  
  handleSelect = (e) => {
    const id = this.props.object.id;

    e.target.checked
      ? this.props.addFavorite(id)
      : this.props.removeFavorite(id)
  }

  render() {
    const object = this.props.object;

    const background = object.copyright_restricted
      ? `${MUSEUM_IMG_PATH}_fairuse/${object.primary_image}`
      : `${MUSEUM_IMG_PATH}2/${object.primary_image}`

    const style = {
      backgroundImage: `url(${background})`,
      backgroundSize: 'cover'
    }

    return (
      <div style={style}>

        <label htmlFor={object.id}>
          <input
            id={object.id}
            type="checkbox"
            onChange={this.handleSelect}
            checked={this.props.currentUser.favorites.some(fav => fav.objectId == object.id)}
          />
          <i className="far fa-heart unchecked"></i>
          <i className="fas fa-heart checked"></i>
        </label>

        <Link
          onClick={() => this.props.setDetail(this.props.object)}
          to={{ pathname: "/detail" }}
        />
      
      </div>
    )
  }
}
 
export default ResultCard;