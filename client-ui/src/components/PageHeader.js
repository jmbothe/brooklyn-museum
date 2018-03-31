import React from 'react';

const PageHeader = ({ children }) => 
  <header>
    <h1>Brooklyn Museum</h1>
    <h2>Collections Explorer</h2>
    {children}
  </header>

export default PageHeader;