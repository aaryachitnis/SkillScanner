import React from "react";
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from "react";
import { useCallback } from "react";
import ProfileDisplayList from "./profileDisplayList";


export default function ResultsPage () {
  const { search } = useParams(); // retrieves the searched profession from URL 

  // stores an array of objects recieved from the server containing all professionals registered under the searched profession:
  const [profilesList, setProfilesList] = useState(); 
  
  // GET request to the server
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:3001/resultspage/' + search);
      const data = await response.json();
      setProfilesList(data) // Store the received data in the state variable 
    } catch (error) {
      console.error(error);
    }
  }, [search]);

  // Calls the fetchData function only once when the component is rendered
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <h2> You searched for: {search} </h2>
      <ProfileDisplayList profiles = {profilesList}/>
    </>
  )
}



