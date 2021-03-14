import React, { useEffect, useState } from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import './default.scss'
// import Header from "./components/Header"

// layouts
import MainLayout from "./layouts/MainLayout"
import HomepageLayout from "./layouts/HomepageLayout"

// pages
import Homepage from "./pages/Homepage"
import Registration from "./pages/Registration"
import Login from './pages/Login'
import {auth, handleUserProfile} from "./firebase/utils"


function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [counter, setCounter] = useState(0)
  // check if current user
  useEffect(() => {
    const listener = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            // data:userRef,
            id: snapshot.id,
            ...snapshot.data()
          })
          setCounter(counter+1)
          console.log("user:", currentUser, "counter", counter);
        })
      } else {
        setCurrentUser(null)
        console.log("user  null");
      }
    })
    console.log("also user:", currentUser, "counter", counter)
    
  }, [])
  return (
    <div className="app">
      <div className="app__main">
        <Switch >
          <Route path='/registration' 
          render={() => currentUser ? <Redirect to="/"/> : (
            <MainLayout currentUser={currentUser}>
              <Registration />
            </MainLayout>
          )} />
          <Route path='/login' 
          render={() => currentUser ? <Redirect to="/"/> : (
            <MainLayout currentUser={currentUser}>
              <Login />
            </MainLayout>
          )} />
          <Route exact path='/' 
          render={() => (
            <HomepageLayout currentUser={currentUser}>
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
