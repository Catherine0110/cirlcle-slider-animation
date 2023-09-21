import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import MobileContextProvider from './utils/MobileContextProvider'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <MobileContextProvider>
    <App />
  </MobileContextProvider>,
)
