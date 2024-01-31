import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Home, Project } from '../pages'
import Auth from '../pages/auth/Auth';
import { AuthContextProvider } from '../context/AuthContext';
import ProtectedRoute from './ProtectedRoute';
import Account from '../pages/account/Account';
import { GithubContextProvider } from '../context/GitHubContext';
function CustomRouter() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <AuthContextProvider>
        <GithubContextProvider>

          {/* providers listed here to wrap routes */}
          <Routes location={location} key={location.pathname}>
            {/* <Route path='/auth' element={<Auth />} /> */}
            <Route path="/" element={<Auth />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/home" element={<Home />} />
              <Route path='/project' element={<Project />} />
              <Route path="/account" element={<Account />} />
            </Route>
          </Routes>
        </GithubContextProvider>
      </AuthContextProvider>
      {/* closing provider tags */}
    </AnimatePresence>
  )
}

export default CustomRouter