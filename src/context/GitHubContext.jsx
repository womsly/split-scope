import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./AuthContext";
import { Octokit } from "@octokit/rest";

export const GithubContext = createContext();

export const GithubContextProvider = ({children}) => {
  const { user, isLoading } = useContext(UserContext)
  const [options, setOptions] = useState({})
  const [repos, setRepos] = useState([])
  const [orgs, setOrgs] = useState([])
  const [resIsLoading, setResIsLoading] = useState(false);
  const [error, setError] = useState("")


  
  const  github = new Octokit({
    auth: options.accessToken
  })

  // Fetches the list of repos for a given user and sets it to state
  const getUserRepos = async () =>{
    setResIsLoading(true);
    const path = `/users/${options.username}/repos`;
    try {
      const response = await github.request(`GET ${path}`)
      return setRepos(response.data)
    } catch (err) {
      setError(err.message || "Error loading user repositories");
    }
  }

  const getUserOrgs = async () =>{
    setResIsLoading(true);
    const path = `/users/${options.username}/orgs`;
    try {
      const response = await github.request(`GET ${path}`)
      return setOrgs(response.data)
    } catch (err) {
      setError(err.message || "Error loading user repositories");
    }
  }


  const value = {
    getUserRepos,
    repos,
    error,
    resIsLoading,
    getUserOrgs,
    orgs
  }

  useEffect(() => {
    const unsubscribe = () => {  
      try {
        if (!isLoading) {
          const octOptions = {
            username: user.ghTokenResponse.screenName,
            accessToken: user.ghTokenResponse.oauthAccessToken
          }
          setOptions(octOptions)
        }
      } catch(err) {
        
      }
    }

    return () => {
      unsubscribe();
    }
  }, [])

  return (
    <GithubContext.Provider value={ value }>
      {children}
    </GithubContext.Provider>
  )
}