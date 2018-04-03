import React, { Component } from 'react';
import MasonryInfiniteScroller from 'react-masonry-infinite';
import { pickProps } from '../../helpers';

import ResultCard from './ResultCard';

class Results extends Component {

  render() {
    return (
      // <section className="results-container">
      //   {this.props.children}
      // </section>

      <MasonryInfiniteScroller
        className="results-container"
        hasMore={true}
        loadMore={this.props.appendObjects}
        sizes={[{columns: 5, gutter: 20}]}
        pack={true}
      >
        {this.props.children}
      </MasonryInfiniteScroller>
    )
  }
}

export default Results;