import React from 'react';

const LoginHeader = ({ loginView, toggleLoginView }) =>
  <header>
    <button
      className={loginView ? '' : 'tab-fade' }
      onClick={() => toggleLoginView(true)}
    >
      Log in
    </button>
    <button
      className={loginView ? 'tab-fade' : '' }
      onClick={() => toggleLoginView(false)}
    >
      Sign up
    </button>
  </header>
 
export default LoginHeader;