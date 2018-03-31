import React from 'react';

const Logout = (props) => {
  return (
    <section>
      <span>
        Logged in as {props.currentUser.fullName}
      </span>
      <button onClick={props.logOut}>
        log out
      </button>
    </section>
  )
}
 
export default Logout;