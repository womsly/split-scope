import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Home, Project } from '../pages'
import Auth from '../pages/auth/Auth';
function CustomRouter() {
  const location = useLocation();
  return (
    <AnimatePresence>
      {/* providers listed here to wrap routes */}
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path='/project' element={<Project />} />
          <Route path='/auth' element={<Auth />} />
        </Routes>
      {/* closing provider tags */}
    </AnimatePresence>
  )
}

export default CustomRouter