import React, { Component, Fragment } from 'react';
import {withRouter} from 'react-router-dom';
import { pickProps } from '../../helpers';

import Browse from './Browse';
import Search from './Search';
import Favorites from './Favorites';
import Logout from './Logout';
import Results from './Results';
import PageHeader from '../PageHeader';


import './home.css';

class Home extends Component {
  render() { 
    return (
      <Fragment>
        <PageHeader>
          <Logout {...pickProps(this.props, 'logOut', 'currentUser')} />
          <nav>
            <Favorites {...pickProps(this.props, 'getFavorites')} />
            <Browse {...pickProps({...this.props, ...this}, 'collections', 'setObjects', 'toggleRedirect')} />
            <Search {...pickProps(this.props, 'setObjects')} />
          </nav>
        </PageHeader>
        <Results {...pickProps({...this, ...this.props}, 'objects', 'appendObjects', 'setDetail')} />
      </ Fragment>
    )
  }
}
 
export default withRouter(Home);