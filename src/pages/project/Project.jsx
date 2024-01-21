import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/LayoutTemplate'
import classes from './Project.module.scss'
import { columns, cards } from './data'
import axios from 'axios';

function Project() {
  const [updatedCards, setUpdatedCards] = useState(cards);

  const getRepos = async () => {
    try {
      // const orgRes = await axios.get(`https://api.github.com/users/a-shevlin/orgs`, {
      //   headers: {
      //     Authorization: `Bearer ${import.meta.env.VITE_APP_ACCESS_TOKEN}`
      //   }
      // })
      let org = ""
      // if (orgRes.status === 200) {
      //   orgRes.data.forEach((userOrg) => {
      //     appConsole.log(userOrg.id)
      //   })
      // }
      const response = await axios.get(`https://api.github.com/orgs/${org}/projects`, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_APP_ACCESS_TOKEN}`
        }
      });
      const repositories = response.data;
      appConsole.log(response);
      appConsole.log(repositories);
    } catch (e) {
      appConsole.error(e);
    }
  }
  

  useEffect(() => {
    getRepos();
  }, [updatedCards])


  return (
    <Layout>
      <div className={classes.project_header_container}>
        <div className={classes.header_text}>
          <h1>Projects</h1>
          <p>Overview of tasks to be completed</p>
        </div>
        <div className={classes.header_search}>
          <input placeholder='search '/>
          <button>Add Project</button>
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