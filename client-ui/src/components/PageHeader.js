import React from 'react';

const PageHeader = ({ children }) => 
  <header>
    <div>
      <h1>Brooklyn Museum</h1>
      <h2>Collections Explorer</h2>
    </div>
    {children}
  </header>

export default PageHeader;