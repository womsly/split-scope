import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../components/layout/LayoutTemplate'
import { UserContext } from "../../context/AuthContext";

function Account() {
  const { user, githubConnect, githubDisconnect } = useContext(UserContext);
  const [providers, setProviders] = useState([])
  
  const handleGithubRefresh = async () => {
    await githubDisconnect()
    await githubConnect();
  }

  useEffect(() => {
    const getProvidersList =  async () => {
      if (user.providerData.length > 1) {
        setProviders(user.providerData.filter(x => x.providerId !== "password"));
      } else {
        setProviders([]);
      }
    }
    getProvidersList();
  }, [user, user.providerData])
  return (
    <Layout>
      <h3>Connected Accounts</h3>
      <div className="account-container">
        {providers.map((provider) => {
          return (
            <div className="card" key={provider.uid}>
              <p>{provider.providerId.split(".")[0]}</p>
              <p>{provider.displayName ?? provider.email}</p>
              <img src={provider.photoURL} alt="" />
              {provider.providerId === "github.com" ? 
                <button onClick={() => handleGithubRefresh()}>Refresh Github</button>
              :
                <></>
              }
            </div>
          );
        })}
      </div>
      <hr />
      {providers.includes(x => x.providerId === "github.com") ?
        <button onClick={() => githubDisconnect()}>Remove Github Connection</button>
      :
        <button onClick={() => githubConnect()}>Connect to Github</button>
      }
    </Layout>
  )
}

export default Account