import React from 'react';
import { Toaster } from 'react-hot-toast';
import CustomRouter from './components/CustomRouter';
import classes from './styles/toast.module.scss';


function App() {
  return ( 
    <React.Fragment>
      <Toaster 
        position='top-right'
        containerClassName={classes.toaster}
        containerStyle={{
          top: '2rem',
          right: '2rem',
        }}
        toastOptions={{
          style: {
            border: 'solid #e5e4f5 2px',
            background: '#191553da',
            fontSize: '1.2rem',
            color: '#e5e4f5',
            
          }
        }}
      />
      <CustomRouter />
    </React.Fragment>
  )
}

export default App;