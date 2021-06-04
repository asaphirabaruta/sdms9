import React from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
// import { makeStyles } from '@material-ui/core';
import Login from '../pages/Employees/login';
import SignUp from '../pages/Employees/signUp';
import ClippedDrawer from '../pages/Employees/StudentRoom';
import StaffRoom from '../pages/Employees/StaffRoom';
import Announcements from '../pages/Employees/Announcements';
import Logout from '../components/logout';

function App() {
 

  return (
   <>
   
   <Switch>
     <Route path="/login" component={Login}/>
     <Route path="/logout" component={Logout}/>
     <Route path="/studentRoom" component={ClippedDrawer}/>
     <Route path="/staffRoom" component={StaffRoom}/>     
     <Route path="/signUp" component={SignUp}/>
     <Route path="/notices" component={Announcements}/>
     <Redirect from="/" exact to="/login"/>
   </Switch>
    
    </>
  );
}

export default App;
