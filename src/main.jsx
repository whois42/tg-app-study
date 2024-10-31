import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import WebApp from '@twa-dev/sdk'
import { AppRoot } from '@telegram-apps/telegram-ui';

WebApp.ready();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRoot>
      <App />
    </AppRoot>
  </React.StrictMode>,
)
