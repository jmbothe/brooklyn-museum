import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

import { MUSEUM_IMG_PATH } from '../../apis';

import './detail.css';

class ObjectDetail extends Component {
  handleChange = (relRef) => {
    this.props.setObjects(`${relRef}&limit=30`);
  }

  render() {
    const detail = this.props.detail;

    const artists = detail.artists.length > 0
      ?  <ul>
            <li>Artists: </li>
            {
              detail.artists.map(artist =>
                <li><Link 
                  onClick={() => this.handleChange(`?artist_id=${artist.id}`)}
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
              <li><Link
                onClick={() => this.handleChange(`?collection_id=${collection.id}`)}
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
              <li><Link
                onClick={() => this.handleChange(`?exhibition_id=${exhibition.id}`)}
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
          {
            detail.geographical_locations.map(location =>
              <li><Link
              onClick={() => this.handleChange(`?geographical_location_id=${location.id}`)}
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
          <a href={`${MUSEUM_IMG_PATH}4/${detail.primary_image}`} target="_blank" rel="noopener noreferrer">
            <img src={`${MUSEUM_IMG_PATH}3/${detail.primary_image}`} alt={detail.title}/>
          </a>
        </section>
        
        <section>

          <div>
            <h2>{detail.title}</h2>
            <input type="checkbox" />
            <h3>{detail.classification} {detail.period || detail.dynasty} {detail.object_date}</h3>
          </div>

          {artists}
          {collections}
          {exhibitions}
          {geographies}
          <p>{detail.medium}</p>

          <p>Credit: {detail.credit_line}</p>
          <p>{detail.museum_location.name}</p>
          <p>Dimensions: {detail.dimensions}</p>
          <p>{detail.description}</p>
        </section>

      </section>
    )
  }
}
 
export default ObjectDetail;