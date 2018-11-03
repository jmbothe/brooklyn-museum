import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { handleNon200Response, handlePromiseFailure } from '../../helpers';

import apis from '../../apis';

import './detail.css';

class ObjectDetail extends Component {
  handleChange = (displayString, relRef) => {
    this.props.setObjects(displayString, `${relRef}&limit=15`);
  }

  handleSelect = (e) => {
    const id = this.props.detail.id;

    e.target.checked
      ? this.props.addFavorite(id)
      : this.props.removeFavorite(id)
  }

  render() {
    const detail = this.props.detail;
    if (Object.keys(detail).length === 0) return <section className="loader"></section>

    const artists = detail.artists.length > 0
      ?  <ul>
            <li>Artists: </li>
            {
              detail.artists.map(artist =>
                <li key={artist.id}><Link 
                  onClick={() => this.handleChange(`Displaying results for ${artist.name}`, `?artist_id=${artist.id}`)}
                  to={{ pathname: "/" }}
                >{artist.name} {artist.dates}</Link></li>
              )
            }
          </ul>
      : null;

    const collections = detail.collections.length > 0
      ? <ul>
          <li>Collections: </li>
          {
            detail.collections.map(collection =>
              <li key={collection.id}><Link
                onClick={() => this.handleChange(`Displaying results for ${collection.name}`, `?collection_id=${collection.id}`)}
                to={{ pathname: "/" }}
              >
                {collection.name}
              </Link></li>
            )
          }
        </ul>
      : null;

      const exhibitions = detail.exhibitions.length > 0
      ? <ul>
          <li>Exhibitions: </li>
          {
            detail.exhibitions.map(exhibition =>
              <li key={exhibition.id}><Link
                onClick={() => this.handleChange(`Displaying results for ${exhibition.title}`, `?exhibition_id=${exhibition.id}`)}
                to={{ pathname: "/" }}
              >
                {exhibition.title}
              </Link></li>
            )
          }
      </ul>
      : null;

      const geographies = detail.geographical_locations.length > 0
      ? <ul>
        <li>Geographies:</li>
          {
            detail.geographical_locations.map(location =>
              <li key={location.id}><Link
              onClick={() => this.handleChange(`Displaying results for ${location.name}`,`?geographical_location_id=${location.id}`)}
              to={{ pathname: "/" }}
              >
                {location.type}: {location.name}
              </Link></li>  
            )
          }
        </ul>
      : null;

    return (
      <section className="object-detail">
      
        <section>
          <a
            href={
              detail.copyright_restricted
                ? `${apis.MUSEUM_IMG_PATH}_fairuse/${detail.primary_image}`
                : `${apis.MUSEUM_IMG_PATH}4/${detail.primary_image}`
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
            src={
              detail.copyright_restricted
                ? `${apis.MUSEUM_IMG_PATH}_fairuse/${detail.primary_image}`
                : `${apis.MUSEUM_IMG_PATH}3/${detail.primary_image}`
            }
              alt={detail.title}
            />
          </a>
        </section>
        
        <section>

          <div>
            <div>
              <h2>{detail.title}</h2>
              <h3>{detail.classification} {detail.period || detail.dynasty} {detail.object_date}</h3>

              {artists}
              {collections}
              {exhibitions}
              {geographies}
              <p><span>Medium: </span>{detail.medium}</p>

              <p><span>Credit: </span>{detail.credit_line}</p>
              <p><span>On View: </span>{detail.museum_location.name}</p>
              <p><span>Dimensions: </span>{detail.dimensions}</p>
            </div>

            <div>
            <label htmlFor={detail.id}>
              <input
                id={detail.id}
                type="checkbox"
                onChange={this.handleSelect}
                checked={this.props.favorites.some(fav => fav == detail.id)}
              />
              <i className="far fa-heart unchecked"></i>
              <i className="fas fa-heart checked"></i>
              </label>
            </div>

          </div>
          <p>{detail.description}</p>
        </section>

      </section>
    )
  }
}
 
export default ObjectDetail;