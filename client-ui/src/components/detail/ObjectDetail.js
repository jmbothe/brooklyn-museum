import React, { Component } from 'react';

import { MUSEUM_IMG_PATH } from '../../apis';

class ObjectDetail extends Component {
  render() { 
    const detail = this.props.detail;
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
            {/* {button} */}
          </div>
          <h3>{detail.classification}</h3>
          {detail.artists.map(artist => <p>{artist.name}: {artist.dates}</p>)}
          {detail.collections.map(collection => <p>{collection.name}</p>)}
          {detail.exhibitions.map(exhibition => <p>{exhibition.title}</p>)}
          {detail.geographical_locations.map(location => <p>{location.type}: {location.name}</p>)}
          <p>{detail.period || detail.dynasty} {detail.object_date}</p>
          <p>{detail.medium}</p>
          <p>Dimensions: {detail.dimensions}</p>
          <p>{detail.description}</p>
          <p>Credit: {detail.credit_line}</p>
          {detail.museum_location.name}
        </section>

      </section>
    )
  }
}
 
export default ObjectDetail;