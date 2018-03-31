import React from 'react';
import { pickProps } from '../../helpers';

const PageHeader = (props) => {
  return (
    <header>
      <h1>Brooklyn Museum</h1>
      <h2>Collections Explorer</h2>
      {props.children}
    </header>
  )
}

export default PageHeader;