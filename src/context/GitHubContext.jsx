import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./AuthContext";
import { Octokit } from "@octokit/rest";

export const GithubContext = createContext();

export const GithubContextProvider = ({children}) => {
  const { user, isLoading } = useContext(UserContext)
  const [options, setOptions] = useState({})
  const [repos, setRepos] = useState([])
  const [selectedRepo, setSelectedRepo] = useState({})
  const [orgs, setOrgs] = useState([])
  const [org, setOrg] = useState({}) // to select which organization as a manager
  const [issues, setIssues] = useState([]);
  const [orgTeams, setOrgTeams] = useState([]);
  const [orgProjects, setOrgProjects] = useState([])
  const [resIsLoading, setResIsLoading] = useState(false);
  const [error, setError] = useState("")


  
  const  github = new Octokit({
    auth: options.accessToken
  })


  const handleSetOptions = () => {
    const octOptions = {
      username: user.ghTokenResponse.screenName,
      accessToken: user.ghTokenResponse.oauthAccessToken
    }
    setOptions(octOptions)
  }

  // Fetches the list of repos for a given user and sets it to state
  const getUserRepos = async () =>{
    setResIsLoading(true);
    const path = `/user/repos?visibility=all&affiliation=organization_member`;
    try {
      if (options?.accessToken === undefined) {
        handleSetOptions();
      }
      const response = await github.request(`GET ${path}`)
      const tempData = response.data.filter((repo) => 
        repo.owner.login === org.login &&
        repo.open_issues_count > 0
        )
      appConsole.log(tempData);
      
      return setRepos(tempData)
    } catch (err) {
      setError(err.message || "Error loading user repositories");
    }
  }

  const getUserOrgs = async () =>{
    setResIsLoading(true);
    const path = `/users/${user.ghTokenResponse.screenName}/orgs`;
    try {
      if (options?.accessToken === undefined) {
        handleSetOptions();
      }
      const response = await github.request(`GET ${path}`)
      return setOrgs(response.data)
    } catch (err) {
      setError(err.message || "Error loading user organizations");
    }
  }

  const getOrgProjects = async () => {
    setResIsLoading(true);
    const path = `/orgs/${org.login}/repos`;
    try {
      if (options?.accessToken === undefined) {
        handleSetOptions();
      }
      const response = await github.request(`GET ${path}`)
      appConsole.log(response);
      const tempData = response.data.filter((repo) => 
        repo.open_issues_count > 0
        )
      appConsole.log(tempData)
      return setOrgProjects(tempData)
    } catch (err) {
      setError(err.message || "Error loading org projects");
    }
  }

  const getOrgTeams = async () => {
    setResIsLoading(true);
    const path = `/orgs/${org.login}/teams`;
    try {
      if (options?.accessToken === undefined) {
        handleSetOptions();
      }
      const response = await github.request(`GET ${path}`)
      appConsole.log(response);
      const tempData = response.data
      appConsole.log(tempData)
      return setOrgTeams(tempData)
    } catch (err) {
      setError(err.message || "Error loading org projects");
    }
  }

  const getUserIssues = async () => {
    setResIsLoading(true);
    const path = `/issues?filter=repos`
    try {
      if (options?.accessToken === undefined) {
        handleSetOptions();
      }
      const response = await github.request(`GET ${path}`)
      const tempRes = response.data.filter((issue) => issue.repository.owner.login === org.login ||
      issue.repository.owner.login === user.ghTokenResponse.screenName &&
      issue.repository.id === selectedRepo.id)
      appConsole.log(tempRes);
      return setIssues(tempRes)
    } catch (err) {
      setError(err.message || "Error loading user issues");
    }
  }

  const selectOrg = async (organization) => {
    try {
      if (organization.login !== undefined) {
        setOrg(organization);
      }
    } catch (err) {
      setError(err.message || "Error selecting organization") 
    }
  }

  const selectRepo = async (repository) => {
    try {
      appConsole.log(repository)
      if (repository[0].name !== undefined) {
        setSelectedRepo(repository[3])
      }
    } catch (err) {
      setError(err.message || "Error selecting repository")
    }
  }


  const value = {
    getUserRepos,
    repos,
    error,
    resIsLoading,
    getUserOrgs,
    orgs,
    getOrgProjects,
    orgProjects,
    selectOrg,
    org,
    issues,
    getUserIssues,
    orgTeams,
    getOrgTeams,
    selectedRepo,
    selectRepo,
  }

  useEffect(() => {
    const unsubscribe = () => {  
      try {
        if (user.id !== undefined) {
          const octOptions = {
            username: user.ghTokenResponse.screenName,
            accessToken: user.ghTokenResponse.oauthAccessToken
          }
          setOptions(octOptions)
        } else {
          setOptions({})
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