import React, { useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { toast } from 'react-hot-toast'
import PropTypes from 'prop-types'
import { auth } from "../../firebase";
import classes from './AuthForm.module.scss'
import Button from '../fragments/button/Button';
import { companyAccount, userAccount } from '../../models/auth';

function AuthForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accountToken, setAccountToken] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [teamInvite, setTeamInvite] = useState("");
  const isCreateUser = props.createNewUser;
  const isNewCompany = props.createNewCompanyAcct;

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

  }, [props.createNewUser, props.createNewCompanyAcct])

  if (isCreateUser) {
    return (
      <div className={classes.form_container}>
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
          {isNewCompany ? 
            <input 
              type='text' 
              placeholder='company name'
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}/>
          :
            <input 
              type='text' 
              placeholder='team invite'
              value={teamInvite}
              onChange={(e) => setTeamInvite(e.target.value)}/>
          }
  
            <Button 
              type="submit" 
              text="Create Account"
              newClass={classes.form_button}/>
        </form>
      </div>
    )
  } else {
    return (
      <div className={classes.form_container}>
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
  
          <Button 
              type="submit" 
              text="Log In"
              newClass={classes.form_button}/>
        </form>
      </div>
    )
  }
  
}

export default AuthForm

AuthForm.propTypes = {
  createNewUser: PropTypes.bool,
  createNewCompanyAcct: PropTypes.bool
}