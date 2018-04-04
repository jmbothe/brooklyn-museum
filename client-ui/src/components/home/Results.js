import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import { pickProps } from '../../helpers';

import ResultCard from './ResultCard';

class Results extends Component {
  render() {
    if (this.props.objects.length == 0) return <div className="results-container-loading"></div>;

    const loader = <div className="loader"></div>;

    return (
      <InfiniteScroll
        pageStart={0}
        hasMore={this.props.hasMore}
        loadMore={this.props.appendObjects}
        loader={loader}
      >
        <div className="results-container">
          {this.props.children}
        </div>
      </InfiniteScroll>
    )
  }
}

export default withRouter(Results);