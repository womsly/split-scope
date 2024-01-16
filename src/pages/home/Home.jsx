import React from 'react'
import Layout from '../../components/layout/LayoutTemplate'
import { daysOfWeek } from './data'
import classes from './Home.module.scss'


function Home() {
  return (
    <Layout>
      <h1>Home</h1> 
      {/* or username */}
      <p>Time worked this week: 0</p>
      <br />
      <div className={classes.project_container}>
        <div className={classes.project_individual}>
          <div>
            <p>Project Name:</p>
            <p>Time Worked:</p>
          </div>
          {daysOfWeek.map((item) => {
            return (
              <div>
                <p>{item}</p>
                <input type='text' name={`${item}_hours`} placeholder='0'/>
              </div>
            )
          })}
        </div>

      </div>
    </Layout>
  )
}

export default Home