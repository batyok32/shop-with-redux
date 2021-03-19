import React, { useEffect } from 'react'
import './default.scss'

// hoc
import WithAuth from "./hoc/withAuth"

// React router
import {Route, Switch, Redirect} from 'react-router-dom'

// Layouts
import MainLayout from "./layouts/MainLayout"
import HomepageLayout from "./layouts/HomepageLayout"

// Pages
import Homepage from "./pages/Homepage"
import Recovery from "./pages/Recovery"
import LoginWithPhone from "./pages/LoginWithPhone"
import Registration from "./pages/Registration"
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'


// Firebase
import {auth, handleUserProfile} from "./firebase/utils"

// Redux
import {connect} from "react-redux"
import {setCurrentUser} from "./redux/User/user.actions"


function App({currentUser, setCurrentUser}) {

  // check if current user
  useEffect(() => {
    const authListener = auth.onAuthStateChanged(async userAuth => {
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
    console.log(currentUser, "current user");
    return ()=> {
      authListener();
    }
    
  }, [])
  return (
    <div className="app">
      <div className="app__main">
        <Switch >
          <Route path='/registration' 
          render={() => (
            <MainLayout >
              <Registration />
            </MainLayout>
          )} />
          <Route path='/phonelogin' 
          render={() => (
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
          <Route path='/dashboard' 
          render={() => (
            <WithAuth>
              <MainLayout >
                <Dashboard />
              </MainLayout>
            </WithAuth>
          )} />
          <Route path='/login' 
          render={() => (
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
