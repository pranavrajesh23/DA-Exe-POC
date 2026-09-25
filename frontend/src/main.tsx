import './components/charts/chartSetup'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { QuantaThemeProvider } from '@quantaservices/quanta-ui-toolkit'
import '@quantaservices/quanta-ui-toolkit/theme.css'
import '@quantaservices/quanta-ui-toolkit/styles.css'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QuantaThemeProvider>
      <App />
    </QuantaThemeProvider>
  </React.StrictMode>,
)
