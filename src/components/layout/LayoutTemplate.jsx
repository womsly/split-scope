import React from 'react';
import classes from './LayoutTemplate.module.scss';
import { motion } from 'framer-motion';
import Sidebar from '../sidebar/Sidebar';

function Layout({ children }) {
  return (
    <motion.div className={classes.layoutWrapper}
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}>
      <Sidebar />
      <main className={classes.container}>
        {children}
      </main>
    </motion.div>
  )
}

export default Layout