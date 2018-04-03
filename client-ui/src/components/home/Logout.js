import React from 'react';

const Logout = ({ currentUser, logOut }) =>
  <div>
    <span>
      Logged in as {currentUser.fullName}
    </span>
    <button onClick={logOut}>
      log out
    </button>
  </div>

export default Logout;