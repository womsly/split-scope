import React, {useContext, useState, useEffect } from 'react'
import { GithubContext } from '../../context/GitHubContext';
import Layout from '../../components/layout/LayoutTemplate'


function Project() {
  const { 
    orgs,
    org, 
    repos,
    orgProjects, 
    getUserRepos, 
    getUserOrgs, 
    getOrgProjects,
    selectOrg,
    getUserIssues,
    issues,
    teams,
    getOrgTeams,
    selectedRepo,
    selectRepo,
  } = useContext(GithubContext);
  const [ selectedProject,  setSelectedProject ] = useState({});
  const [updatedRepos, setUpdatedRepos] = useState([])


  return (
    <Layout>
      <div>
        <h1>Select a project to view details</h1>

      </div>
      <div>
        <button  onClick={getUserOrgs}>Get User Orgs</button>
        <button  onClick={() => selectOrg(orgs[0])}>Set User Orgs</button>
        <button onClick={getOrgProjects}>Get Org Repo</button>
        <button onClick={() => selectRepo(orgProjects)}>Set Repo</button>
        <button onClick={getUserIssues}>Get Issues</button>
        <button onClick={getOrgTeams}>Get Teams</button>
        <p>

          {JSON.stringify(org)}
        </p>
        <div>

          {JSON.stringify(selectedRepo)}
        </div>
        <div>
          {issues.map((issue) => {
            if (issue.repository.id === selectedRepo.id)
            return (
              <p>{issue.title}</p>
            )
          })}
        </div>
      </div>
      
    </Layout>
  )
}

export default Project