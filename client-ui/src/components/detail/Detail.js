import React, { Component, Fragment} from 'react';
import { Redirect } from 'react-router-dom';
import { pickProps } from '../../helpers';

import PageHeader from '../PageHeader'
import Browse from '../home/Browse';
import Search from '../home/Search';
import Favorites from '../home/Favorites';
import Logout from '../home/Logout';
import ObjectDetail from './ObjectDetail'

import './detail.css'

class Detail extends Component {
  state = { redirect: false };

  toggleRedirect = () => this.setState({ redirect: true })

  render() {
    if (this.state.redirect) return <Redirect to="/" />

    return (
      <Fragment>
        <PageHeader>
          <Logout {...pickProps(this.props, 'logOut', 'currentUser')} />
          <nav>
            <Favorites redirect {...pickProps({...this.props, ...this}, 'getFavorites', 'toggleRedirect')} />
            <Browse redirect {...pickProps({...this.props, ...this}, 'collections', 'setObjects', 'toggleRedirect')} />
            <Search redirect {...pickProps({...this.props, ...this}, 'setObjects', 'toggleRedirect')} />
          </nav>
        </PageHeader>
        <ObjectDetail {...pickProps(this.props, 'setObjects', 'detail', 'removeFavorite', 'addFavorite')} />
      </ Fragment>
    )
  }
}
 
export default Detail;