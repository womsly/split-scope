import React from "react";
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import * as appConsole from '../utils/customLogger.js';
import { BrowserRouter } from "react-router-dom";
import './styles/global.scss';



window.appConsole = appConsole;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)