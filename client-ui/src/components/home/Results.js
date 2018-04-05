import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import InfiniteScroll from './InfiniteScroll';
import { pickProps } from '../../helpers';

import ResultCard from './ResultCard';

class Results extends Component {
  state = { emptySearch: false }

  componentDidUpdate(prevProps) {
    if (
      this.props.objects.length == 0
      && prevProps.objects.length == 0
      && !this.state.emptySearch
    ) {
      this.setState({emptySearch: true});
      
    } else if (this.state.emptySearch && this.props.objects.length > 0) {
      this.setState({emptySearch: false});
    }
  }

  render() {
    if (this.state.emptySearch) return <div className="no-results">Query returned no results :( Please try again.</div>
    if (this.props.objects.length == 0) return <div className="results-container-loading"></div>;

    const loader = <div className="loader"></div>;

    return (
      <Fragment>
        <p>{this.props.displayString}</p>

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
      </Fragment>
    )
  }
}

export default withRouter(Results);