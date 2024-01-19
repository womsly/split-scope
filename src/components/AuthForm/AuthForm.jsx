import React, { useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { toast } from 'react-hot-toast'
import PropTypes from 'prop-types'
import { auth } from "../../firebase";

function AuthForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accountToken, setAccountToken] = useState("");
  const isCreateUser = props.createNewUser;

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        appConsole.log(userCredential)
      })
  }

  const handleRegister = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match")
    }
    else if (accountToken !== import.meta.env.VITE_APP_USER_TOKEN) {
      toast.error("Incorrect Account Token")
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          appConsole.log(userCredential)
        })
    }
  }

  useEffect (() => {

  }, [props.createNewUser])

  if (isCreateUser) {
    return (
      <div>
        <form onSubmit={(e) => handleRegister(e)}>
          <input 
            type="email" 
            placeholder='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
          <input 
            type='password' 
            placeholder='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}/>
          <input 
            type='password' 
            placeholder='confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}/>
          <input 
            type='text' 
            placeholder='access token'
            value={accountToken}
            onChange={(e) => setAccountToken(e.target.value)}/>
  
            <button type="submit">Create Account</button>
        </form>
      </div>
    )
  } else {
    return (
      <div>
        <form onSubmit={(e) => handleLogin(e)}>
          <input 
            type="email" 
            placeholder='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
          <input 
            type='password' 
            placeholder='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}/>
  
            <button type="submit">Log In</button>
        </form>
      </div>
    )
  }
  
}

export default AuthForm

AuthForm.propTypes = {
  createNewUser: PropTypes.bool
}