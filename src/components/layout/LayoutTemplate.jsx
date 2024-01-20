import React from 'react';
import classes from './LayoutTemplate.module.scss';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom'
import Sidebar from '../sidebar/Sidebar';

function Layout({ children }) {
  const location = useLocation();
  return (
    <motion.div className={classes.layoutWrapper}
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}>
      {location.pathname !== "/auth"? 
        <Sidebar /> 
      :
        <></>
      }
      <main className={classes.container}>
        {children}
      </main>
    </motion.div>
  )
}

export default Layout