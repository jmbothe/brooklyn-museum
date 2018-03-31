import React, { Component } from 'react';
import {Redirect, withRouter} from 'react-router-dom';

import Browse from './Browse';
import Search from './Search';
// import Results from './Results';
import Favorites from './Favorites';

class Home extends Component {
  state = { redirect: '' };

  toggleRedirect = route => this.setState({ redirect: route });

  render() { 
    if (this.state.redirect) {
      this.props.history.push("/")
      return <Redirect to={`/${this.state.redirect}`}/>;
    };

    if (!this.props.currentUser) this.toggleRedirect('login');

    return (
      <div>
        <header>
          <h1>Brooklyn Museum</h1>
          <h2>Collections Explorer</h2>
          <nav>
            <Favorites />
            <Browse collections={this.props.collections}/>
            <Search />
          </nav>
        </header>
        {/* <Results /> */}
      </div>
    )
  }
}
 
export default withRouter(Home);