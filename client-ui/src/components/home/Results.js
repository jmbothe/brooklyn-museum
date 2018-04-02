import React, { Component } from 'react';
import { pickProps } from '../../helpers';

import ResultCard from './ResultCard';

class Results extends Component {

  render() {
    const cards = this.props.objects.map(object =>
      object.primary_image
      ? <ResultCard key={object.id} object={object} {...pickProps(this.props, 'objects', 'setDetail')}/>
      : null
    )

    return (
      <section className="results-container">
        {cards}
      </section>
    )
  }
}

export default Results;