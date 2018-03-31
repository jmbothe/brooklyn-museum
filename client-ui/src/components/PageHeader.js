import React, { Component } from 'react';

class PageHeader extends Component {
  render() { 
    return (
      <header>
        <section>
          <h1>Brooklyn Museum</h1>
          <h2>Collections Explorer</h2>
          <Logout />
        </section>
        <nav>
          <Browse />
          <Search />
        </nav>
      </header>
    )
  }
}
 
export default PageHeader;