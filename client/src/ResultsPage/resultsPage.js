import React from "react";
import { useState } from 'react';
import ProfileDisplayList from "./profileDisplayList";
import { useParams } from 'react-router-dom';


export default function ResultsPage () {
  const { search } = useParams();
  // let search = window.localStorage.getItem("search") // retrieving the search request 
  const [profilesList, setProfilesList] = useState([]);
  
  // replace this with profiles array recieved from server
  let dummyprofiles  = [
    {
      fullName: 'Dummy user 1',
      headline: 'headline for dummy user 1'
    },
    {
      fullName : 'Dummy user 2',
      headline : 'headline for dummy user 2'
    }
  ]

  return (
    <>
      <h2> You searched for: {search} </h2>
      <ProfileDisplayList profiles = {dummyprofiles}/>
    </>
  )
}



