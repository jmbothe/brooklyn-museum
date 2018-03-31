import React, { Component } from 'react';

import ResultCard from './ResultCard';

class Results extends Component {
  render() {
    const cards = this.props.objects.map((object, index) => {
      return (
        <ResultCard
          key={index}
          setDetail={this.props.setDetail}
          object={object}
        />
      );
    })

    return (
      <section>
        {cards}
      </section>
    )
  }
}
 
export default Results;