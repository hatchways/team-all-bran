import React, { useState } from 'react'

const Signup = () => {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const { firstName, lastName, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    // login(email, password);
  };

  const passwordIsValid = () => {
    if (password.length >= 6) {
      return true
    } else {
      return false
    }
  }

  const areAllFieldsCompleted = () => {
    if (firstName.length === 0 || firstName.length === 0 || firstName.length === 0 || firstName.length === 0) {
      return false
    } else {
      return true
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" name="firstName" placeholder="First name" value={firstName} onChange={onChange} />
        <input type="text" name="lastName" placeholder="Last name" value={lastName} onChange={onChange} />
        <input type="text" name="email" placeholder="E-mail" value={email} onChange={onChange} />
        <input type="text" name="password" placeholder="Password" value={password} onChange={onChange} />
        <button>Submit</button>
      </form>
    </div>
  )
}

export default Signup
