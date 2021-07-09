import {BrowserRouter as Router} from 'react-router-dom';
import API from './API.js';
import {useState, useEffect} from 'react' ;
import React from 'react';
import {MemeBody} from './Utils.js';
import { UserContext } from './Contexts.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const [loading, setLoading] = useState(true);
  
  const doLogout = () => {
    API.logout().then(()=>{
      setLoggedIn(false);
      setUserInfo(undefined);
    });
  }
  useEffect(() => {
    API.getUserInfo().then(user => {
      setUserInfo(user);
      setLoggedIn(true);
      setLoading(false);
    }).catch(err =>{
      setLoggedIn(false);
      setUserInfo(undefined);
      setLoading(false);
    });
  
  }, []);

  return (
      <Router>
        <UserContext.Provider value = {{loggedIn : loggedIn, setLoggedIn : setLoggedIn, 
          userInfo : userInfo, setUserInfo : setUserInfo}}>

        
        
          <MemeBody doLogout = {doLogout}/>
        
        
        </UserContext.Provider>
      </Router>
  );
}

export default App;
