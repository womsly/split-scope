import React, { useEffect, useState, useContext } from 'react'
import Layout from '../../../components/layout/LayoutTemplate'
import classes from './ProjectKanban.module.scss'
import { UserContext } from '../../../context/AuthContext'
import { columns, cards } from '../data'
import { GithubContext, GithubContextProvider } from '../../../context/GitHubContext'


function Project() {
  const [updatedCards, setUpdatedCards] = useState([]);
  const { user } = useContext(UserContext);
  const { orgs, repos, getUserRepos, getUserOrgs } = useContext(GithubContext);
  const [ selectedProject,  setSelectedProject ] = useState({});

  // const handleSelectedProject = (event) => {
  //   event.prevent
  // }
  

  useEffect(() => {
    appConsole.log(orgs);
  }, [])


  return (
      <Layout>
        <div className={classes.project_header_container}>
          <div className={classes.header_text}>
            <h1>Projects</h1>
            <div>
              <p>Overview of tasks to be completed</p>
              <select
                onChange={e => setSelectedProject(e.target.value)}
              >
                <options>test</options>
              </select>
            </div>

          </div>
          <div className={classes.header_search}>
            <input placeholder='search '/>
            <button onClick={() => getUserOrgs()}>View Orgs</button>
          </div>
        </div>

        <div className={classes.project_container}>
          <div className={classes.status_column_group}>
            {columns.map((column) => {
              return (
                <div className={classes.status_column}>
                  <div className={classes.status_header} style={{ backGroundColor: column.color}}>
                    <h3>{column.status}</h3>
                    <button>+</button>
                    <button>...</button>
                  </div>
                  {updatedCards.map((card) => {
                    if (card.columnId == column.id)
                    {
                      return (
                        <div 
                          className={classes.project_card}
                          // draggable
                          // onDragStart={() => (dragCard.current = card.id)}
                          // onDragEnter={() => (draggedOverColumn.current = column.id)}
                          // onDragEnd={handleSort}
                          // onDragOver={(e) => e.preventDefault()}
                        >
                          <div className={classes.card_date}>
                            <p>{card.dateDue}</p>
                            <button>...</button>
                          </div>
                          <h3>{card.title}</h3>
                          <p>{card.description}</p>
                        </div>
                      )
                    }
                  })

                  }
                </div>
              )
            })

            }
          </div>
        </div>
      </Layout>
  )
}

export default Project