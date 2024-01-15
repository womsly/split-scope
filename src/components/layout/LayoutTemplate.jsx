import React from 'react';
import classes from './LayoutTemplate.module.scss';
import { motion } from 'framer-motion';
// import Header from '../header/Header';

function Layout({ children }) {
  return (
    <div className={classes.layoutWrapper}>
      {/* <Header /> */}
      <motion.main 
        className={classes.container}
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}>
        {children}
      </motion.main>
    </div>
  )
}

export default Layout