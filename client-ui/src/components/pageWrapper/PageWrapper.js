import React, { Component, Fragment } from 'react';

import PageHeader from './PageHeader';

class PageWrapper extends Component {
  render() { 
    return (
      <Fragment>
        {this.props.children}
      </Fragment>
    )
  }
}
 
export default PageWrapper;