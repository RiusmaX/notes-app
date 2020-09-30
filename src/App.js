import React from 'react'
import './App.css'

import RootContainer from './container/RootContainer'
import AboutContainer from './container/AboutContainer'
import ContactContainer from './container/ContactContainer'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom"

function App () {
  return (
    <div className='App'>
      <header>
        <div>
          <h1>Super notes 2.0</h1>
        </div>
      </header>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">A propos</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </nav>
      
          <Switch>
            <Route path="/about">
              <AboutContainer />
            </Route>
            <Route path="/contact">
              <ContactContainer />
            </Route>
            <Route path="/">
              <RootContainer />
            </Route>
          </Switch>
        </div>
      </Router>
      <div className='main'>
      </div>
    </div>
  )
}

export default App
