import React from 'react'
import ReactDOM from 'react-dom'
import App from './views/NewTab/App'

ondragstart=()=>false

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
); 
