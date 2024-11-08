import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import { AlertProvider } from './context/AlertContext'

ReactDOM.render(
  <React.StrictMode>
    <AlertProvider>
      <App />
    </AlertProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
