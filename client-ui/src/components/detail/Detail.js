import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

class Detail extends Component {
  state = { redirect: '' };

  componentDidUpdate() { window.scrollTo(0, 0) };

  toggleRedirect = route => this.setState({redirect: route});

  render() {
    if (this.state.redirect) return <Redirect to={`/${this.state.redirect}`}/>;

    return (
     <section>detail</section>
    )
  }
}
 
export default Detail;