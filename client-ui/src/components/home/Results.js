import React, { Component } from 'react';
import { pickProps } from '../../helpers';

import ResultCard from './ResultCard';

class Results extends Component {

  render() {
    return (
      <section className="results-container">
        {this.props.children}
      </section>
    )
  }
}

export default Results;