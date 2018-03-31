import React from 'react';

const LoginRow = ({ type, name, onChange }) => {
  return (
    <div>
      <label htmlFor={name}>{name[0].toUpperCase() + name.substring(1)}</label>
      <input type={type} id={name} name={name} onChange={onChange} required />
    </div>
  )
}
 
export default LoginRow;