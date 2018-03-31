import React, { Component } from 'react';
import {Redirect, withRouter} from 'react-router-dom';

// import Results from './Results';
import PageWrapper from '../pageWrapper/PageWrapper';

class Home extends Component {
  state = { redirect: '' };

  toggleRedirect = route => this.setState({ redirect: route });

  render() { 
    if (this.state.redirect) {
      this.props.history.push("/")
      return <Redirect to={`/${this.state.redirect}`}/>;
    };

    if (!this.props.currentUser) this.toggleRedirect('login');

    return (
      <PageWrapper
        {...this.props}
      >

      </PageWrapper>
    )
  }
}
 
export default withRouter(Home);