import React from 'react';
import { Routes, Route } from "react-router-dom";
import  LandingDisplay  from "./LandingDisplay";
import  Register  from './Auth/register';
import Login from './Auth/login'
import Homepage from './Homepage/homepage';
import ProfileSetup from './profileSetup';
import ResultsPage from './ResultsPage/resultsPage';

export default function App() {
    return (
        <>
          <Routes>
              <Route exact path='/' element={<LandingDisplay/>}/>
              <Route exact path='/login' element={<Login/>}/>
              <Route exact path='/register' element={<Register/>}/>
              <Route exact path='/profilesetup' element={<ProfileSetup/>}/>
              <Route exact path='/homepage' element={<Homepage/>}/>
              <Route exact path='/resultspage' element={<ResultsPage/>}/>
          </Routes>
        </>
      );
}



