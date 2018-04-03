import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

import apis from '../../apis';

import './detail.css';

class ObjectDetail extends Component {
  state = {
    recommendations: []
  }

  componentDidMount() {
    fetch(`${apis.USERS_ENDPOINT}get-recommendations/${this.props.detail.id}/`)
      .then(response => { 
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then(recIds => {
        const recPromises = recIds.map(id => {
          return fetch(`${apis.MUSEUM_ENDPOINT}object/${id}`,{
            headers: { 'api_key': apis.MUSEUM_KEY }
          }).then(response => {
            if (response.status < 200 || response.status >= 300) {
              throw new Error(response.status);
            }
            return response.json();
          })
        })
    
        Promise.all(recPromises).then(bodies => {
          const recommendations = bodies.map(body => body.data);
          this.setState({ recommendations })
        })
      })
      .catch(error => {
        alert('There was a problem with your request. Please try again later.');
        console.log(error);
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.detail != this.props.detail) {
      fetch(`${apis.USERS_ENDPOINT}get-recommendations/${this.props.detail.id}/`)
        .then(response => { 
          if (response.status < 200 || response.status >= 300) {
            throw new Error(response.status);
          }
          return response.json();
        })
        .then(recIds => {
          const recPromises = recIds.map(id => {
            return fetch(`${apis.MUSEUM_ENDPOINT}object/${id}`,{
              headers: { 'api_key': apis.MUSEUM_KEY }
            }).then(response => {
              if (response.status < 200 || response.status >= 300) {
                throw new Error(response.status);
              }
              return response.json();
            })
          })
      
          Promise.all(recPromises).then(bodies => {
            const recommendations = bodies.map(body => body.data);
            this.setState({ recommendations })
          })
        })
        .catch(error => {
          alert('There was a problem with your request. Please try again later.');
          console.log(error);
        });
      }
  }

  handleChange = (relRef) => {
    this.props.setObjects(`${relRef}&limit=30`);
  }

  handleSelect = (e) => {
    const id = this.props.detail.id;

    e.target.checked
      ? this.props.addFavorite(id)
      : this.props.removeFavorite(id)
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

      const recommendations = this.state.recommendations.length > 0 && this.props.currentUser.favorites.some(fav => fav.objectId == this.props.detail.id)
        ? <ul>
            <li>Users who liked this also liked:</li>
            {
              this.state.recommendations.map(recommendation =>
                <li
                    onClick={() => this.props.setDetail(recommendation)}
                  >
                    {recommendation.title}
                </li>
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
              <p>{detail.medium}</p>

              <p>Credit: {detail.credit_line}</p>
              <p>{detail.museum_location.name}</p>
              <p>Dimensions: {detail.dimensions}</p>
            </div>

            <div>
              <input
                type="checkbox"
                onChange={this.handleSelect}
                checked={this.props.currentUser.favorites.some(fav => fav.objectId == detail.id)}
              />

            {recommendations}
            </div>

          </div>
          <p>{detail.description}</p>
        </section>

      </section>
    )
  }
}
 
export default ObjectDetail;