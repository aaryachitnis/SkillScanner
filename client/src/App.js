import React from 'react';
import { Routes, Route } from "react-router-dom";
import  LandingDisplay  from "./LandingDisplay";
import  Register  from './register';
import Login from './login'
import Homepage from './homepage';
import ProfileSetup from './profileSetup';


export default function App() {
    return (
        <>
          <Routes>
              <Route exact path='/' element={<LandingDisplay/>}/>
              <Route exact path='/login' element={<Login/>}/>
              <Route exact path='/register' element={<Register/>}/>
              <Route exact path='/profilesetup' element={<ProfileSetup/>}/>
              <Route exact path='/homepage' element={<Homepage/>}/>
          </Routes>
        </>
      );
}



