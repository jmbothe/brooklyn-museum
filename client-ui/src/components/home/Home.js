import React, { Component, Fragment } from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import { pickProps } from '../../helpers';

import Browse from './Browse';
import Search from './Search';
import Favorites from './Favorites';
import Results from './Results';
import ResultCard from './ResultCard';
import PageHeader from '../PageHeader';


import './home.css';

class Home extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const cards = this.props.objects.map(object =>
      object.primary_image
      ? <ResultCard
          key={object.id}
          object={object}
          {...pickProps(this.props,
            'objects',
            'setDetail',
            'addFavorite',
            'removeFavorite',
            'favorites'
          )}
        />
      : null
    )

    return (
      <Fragment>
        <PageHeader>
          <nav>
            <Favorites {...pickProps(this.props, 'getFavorites')} />
            <Browse {...pickProps({...this.props, ...this}, 'collections', 'setObjects', 'toggleRedirect')} />
            <Search {...pickProps(this.props, 'setObjects')} />
          </nav>
        </PageHeader>
        <Results {...pickProps({...this, ...this.props}, 'displayString', 'appendObjects', 'hasMore', 'objects')} >
          {cards}
        </Results>
      </ Fragment>
    )
  }
}
 
export default withRouter(Home);