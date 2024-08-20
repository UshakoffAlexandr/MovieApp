import ReactDOM from 'react-dom/client'
import React from 'react'

import App from './components/app'
import { GenresProvider } from './components/contexts/GenresContext'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <GenresProvider>
    <App />
  </GenresProvider>
)
