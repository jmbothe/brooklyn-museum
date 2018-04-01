import React, { Component } from 'react';
import MasonryInfiniteScroller from 'react-masonry-infinite';

import ResultCard from './ResultCard';

import { MUSEUM_IMG_PATH } from '../../apis';

class Results extends Component {
  state = {
    hasMore: true,
  }

  render() {
    const loader = <div className="loader">Loading ...</div>;

    // const cards = this.props.objects.map((object, index) =>
    // <div className="result-card">
    //   <img
    //     key={object.id}
    //     src={`${MUSEUM_IMG_PATH}1/${object.primary_image}`}
    //     alt={object.title}
    //     className="result-card"
    //   />
    // </div>
    // );

    return (
      <MasonryInfiniteScroller
        hasMore={true}
        loadMore={this.props.appendObjects}
        sizes={[{ columns: 5, gutter: 20 }]}
        loader={loader}
        pack={true}
      >
        {
          this.props.objects.map((object, index) =>
            <img
              key={object.id}
              src={`${MUSEUM_IMG_PATH}1/${object.primary_image}`}
              alt={object.title}
              className="result-card"
            />
          )
        }
      </MasonryInfiniteScroller>
    )
  }
}
 
export default Results;