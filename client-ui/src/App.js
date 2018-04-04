import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import { pickProps, handleNon200Response, handlePromiseFailure } from './helpers';
import apis from './apis';
import Detail from './components/detail/Detail';
import Login from './components/login/Login';
import Home from './components/home/Home';

import './App.css';
import './components/login/login.css';

class App extends Component {
  state = {
    hasMore: true,
    objectsLength: null,
    collections: [],
    objects: [],
    detail: {},
    recommendations: [],
    offset: 0,
    relRef: null,
    currentUser: null,
  }

  logOut = () => this.setState({ currentUser: null });

  componentDidMount() {
    const collections = fetch(`${apis.MUSEUM_ENDPOINT}collection/`, {
      headers: {
        'api_key': `${apis.MUSEUM_KEY}`
      }
    })
    .then(handleNon200Response)
    .then(body => {
      this.setState({
        collections: body.data.map(obj => pickProps(obj, 'id', 'name')),
      }, () => this.setObjects('?collection_id=10&limit=30'));
    })
    .catch(handlePromiseFailure);
  }

  logIn = user => {
    fetch(`${apis.F_BASE_ENDPOINT}${apis.F_BASE_LOGIN_REF}${apis.F_BASE_KEY}`, {
      method: 'POST',
      body: JSON.stringify({ ...user, returnSecureToken: true }),
      headers: {'Content-Type': 'application/json'},
    })
    .then(handleNon200Response)
    .then(({ email }) => fetch(`${apis.USERS_ENDPOINT}get-user-by-email/${email}/`))
    .then(handleNon200Response)
    .then(currentUser => this.setState({ currentUser }))
    .catch(handlePromiseFailure);
  }

  signUp = newUser => {
    fetch(`${apis.F_BASE_ENDPOINT}${apis.F_BASE_SIGNUP_REF}${apis.F_BASE_KEY}`, {
      method: 'POST',
      body: JSON.stringify({
        ...pickProps(newUser, 'email', 'password'),
        returnSecureToken: true,
      }),
      headers: {'Content-Type': 'application/json'},
    })
    .then(handleNon200Response)
    .then(body => {
      return fetch(`${apis.USERS_ENDPOINT}add-user/`, {
        method: 'POST',
        body: JSON.stringify({ ...pickProps(newUser, 'fullName', 'email') }),
        headers: {'Content-Type': 'application/json'},
      })
    })
    .then(handleNon200Response)
    .then(currentUser => {
      currentUser.favorites = [];
      this.setState({ currentUser });
    })
    .catch(handlePromiseFailure)
  }
  
  getObjects = (relRef, offset) => {
    return fetch(`${apis.MUSEUM_ENDPOINT}object/${relRef}&offset=${offset}&has_images=1`,{
      headers: { 'api_key': apis.MUSEUM_KEY }
    })
    .then(handleNon200Response)
    .then(body => body.data)
    .catch(handlePromiseFailure);
  }

  setObjects = (relRef, callback) => {
    fetch(`${apis.MUSEUM_ENDPOINT}object/${relRef}&total_count_only=1&has_images=1`,{
      headers: { 'api_key': apis.MUSEUM_KEY }
    })
    .then(handleNon200Response)
    .then(({ data: objectsLength }) => {
      this.getObjects(relRef, 0)
        .then(objects => {
          this.setState({
            relRef,
            objectsLength,
            objects,
            offset: 30,
            hasMore: objectsLength > 30,
          }, () => {
            callback && callback();
          });
        })
    })
    .catch(handlePromiseFailure);
  }

  appendObjects = () => {
    this.getObjects(this.state.relRef, this.state.offset)
      .then(body => {
        let offset = this.state.offset;
        offset += 30;
        const objects = [...this.state.objects, ...body];
        this.setState({ objects, offset, hasMore: this.state.objectsLength > offset });
      })
      .catch(handlePromiseFailure);
  }

  getFavorites = (callback) => {
    const favorites = this.state.currentUser.favorites.map(favorite => {
      return fetch(`${apis.MUSEUM_ENDPOINT}object/${favorite.objectId}`,{
        headers: { 'api_key': apis.MUSEUM_KEY }
      })
      .then(handleNon200Response)
    });

    Promise.all(favorites)
      .then(bodies => {
        const objects = bodies.map(body => body.data);
        this.setState({ objects, hasMore: false }, callback && callback());
      })
      .catch(handlePromiseFailure);
  }

  addFavorite = (objectId) => {
    const favorite = { userId: this.state.currentUser.userId, objectId };
    
    fetch(`${apis.USERS_ENDPOINT}add-favorite/`, {
      method: 'POST',
      body: JSON.stringify(favorite),
      headers: {'Content-Type': 'application/json'},
    })
    .then(handleNon200Response)
    .then(body => {
      const currentUser = { ...this.state.currentUser };
      currentUser.favorites.push(body);
      this.setState({ currentUser });
    })
    .catch(handlePromiseFailure);
  }

  removeFavorite = objectId => {
    const currentUser = { ...this.state.currentUser };
    const favorites = currentUser.favorites;
    const favoriteId =
      favorites.find(fav => fav.objectId == objectId).favoriteId;

    fetch(`${apis.USERS_ENDPOINT}delete-favorite/${favoriteId}`, { method: 'DELETE' })
      .then(response => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.status);
        }
        favorites.splice(favorites.indexOf(favorites.find(fav => fav.favoriteId == favoriteId)), 1);
        this.setState({ currentUser});
      })
      .catch(handlePromiseFailure);
  }

  setDetail = detail => {
    fetch(`${apis.USERS_ENDPOINT}get-recommendations/${detail.id}/`)
      .then(handleNon200Response)
      .then(recIds => {
        const recPromises = recIds.map(id => {
          return fetch(`${apis.MUSEUM_ENDPOINT}object/${id}`,{
            headers: { 'api_key': apis.MUSEUM_KEY }
          })
          .then(handleNon200Response)
        })
    
        Promise.all(recPromises).then(bodies => {
          const recommendations = bodies.map(body => body.data);
          this.setState({ recommendations, detail })
        })
      })
      .catch(handlePromiseFailure);
  }

  LoginComponent = () =>
    <Login
      {...pickProps({ ...this.state, ...this },
        'currentUser',
        'logIn',
        'signUp'
      )}
    />;

  HomeComponent = () =>
    <Home
      {...pickProps({ ...this.state, ...this },
        'setDetail',
        'collections',
        'currentUser',
        'logOut',
        'setObjects',
        'appendObjects',
        'getFavorites',
        'objects',
        'addFavorite',
        'removeFavorite',
        'hasMore'
      )}
    />;

  DetailComponent = () =>
    <Detail
      {...pickProps({ ...this.state, ...this },
        'detail',
        'currentUser',
        'logOut',
        'removeFavorite',
        'addFavorite',
        'setObjects',
        'collections',
        'getFavorites',
        'setDetail',
        'recommendations'
      )}
    />;

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={this.HomeComponent}/>
          <Route exact path="/login" render={this.LoginComponent}/>
          <Route exact path="/detail" render={this.DetailComponent} />
        </Switch>
      </Router>
    );
  }
}

export default App;
