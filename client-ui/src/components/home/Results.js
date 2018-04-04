import React, { Component } from 'react';
// import MasonryInfiniteScroller from 'react-masonry-infinite';
import InfiniteScroll from 'react-infinite-scroller';
import { pickProps } from '../../helpers';

import ResultCard from './ResultCard';

class Results extends Component {
  render() {
    const loader = <div className="loader">Loading ...</div>;

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

export default Results;