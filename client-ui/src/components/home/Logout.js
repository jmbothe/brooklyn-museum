import React from 'react';

const Logout = ({ currentUser, logOut }) =>
  <section>
    <span>
      Logged in as {currentUser.fullName}
    </span>
    <button onClick={logOut}>
      log out
    </button>
  </section>

export default Logout;