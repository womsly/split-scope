import React, { useEffect } from 'react'
import Layout from '../../components/layout/LayoutTemplate'
import { UserAuth } from '../../context/AuthContext'
import { GithubAuthProvider, OAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../../firebase';

function Account() {
  const { user } = UserAuth;
  const provider = new GithubAuthProvider();

  const handleGithubSignIn = () => {
    signInWithPopup(auth, provider)
      .then(result => {
        const credential = GithubAuthProvider.credentialFromResult(result);

        const gitUser = result.user;


        user.gitCredential = credential;
        appConsole.log(gitUser)
        appConsole.log(user);
      })
  }

  const handleGithubSignOut = () => {
    signOut(auth, provider)
      .then(result => {
        // Clear the GitHub credentials information from our state as well

      })
  }

  useEffect(() => {
    
  }, [user])
  return (
    <Layout>
      <h3>Connected Accounts</h3>
      <div className="account-container">

      </div>
      <button onClick={handleGithubSignIn} >Connect GitHub</button>
    </Layout>
  )
}

export default Account