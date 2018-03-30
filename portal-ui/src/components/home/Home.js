import React, { Component } from 'react';
import {Redirect, withRouter} from 'react-router-dom';

import PageWrapper from '../PageWrapper';
import Browse from './Browse';
import Search from './Search';

class Home extends Component {
  state = {
    redirect: '',
  }

  toggleRedirect = route => this.setState({redirect: route});

  render() { 
    if (this.state.redirect) {
      this.setState({redirect: ''})
      this.props.history.push("/")
      return <Redirect to={`/${this.state.redirect}`}/>;
    };
    if (!this.props.currentUser) return <Redirect to={'/login'}/>;

    return (
      <PageWrapper
        currentUser={this.props.currentUser}
        logOut={this.props.logOut}
        toggleRedirect={this.toggleRedirect}
      >
        <section className="home-container">
          <div className="home-intro">
              <div className="home-text">
              <p>
                In 1911, Henry Walters purchased almost 100 gold artifacts from the Chiriqui region of western Panama, creating a core collection of ancient American art. Now strengthened by long-term loans and generous gifts from private collectors, the Ancient American galleries feature exceptional works of art from Central and South America, including masterpieces from the Mesoamerican Olmec, Aztec, and Maya cultures, as well as the Moche and Inca peoples of eastern South America.
              </p>
              <p>
                The artworks revolve around a core set of themes, including agricultural fertility, the role of the ruler in forging a bond between the natural and supernatural realms, and the practice of shamanism, which included the ritual of uniting with an animal spirit.
              </p>
              <p>
                Most of the objects, made of gold, jade, turquoise, shell, or clay, were found in tombs, intended to equip the deceased for his journey to the next world. The ancient American art galleries include extraordinary sculptures, masks, game objects, figurative and painted vases, as well as gold jewelry and ritual works. The installation is especially strong in objects from Mesoamerica (including present-day Mexico, Guatemala, Belize, and Honduras, the Intermediate Area of Central America and northern Colombia), and the Andean civilizations of Ecuador and Peru. The collection provides a comprehensive overview of the enormous variety of artistic expresssion from these regions.
              </p>
            </div>
            <div className="home-image">
              
            </div>
          </div>
          <section className="browse-search-container">
            <Browse
              getObjects={this.props.getObjects}
              currentUser={this.props.currentUser}
              toggleRedirect={this.toggleRedirect}
            />
            <Search
              toggleRedirect={this.toggleRedirect}
              getObjects={this.props.getObjects}
            />
          </section>
        </section>
      </PageWrapper>
    )
  }
}
 
export default withRouter(Home);