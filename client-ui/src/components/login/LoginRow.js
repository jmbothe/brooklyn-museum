import React from 'react';

const LoginRow = ({ type, name, onChange, placeholder, defaultValue, minlength, user }) =>
  <div>
    <label htmlFor={name}>{name[0].toUpperCase() + name.substring(1)}</label>
    <input type={type} id={name} name={name} placeholder={placeholder} value={user[name]} defaultValue={defaultValue} onChange={onChange} minLength={minlength} required />
  </div>
 
export default LoginRow;