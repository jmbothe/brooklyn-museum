import React, { Component } from 'react';
import MasonryInfiniteScroller from 'react-masonry-infinite';
import { pickProps } from '../../helpers';

import ResultCard from './ResultCard';

class Results extends Component {
  render() {
    console.log(this.props.hasMore)
    return (
      <MasonryInfiniteScroller
        className="results-container"
        hasMore={this.props.hasMore}
        loadMore={this.props.appendObjects}
        sizes={[{ columns: 5, gutter: 20 }]}
        pack={true}
      >
        {this.props.children}
      </MasonryInfiniteScroller>
    )
  }
}

export default Results;