import React, { useState } from 'react'
import Layout from '../../components/layout/LayoutTemplate'
import AuthForm from '../../components/AuthForm/AuthForm'

function Auth() {
  const [newUser, setNewUser] = useState(true)

  return (
    <Layout>
      <div className="container">

      </div>
      <AuthForm createNewUser={newUser}/>
    </Layout>
  )
}

export default Auth