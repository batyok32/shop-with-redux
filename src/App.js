import React from 'react'
import {Route, Switch} from 'react-router-dom'
import './default.scss'
// import Header from "./components/Header"

// layouts
import MainLayout from "./layouts/MainLayout"
import HomepageLayout from "./layouts/HomepageLayout"

// pages
import Homepage from "./pages/Homepage"
import Registration from "./pages/Registration"

function App() {
  return (
    <div className="app">
      <div className="app__main">
        <Switch >
          <Route path='/registration' render={() => (
            <MainLayout>
              <Registration />
            </MainLayout>
          )} />
          <Route exact path='/' render={() => (
            <HomepageLayout>
              <Homepage />
            </HomepageLayout>
          )} />
        </Switch>
        
        {/* <Homepage /> */}
      </div>
    </div>
  );
}

export default App;
