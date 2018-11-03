import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import { pickProps, handleNon200Response, handlePromiseFailure } from './helpers';
import apis from './apis';
import Detail from './components/detail/Detail';
import Home from './components/home/Home';

import './App.css';

class App extends Component {
  state = {
    displayString: '',
    hasMore: true,
    objectsLength: null,
    collections: [],
    objects: [],
    detail: {},
    offset: 0,
    relRef: null,
    favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
  }

  // Get basic data on museum collections and set default browse results
  componentDidMount() {
    fetch(`${apis.MUSEUM_ENDPOINT}collection/`, {
      headers: {
        'api_key': `${apis.MUSEUM_KEY}`
      }
    })
    .then(handleNon200Response)
    .then(body => {
      this.setState({
        collections: body.data.map(obj => pickProps(obj, 'id', 'name')),
      }, () => this.setObjects('', '?collection_id=8&limit=15'));
    })
    .catch(handlePromiseFailure);
  }

  // basic object query against museum API
  getObjects = (relRef, offset) => {
    return fetch(`${apis.MUSEUM_ENDPOINT}object/${relRef}&offset=${offset}&has_images=1`,{
      headers: { 'api_key': apis.MUSEUM_KEY }
    })
    .then(handleNon200Response)
    .then(body => body.data)
    .catch(handlePromiseFailure);
  }

  // Respond to user search or browse
  setObjects = (displayString, relRef, callback) => {
    this.setState({ objects: [] }, () => {
      fetch(`${apis.MUSEUM_ENDPOINT}object/${relRef}&total_count_only=1&has_images=1`,{
        headers: { 'api_key': apis.MUSEUM_KEY }
      })
      .then(handleNon200Response)
      .then(({ data: objectsLength }) => {
        this.getObjects(relRef, 0)
          .then(objects => {
            this.setState({
              displayString,
              relRef,
              objectsLength,
              objects,
              offset: 15,
              hasMore: objectsLength > 15,
            }, () => {
              callback && callback();
            });
          })
      })
      .catch(handlePromiseFailure);
    })
  }

  // respond to user scrolling through search/browse results
  appendObjects = () => {
    this.getObjects(this.state.relRef, this.state.offset)
      .then(body => {
        let offset = this.state.offset;
        offset += 15;
        const objects = [...this.state.objects, ...body];
        this.setState({ objects, offset, hasMore: this.state.objectsLength > offset });
      })
      .catch(handlePromiseFailure);
  }

  // deal with museum API not supporting an array of object IDs in path
  getFavorites = (callback) => {
    this.setState({ objects: [] }, () => {
      const favorites = this.state.favorites.map(favorite => {
        return fetch(`${apis.MUSEUM_ENDPOINT}object/${favorite}`,{
          headers: { 'api_key': apis.MUSEUM_KEY }
        })
        .then(handleNon200Response)
      });

      Promise.all(favorites)
        .then(bodies => {
          const objects = bodies.map(body => body.data);
          this.setState({ displayString: 'Displaying your favorites', objects, hasMore: false }, callback && callback());
        })
        .catch(handlePromiseFailure);
      })
  }

  // respond to user marking object as favorite
  addFavorite = (objectId) => {
    this.setState(prevState => {
      localStorage.setItem('favorites', JSON.stringify([...prevState.favorites, objectId]));

      return {
        ...prevState,
        favorites: [...prevState.favorites, objectId]
      }
    })
  }

  // respond to user removing favorite mark from object
  removeFavorite = objectId => {
    this.setState(prevState => {
      const favorites = prevState.favorites.filter(f => f !== objectId);
      localStorage.setItem('favorites', JSON.stringify(favorites));

      return {
        ...prevState,
        favorites
      }
    })
  }

  // respond to user clicking through from results to object detail view
  setDetail = detail => {
    this.setState({ detail });
  }

  HomeComponent = () =>
    <Home
      {...pickProps({ ...this.state, ...this },
        'setDetail',
        'collections',
        'setObjects',
        'appendObjects',
        'getFavorites',
        'objects',
        'addFavorite',
        'removeFavorite',
        'hasMore',
        'displayString',
        'favorites'
      )}
    />;

  DetailComponent = () =>
    <Detail
      {...pickProps({ ...this.state, ...this },
        'detail',
        'removeFavorite',
        'addFavorite',
        'setObjects',
        'collections',
        'getFavorites',
        'setDetail',
        'favorites'
      )}
    />;

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={this.HomeComponent}/>
          <Route exact path="/detail" render={this.DetailComponent} />
        </Switch>
      </Router>
    );
  }
}

export default App;
