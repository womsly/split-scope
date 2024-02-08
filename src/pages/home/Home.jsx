import React from 'react'
import Layout from '../../components/layout/LayoutTemplate'
import { daysOfWeek } from './data'
import classes from './Home.module.scss'
import PageHeader from '../../components/PageHeader/PageHeader'


function Home() {
  return (
    <Layout>
      <PageHeader>
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
      </PageHeader>
    </Layout>
  )
}

export default Home