import React, { useState } from 'react';
import Layout from '../../components/layout/LayoutTemplate';
import AuthForm from '../../components/AuthForm/AuthForm';
import classes from './Auth.module.scss';
import hourglass from "../../assets/hourglass.png";


function Auth() {
  const [newUser, setNewUser] = useState(true)
  const [newCompany, setNewCompany] = useState(true)

  const handleUser = (e) => {
    setNewUser(!newUser);
  }

  return (
    <Layout>
      <div className={classes.auth_container}>
        <div className={classes.panel_left}>
          <h1>Discover A True Team Flow State With Swift</h1>
          <div className={classes.img_wrapper}>
            <img src={hourglass} alt="Hour Glass" />
          </div>
        </div>
        <div className={classes.panel_right}>
          {newUser ? <p>Already a member? <span onClick={(e) => handleUser(e)}>Sign In</span></p> : <p>Not a Member? <span onClick={(e) => handleUser(e)}>Create an Account</span></p>}
            
          <div className={classes.form_wrapper}>
            <AuthForm createNewUser={newUser} createNewCompanyAcct={newCompany}/>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Auth