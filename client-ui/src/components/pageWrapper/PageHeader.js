import React, { Component } from 'react';
import { pickProps } from '../../helpers';

import Browse from './Browse';
import Search from './Search';
import Favorites from './Favorites';
import Logout from './Logout';

class PageHeader extends Component {
  render() { 
    return (
      <header>
          <h1>Brooklyn Museum</h1>
          <h2>Collections Explorer</h2>
          <Logout
            {...pickProps(this.props, ['logOut', 'currentUser'])}
          />
          <nav>
            <Favorites
              {...pickProps(this.props, ['getFavorites'])}
            />
            <Browse
              {...pickProps(this.props, ['collections', 'getObjects'])}
            />
            <Search
              {...pickProps(this.props, ['getObjects'])}
            />
          </nav>
        </header>
    )
  }
}
 
export default PageHeader;