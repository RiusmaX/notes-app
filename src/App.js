import React from 'react'
import './App.css'
import RootContainer from './container/RootContainer'

function App () {
  return (
    <div className='App'>
      <header>
        <div>
          <h1>Super notes 2.0</h1>
        </div>
      </header>
      <div className='main'>
        <RootContainer />
      </div>
    </div>
  )
}

export default App
