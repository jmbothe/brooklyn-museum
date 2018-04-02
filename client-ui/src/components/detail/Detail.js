import React, { Component, Fragment} from 'react';
import {Redirect} from 'react-router-dom';
import { pickProps } from '../../helpers';


import PageHeader from '../PageHeader'
import Browse from '../home/Browse';
import Search from '../home/Search';
import Favorites from '../home/Favorites';
import Logout from '../home/Logout';
import ObjectDetail from './ObjectDetail'

import './detail.css'

class Detail extends Component {
  render() {
    return (
      <Fragment>
      <PageHeader>
        <Logout {...pickProps(this.props, 'logOut', 'currentUser')} />
       
      </PageHeader>
      <ObjectDetail {...pickProps(this.props, 'setObjects', 'detail', 'removeFavorite', 'addFavorite')} />
    </ Fragment>
    )
  }
}
 
export default Detail;