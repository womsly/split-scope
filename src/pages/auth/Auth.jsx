import React, { useState } from 'react'
import Layout from '../../components/layout/LayoutTemplate'
import AuthForm from '../../components/AuthForm/AuthForm'

function Auth() {
  const [newUser, setNewUser] = useState(true)
  const [newCompany, setNewCompany] = useState(true)

  return (
    <Layout>
      <div className="container">
        <h2>
          {newUser && newCompany ? ("company account creation") 
          :
          newUser && !newCompany ? 
          ("user account creation")
          :
          ("Sign In")}
        </h2>
        <p></p>
      </div>
      <AuthForm createNewUser={newUser} createNewCompanyAcct={newCompany}/>
    </Layout>
  )
}

export default Auth