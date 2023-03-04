import React from "react";
import { useState } from 'react';
import ProfileDisplayList from "./profileDisplayList";
import { useParams } from 'react-router-dom';

export default function ResultsPage () {
  const { search } = useParams(); // retrieves the searched profession from URL 

  // stores an array of objects recieved from the server containing all professionals registered under the searched profession:
  const [profilesList, setProfilesList] = useState([]); 
  
  // GET request to the server
  async function fetchData() {
    try {
      const response = await fetch('http://localhost:3001/resultspage/' + search);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error); 
    }
  }
  fetchData();

  // dummy users array for testing. remove this when profilesList is populated with data from server 
  let dummyprofiles  = [
    {
      fullName: 'Dummy user 1',
      headline: 'headline for dummy user 1',
      expYear:  'less than a year'
    },
    {
      fullName : 'Dummy user 2',
      headline : 'headline for dummy user 2',
      expYear:   '3-5 years'
    }
  ]

  return (
    <>
      <h2> You searched for: {search} </h2>
      <ProfileDisplayList profiles = {dummyprofiles}/>
    </>
  )
}



