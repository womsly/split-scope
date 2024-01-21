import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import classes from './AuthForm.module.scss'
import Button from '../fragments/button/Button';
import { UserAuth } from '../../context/AuthContext';

function AuthForm(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accountToken, setAccountToken] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [teamInvite, setTeamInvite] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isCreateUser, setIsCreateUser] = useState(true);
  const [isNewCompany, setIsNewCompany] = useState(true);
  const { createCompany, createUser, loginUser, user } = UserAuth();
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await loginUser(email, password);
      navigate("/");
    } catch (e) {
      appConsole.log(e.message);
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match")
    }
    else if (accountToken !== import.meta.env.VITE_APP_USER_TOKEN) {
      toast.error("Incorrect Account Token")
    } else if (!agreeTerms) {
      toast.error("Please Accept Terms and Conditions")
    } else {
      try {
        if (isNewCompany) {
          await createCompany(email, password, name, companyName)
        } else {
          createUser(email, password, name, teamInvite)
        }
        
        navigate("/")
      } catch(e) {
        appConsole.log(e.message);
      }
    }
  }

  const handleFormType = (props) => {
    setIsCreateUser(props.createNewUser);
    setIsNewCompany(props.createNewCompanyAcct);
  }


  useEffect (() => {
    handleFormType(props);

  }, [props, isCreateUser, isNewCompany])

  if (isCreateUser) {
    return (
      <div className={classes.form_container}>
        <h2>Sign Up for Swift</h2>      
        <form onSubmit={(e) => handleRegister(e)}>
          
          <div className={classes.grouped_label}>
            <label>Name</label>
            <input
              type="text" 
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)} />
          </div>

          <div className={classes.grouped_label}>
            <label>Email</label>
            <input
              type="email" 
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className={`${classes.grouped_label} ${classes.input_wide}`}>
            <label>Password</label>
            <input
              type='password' 
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}/>
          </div>

          <div className={`${classes.grouped_label} ${classes.input_wide}`}>
            <label>Confirm Password</label>
            <input 
              type='password' 
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}/>
          </div>

          <div className={classes.grouped_label}>
            {isNewCompany ? <label>Company</label> : <label>Team Invite</label>}
            {isNewCompany ? 
              <input 
              type='text' 
              placeholder='Company'
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}/>
              :
              <input 
              type='text' 
              placeholder='Team Invite'
              value={teamInvite}
              onChange={(e) => setTeamInvite(e.target.value)}/>
            }
          </div>

          <div className={classes.grouped_label}>
            <label>Access Token</label>
            <input 
              type='text' 
              placeholder='Access Token'
              value={accountToken}
              onChange={(e) => setAccountToken(e.target.value)}/>
          </div>
          <div className={`${classes.grouped_label} ${classes.input_wide} ${classes.terms_group}`}>
            <input 
              id="terms"
              type='checkbox' 
              value={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.value)}/>
            <label for="terms">Creating an account means you're ok with our terms of service, privacy policy, and default notification settings.</label>
          </div>
  
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
        <h2>Sign In to Swift</h2>
        <form onSubmit={(e) => handleLogin(e)}>
          <div className={`${classes.grouped_label} ${classes.input_wide}`}>
            <label>Email</label>
            <input
              type="email" 
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className={`${classes.grouped_label} ${classes.input_wide}`}>
            <label>Password</label>
            <input
              type='password' 
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}/>
          </div>
  
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