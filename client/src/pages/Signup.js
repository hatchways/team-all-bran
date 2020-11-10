import React, { useState } from 'react'

const Signup = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const updateFirstName = (e) => {
    const firstName = e.target.value
    setFirstName(firstName)
  }

  const updateLastName = (e) => {
    const lastName = e.target.value
    setLastName(lastName)
  }

  const updateEmail = (e) => {
    const email = e.target.value
    setEmail(email)
  }

  const updatePassword = (e) => {
    const password = e.target.value
    setPassword(password)
  }

  const signUp = (e) => {
    e.preventDefault()
  }
  return (
    <div>
      <form onSubmit={signUp}>
        <input type="text" name="firstName" placeholder="First name" value={firstName} onChange={updateFirstName} />
        <input type="text" name="lastName" placeholder="Last name" value={lastName} onChange={updateLastName} />
        <input type="text" name="email" placeholder="E-mail" value={email} onChange={updateEmail} />
        <input type="text" name="password" placeholder="Password" value={password} onChange={updatePassword} />
        <button>Submit</button>
      </form>
    </div>
  )
}

export default Signup
