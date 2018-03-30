import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

import PageWrapper from '../PageWrapper';
import ResultCard from './ResultCard';

class Results extends Component {
  state = {
    redirect: '',
  }

  componentDidUpdate() {
    window.scrollTo(0, 0)
  }

  toggleRedirect = route => this.setState({redirect: route});

  decrementPage = () =>
    this.props.getObjects(this.props.queryString, this.props.page - 1);

  incrementPage = () =>
    this.props.getObjects(this.props.queryString, this.props.page + 1);

  render() {
    if (this.state.redirect) return <Redirect to={`/${this.state.redirect}`}/>;

    const cards = this.props.objects.map((item, index) => {
      return (
        <ResultCard
          key={index}
          setDetail={this.props.setDetail}
          item={item}
          imgUrl={`${item.PrimaryImage.Raw}?width=300`}
        />
      );
    })

    return (
      <PageWrapper
        toggleRedirect={this.toggleRedirect}
        currentUser={this.props.currentUser}
        logOut={this.props.logOut}
      >
        <section className="results-container">
          <header>
            <button className="prev-button" onClick={this.decrementPage} disabled={!this.props.prevPage}>
            {`<`}
            </button>
            <button className="next-button"onClick={this.incrementPage} disabled={!this.props.nextPage}>
            {`>`}
            </button>
          </header>
          <section className="cards-container">
            {cards}
          </section>
          <footer>
            <button className="prev-button" onClick={this.decrementPage} disabled={!this.props.prevPage}>
            {`<`}
            </button>
            <button className="next-button"onClick={this.incrementPage} disabled={!this.props.nextPage}>
            {`>`}
            </button>
          </footer>
        </section>
      </PageWrapper>
    )
  }
}
 
export default Results;