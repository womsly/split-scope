import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../components/layout/LayoutTemplate'
import { UserContext } from "../../context/AuthContext";

function Account() {
  const [oldUser, setOldUser] = useState({})
  const { user, githubConnect, githubDisconnect } = useContext(UserContext)



  useEffect(() => {
    
  }, [user])
  return (
    <Layout>
      <h3>Connected Accounts</h3>
      <div className="account-container">

      </div>
      <button onClick={githubConnect} >Connect GitHub</button>
      <button onClick={githubDisconnect} >Remove Github</button>
      <p>{JSON.stringify(user.providerData)}</p>
    </Layout>
  )
}

export default Account