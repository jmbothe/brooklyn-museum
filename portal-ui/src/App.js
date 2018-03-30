import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import apiKeys from './apiKeys';

import Results from './components/results/Results';
import Detail from './components/detail/Detail';
import Login from './components/login/Login';
import Home from './components/home/Home';

import './App.css';
import './components/login/login.css';
import './components/home/home.css';
import './components/results/results.css'
import './components/detail/detail.css'

class App extends Component {
  state = {
    collectionId: 2,
    objects: [],
    detail: {},
    Page: 1,
    queryString: null,
    NextPage: null,
    PrevPage: null,
    currentUser: null,
  }

  logOut = () => {
    let currentUser = {...this.state.currentUser};
    currentUser = null;
    this.setState({currentUser});
  }

  logIn = user => {
    fetch(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${apiKeys.firebase}`, {
      method: 'POST',
      body: JSON.stringify({
        email: user.email,
        password: user.password,
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
    .then(body => fetch(`http://localhost:8080/users/get-user-by-email/${body.email}/`))
    .then(response => {
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(body => this.setState({currentUser: body}))
    .catch(error => {
      alert('There was a problem logging in. Please try again.');
      console.log(error);
    });
  }

  signUp = newUser => {
    fetch(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${apiKeys.firebase}`, {
      method: 'POST',
      body: JSON.stringify({
        email: newUser.email,
        password: newUser.password,
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
      return fetch('http://localhost:8080/users/add-user/', {
        method: 'POST',
        body: JSON.stringify({
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
        }),
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
  
  getObjects = (queryString, Page, callback) => {
    fetch(`http://api.thewalters.org/v1/objects?&apikey=${apiKeys.museum}&${queryString}&page=${Page}&collectionId=2`)
      .then(response => {
        if (response.status < 200 || response.status >= 300) {
          alert('No objects found based on your search criteria. Try broadening your search');
          throw new Error(response.status);
        }
        return response.json();
      })
      .then(body => {
        let objects = [...this.state.objects];
        objects = body.Items;
        this.setState({
          queryString,
          objects,
          Page: body.Page,
          NextPage:body.NextPage,
          PrevPage: body.PrevPage
        }, () => callback ? callback('results') : undefined);
      })
      .catch(error => {
        alert('There was a problem with your request. Please try again later.');
        console.log(error);
      });
  }

  addFavorite = () => {
    const favorite = {userId: this.state.currentUser.userId, itemId: this.state.detail.ObjectID};
    
    fetch('http://localhost:8080/users/add-favorite/', {
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
      let currentUser = {...this.state.currentUser};
      currentUser.favorites.push(body);
      this.setState({currentUser});
    })
    .catch(error => {
      alert('There was a problem adding this item to your favorites. Please try again later.');
      console.log(error)
    });
  }

  removeFavorite = id => {
    fetch(`http://localhost:8080/users/delete-favorite/${id}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.status < 200 || response.status >= 300) {
        alert('There was a problem removing this item to your favorites. Please try again.');
        throw new Error(response.status);
      }
      let currentUser = {...this.state.currentUser};
      currentUser.favorites = currentUser.favorites.filter(item => item.favoriteId != id);
      this.setState({currentUser});
    })
    .catch(error => {
      alert('There was a problem removing this item to your favorites. Please try again later.');
      console.log(error);
    });
  }

  setDetail = detail => this.setState({detail});

  LoginComponent = () =>
    <Login
      currentUser={this.state.currentUser}
      logOut={this.logOut}
      logIn={this.logIn}
      signUp={this.signUp}
    />;

  HomeComponent = () =>
    <Home
      currentUser={this.state.currentUser}
      logOut={this.logOut}
      getObjects={this.getObjects}
    />;

  ResultsComponent = () =>
    <Results
      currentUser={this.state.currentUser}
      logOut={this.logOut}
      objects={this.state.objects}
      setDetail={this.setDetail}
      detail={this.state.detail}
      page={this.state.Page}
      getObjects={this.getObjects}
      queryString={this.state.queryString}
      nextPage={this.state.NextPage}
      prevPage={this.state.PrevPage}
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
          <Route exact path="/results" render={this.ResultsComponent} />
          <Route exact path="/detail" render={this.DetailComponent} />
        </Switch>
      </Router>
    );
  }
}

export default App;
