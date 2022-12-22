import React from 'react';
import styles from './mystyle.module.css'; 
import  LandingDisplay  from "./LandingDisplay";
import  Register  from './register';
import Login from './login'
import { Routes, Route } from "react-router-dom";


export default function App() {
    return (
        <>
        <div>
              {/* Displays the title and the slogan of the website  */}
              <h1 className={styles.headings}>Skill Scanner</h1>
              <h2 className={styles.headings}>Connecting clients with professionals</h2>
        </div>
          <Routes>
              {/* Routing to the necessary pages */}
              <Route exact path='/' element={<LandingDisplay/>}/>
    {/* The following two lines allow the login and register page to be displayed along with the title and slogan of website */}
              <Route exact path='/login' element={<Login/>}/>
              <Route exact path='/register' element={<Register/>}/>
          </Routes>
        </>
      );
}




