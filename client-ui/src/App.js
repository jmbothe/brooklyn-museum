import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import { pickProps } from './helpers';
import apis from './apis';
import Detail from './components/detail/Detail';
import Login from './components/login/Login';
import Home from './components/home/Home';

import './App.css';
import './components/login/login.css';
import './components/home/home.css';
import './components/detail/detail.css'

class App extends Component {
  state = {
    collections: [],
    objects: [],
    detail: {},
    relRef: null,
    currentUser: {
      fullName: 'Jeff Bothe',
      email: 'jmb@gmail.com',
      favorites: [1,2,3],
    },
  }

  componentDidMount() {
    fetch(`${apis.MUSEUM_ENDPOINT}collection/`, {
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
      this.setState({ collections: body.data.map(obj => pickProps(obj, ['id', 'name'])) });
    })
    .catch(error => {
      alert('There was a problem initializing the app. Please try again.');
      console.log(error);
    });
  }

  logOut = () => {
    let currentUser = { ...this.state.currentUser };
    currentUser = null;
    this.setState({ currentUser });
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
        ...pickProps(newUser, ['email', 'password']),
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
        body: JSON.stringify({ ...pickProps(newUser, ['fullName', 'email']) }),
        headers: {'Content-Type': 'application/json'},
      })
    })
    .then(response => {
      if (response.status < 200 || response.status >= 300) {
        alert('There was a problem signing you up. Please try again later.');
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
  
  getObjects = (relRef) => {
    fetch(`${apis.MUSEUM_ENDPOINT}object/${relRef}`,{
      headers: { 'api_key': apis.MUSEUM_KEY }
    })
    .then(response => {
      if (response.status < 200 || response.status >= 300) {
        alert('No objects found based on your search criteria. Try broadening your search');
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(body => {
      this.setState({ relRef, objects: body.data });
    })
    .catch(error => {
      alert('There was a problem with your request. Please try again later.');
      console.log(error);
    });
  }

  getFavorites = () => {
    const favorites = this.state.currentUser.favorites.map(id => {
      return fetch(`${apis.MUSEUM_ENDPOINT}object/${id}`,{
        headers: { 'api_key': apis.MUSEUM_KEY }
      })
      .then(response => {
        if (response.status < 200 || response.status >= 300) {
          alert('No objects found based on your search criteria. Try broadening your search');
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
      this.setState({ objects });
    })
    .catch(error => {
      alert('There was a problem with your request. Please try again later.');
      console.log(error);
    });
  }

  addFavorite = () => {
    const favorite = { userId: this.state.currentUser.userId, objectId: this.state.detail.id };
    
    fetch(`${apis.USERS_ENDPOINT}add-favorite/`, {
      method: 'POST',
      body: JSON.stringify(favorite),
      headers: {'Content-Type': 'application/json'},
    })
    .then(response => {
      if (response.status < 200 || response.status >= 300) {
        alert('There was a problem adding this item to your favorites. Please try again');
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(body => {
      const favorites = [ ...this.state.currentUser.favorites ];
      favorites.push(body);
      this.setState({ currentUser: { favorites }});
    })
    .catch(error => {
      alert('There was a problem adding this item to your favorites. Please try again later.');
      console.log(error)
    });
  }

  removeFavorite = id => {
    fetch(`${apis.USERS_ENDPOINT}delete-favorite/${id}`, { method: 'DELETE' })
    .then(response => {
      if (response.status < 200 || response.status >= 300) {
        alert('There was a problem removing this item to your favorites. Please try again.');
        throw new Error(response.status);
      }
      const favorites = [ ...this.state.currentUser.favorites ];
      favorites.splice(favorites.indexOf(favorites.find(obj => obj.favoriteId == id)), 0);
      this.setState({ currentUser: { favorites } });
    })
    .catch(error => {
      alert('There was a problem removing this item to your favorites. Please try again later.');
      console.log(error);
    });
  }

  setDetail = detail => this.setState({ detail });

  LoginComponent = () =>
    <Login
      currentUser={this.state.currentUser}
      logOut={this.logOut}
      logIn={this.logIn}
      signUp={this.signUp}
    />;

  HomeComponent = () =>
    <Home
      {...pickProps(this.state, ['collections', 'currentUser'])}
      {...pickProps(this, ['logOut', 'getObjects', 'getFavorites'])}
    />;

  DetailComponent = () =>
    <Detail
      currentUser={this.state.currentUser}
      logOut={this.logOut}
      detail={this.state.detail}
      addFavorite={this.addFavorite}
      removeFavorite={this.removeFavorite}
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
