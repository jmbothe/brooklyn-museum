import React, { Component, Fragment } from 'react';

import PageHeader from './PageHeader';

class PageWrapper extends Component {
  render() { 
    return (
      <Fragment>
        <PageHeader
          {...this.props}
        />
        {this.props.children}
      </Fragment>
    )
  }
}
 
export default PageWrapper;