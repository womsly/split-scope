import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Home } from '../pages'

function CustomRouter() {
  const location = useLocation();
  return (
    <AnimatePresence>
      {/* providers listed here to wrap routes */}
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
        </Routes>
      {/* closing provider tags */}
    </AnimatePresence>
  )
}

export default CustomRouter