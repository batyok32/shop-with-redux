import React, { useEffect, useState } from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import './default.scss'
// import Header from "./components/Header"

// layouts
import MainLayout from "./layouts/MainLayout"
import HomepageLayout from "./layouts/HomepageLayout"

// pages
import Homepage from "./pages/Homepage"
import Recovery from "./pages/Recovery"
import LoginWithPhone from "./pages/LoginWithPhone"
import Registration from "./pages/Registration"
import Login from './pages/Login'
import {auth, handleUserProfile} from "./firebase/utils"

// Redux
import {connect} from "react-redux"
import {setCurrentUser} from "./redux/User/user.actions"


function App({setCurrentUser}) {
  // const [currentUser, setCurrentUser] = useState(null);

  // check if current user
  useEffect(() => {
    const listener = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          })
        })
      } else {
        setCurrentUser(null);
      }
    })
    
  }, [])
  return (
    <div className="app">
      <div className="app__main">
        <Switch >
          <Route path='/registration' 
          render={() => setCurrentUser ? <Redirect to="/"/> : (
            <MainLayout >
              <Registration />
            </MainLayout>
          )} />
          <Route path='/phonelogin' 
          render={() => setCurrentUser ? <Redirect to="/"/> : (
            <MainLayout >
              <LoginWithPhone />
            </MainLayout>
          )} />
          <Route path='/recovery' 
          render={() => (
            <MainLayout >
              <Recovery />
            </MainLayout>
          )} />
          <Route path='/login' 
          render={() => setCurrentUser ? <Redirect to="/"/> : (
            <MainLayout >
              <Login />
            </MainLayout>
          )} />
          <Route exact path='/' 
          render={() => (
            <HomepageLayout >
              <Homepage />
            </HomepageLayout>
          )} />
        </Switch>
        
      </div>
    </div>
  );
}

const mapStateToProps = ({user}) => ({
  currentUser:user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
