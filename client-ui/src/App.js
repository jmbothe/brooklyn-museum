import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import { pickProps } from './helpers';
import apis from './apis';
import Detail from './components/detail/Detail';
import Login from './components/login/Login';
import Home from './components/home/Home';

import './App.css';
import './components/login/login.css';

class App extends Component {
  state = {
    objectsLength: null,
    collections: [],
    objects: [],
    objectsDispay: [],
    detail: {},
    relRef: '?collection_id=23&limit=30',
    offset: 0,
    currentUser: null,
  }

  // a couple of little functions hiding out amongst all this monoliths
  logOut = () => this.setState({ currentUser: null });
  setDetail = detail => this.setState({ detail });

  componentDidMount() {
    const collections = fetch(`${apis.MUSEUM_ENDPOINT}collection/`, {
      headers: {
        'api_key': `${apis.MUSEUM_KEY}`
      }
    })
    .then(response => { 
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(body => {
      this.setState({
        collections: body.data.map(obj => pickProps(obj, 'id', 'name')),
      }, () => this.setObjects('?collection_id=23&limit=30'));
    })
    .catch(error => {
      alert('There was a problem initializing the app. Please try again.');
      console.log(error);
    });
  }

  logIn = user => {
    fetch(`${apis.F_BASE_ENDPOINT}${apis.F_BASE_LOGIN_REF}${apis.F_BASE_KEY}`, {
      method: 'POST',
      body: JSON.stringify({ ...user, returnSecureToken: true }),
      headers: {'Content-Type': 'application/json'},
    })
    .then(response => { 
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(({ email }) => fetch(`${apis.USERS_ENDPOINT}get-user-by-email/${email}/`))
    .then(response => {
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(currentUser => this.setState({ currentUser }))
    .catch(error => {
      alert('There was a problem logging in. Please try again.');
      console.log(error);
    });
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
    .then(response => { 
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(body => {
      return fetch(`${apis.USERS_ENDPOINT}add-user/`, {
        method: 'POST',
        body: JSON.stringify({ ...pickProps(newUser, 'fullName', 'email') }),
        headers: {'Content-Type': 'application/json'},
      })
    })
    .then(response => {
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(body => {
      body.favorites = [];
      this.setState({currentUser: body});
    })
    .catch(error => {
      alert('There was a problem signing you up. Please try again later.');
      console.log(error);
    })
  }
  
  getObjects = () => {
    return fetch(`${apis.MUSEUM_ENDPOINT}object/${this.state.relRef}&offset=${this.state.offset}&has_images=1`,{
      headers: { 'api_key': apis.MUSEUM_KEY }
    })
    .then(response => {
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(body => body.data)
    .catch(error => {
      alert('There was a problem with your request. Please try again later.');
      console.log(error);
    });
  }

  setObjects = (relRef, callback) => {
    fetch(`${apis.MUSEUM_ENDPOINT}object/${relRef}&total_count_only=1&has_images=1`,{
      headers: { 'api_key': apis.MUSEUM_KEY }
    })
    .then(response => {
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(body => {
      this.setState({ objectsLength: body.data, offset: 0, relRef, objects: [] }, () => {
        this.getObjects().then(objects => {
          this.setState({ objects, offset: this.state.offset + 30 }, () =>{
            callback && callback();
          });
        })
      })
    })
    .catch(error => {
      alert('There was a problem with your request. Please try again later.');
      console.log(error);
    });
  }

  appendObjects = () => {
    this.getObjects().then(body => {
      let offset = this.state.offset;
      offset += 30;
      const objects = [...this.state.objects, ...body];
      this.setState({ objects, offset });
    })
    .catch(error => {
      alert('There was a problem with your request. Please try again later.');
      console.log(error);
    });
  }

  getFavorites = (callback) => {
    const favorites = this.state.currentUser.favorites.map(favorite => {
      return fetch(`${apis.MUSEUM_ENDPOINT}object/${favorite.objectId}`,{
        headers: { 'api_key': apis.MUSEUM_KEY }
      })
      .then(response => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .catch(error => {
        alert('There was a problem with your request. Please try again later.');
        console.log(error);
      });
    });

    Promise.all(favorites).then(bodies => {
      const objects = bodies.map(body => body.data);
      this.setState({ objects }, callback && callback());
    })
    .catch(error => {
      alert('There was a problem with your request. Please try again later.');
      console.log(error);
    });
  }

  addFavorite = (objectId) => {
    const favorite = { userId: this.state.currentUser.userId, objectId };
    
    fetch(`${apis.USERS_ENDPOINT}add-favorite/`, {
      method: 'POST',
      body: JSON.stringify(favorite),
      headers: {'Content-Type': 'application/json'},
    })
    .then(response => {
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(body => {
      const currentUser = { ...this.state.currentUser };
      currentUser.favorites.push(body);
      this.setState({ currentUser });
    })
    .catch(error => {
      alert('There was a problem adding this item to your favorites. Please try again later.');
      console.log(error)
    });
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
        const objects = [...this.state.objects]
        favorites.splice(favorites.indexOf(favorites.find(fav => fav.favoriteId == favoriteId)), 1);
        objects.splice(objects.indexOf(objects.find(obj => obj.id == objectId)), 1);
        this.setState({ currentUser, objects });
      })
      .catch(error => {
        alert('There was a problem removing this item to your favorites. Please try again later.');
        console.log(error);
      });
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
        'removeFavorite'
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
        'setDetail'
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
