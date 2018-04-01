import React, { Component } from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import { pickProps } from '../../helpers';

import Browse from './Browse';
import Search from './Search';
import Favorites from './Favorites';
import Logout from './Logout';
import Results from './Results';
import PageHeader from '../PageHeader';

class Home extends Component {
  state = { redirect: '' };

  toggleRedirect = redirect => this.setState({ redirect });

  render() { 
    if (this.state.redirect) {
      this.props.history.push("/")
      return <Redirect to={`/${this.state.redirect}`}/>;
    };

    if (!this.props.currentUser) return <Redirect to='/login' />;

    return (
      <section>
        <PageHeader>
          <Logout {...pickProps(this.props, 'logOut', 'currentUser')} />
          <nav>
            <Favorites {...pickProps(this.props, 'getFavorites')} />
            <Browse {...pickProps(this.props, 'collections', 'setObjects')} />
            <Search {...pickProps(this.props, 'setObjects')} />
          </nav>
        </PageHeader>
        {this.props.objects.length > 0 && <Results {...pickProps(this.props, 'objects', 'appendObjects')} />}
      </section>
    )
  }
}
 
export default withRouter(Home);