import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Home, Project } from '../pages'
import Auth from '../pages/auth/Auth';
import { AuthContextProvider } from '../context/AuthContext';
import ProtectedRoute from './ProtectedRoute';
function CustomRouter() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <AuthContextProvider>
        {/* providers listed here to wrap routes */}
        <Routes location={location} key={location.pathname}>
          <Route path='/auth' element={<Auth />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path='/project' element={<Project />} />
          </Route>
        </Routes>
      </AuthContextProvider>
      {/* closing provider tags */}
    </AnimatePresence>
  )
}

export default CustomRouter