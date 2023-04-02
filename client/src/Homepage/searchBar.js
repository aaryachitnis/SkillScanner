import React from 'react';
import './homepage.css';
import SearchIcon from '@material-ui/icons/Search'; 
import { IconButton } from '@material-ui/core';
import { useState } from 'react';
import {useNavigate} from "react-router-dom";

// array containing all the professions: 
const professions = ['Accountant', 'Actor', 'Architect', 'Artist', 'Builder', 'Carpenter', 'Chef', 
                    'Dentist', 'Dietician', 'Doctor','Eyelash technician', 'Electrician', 'Filmmaker', 
                    'Gardener', 'Hair stylist', 'Housekeeper', 'Interior designer', 'Jeweller', 'Lawyer',
                    'Makeup artist', 'Mechanic', 'Nail technician', 'Nutritionist', 'Nurse', 'Painter',
                    'Photographer', 'Physician', 'Plumber', 'Secretary', 'Software developer', 'Solicitor',
                    'Sports coach', 'Tutor', 'Therapist', 'Translator', 'Videographer',
]

export default function SearchBar() {
  let navigate = useNavigate();
  const [value, setValue] = useState(""); //stores the value of the text types by the user in the search bar

  //this function updates the value of 'value' each time there is a change in the search bar
  const onChange = (event) => {  
    setValue(event.target.value);
  };

  // this function is called when the user hits the search button
  const onSearch = (searchTerm) => {
    setValue(searchTerm); // updates value of 'value' to the search term so that it can be displayed in the input field
    // creating a new function where all professions and in all lower case letter:
    const lowercaseProfessions = professions.map(profession => profession.toLowerCase()); 

    if (lowercaseProfessions.includes(searchTerm.toLowerCase()) === true){ // if the value in the input field is a valid profession 
      setTimeout(() => {  navigate("/resultspage/" + searchTerm); }, 1000); // waits one second before redirecting to results page
      console.log(searchTerm); // for testing purposes  

    } else { // if value in the input field is not a valid profession, alert the user
      alert("Sorry, your search does not match any results") 
    }
  }; 

  return (
    <div className="search-container">

      {/* Displaying the search bar */}
      <div className="searchInputs">
        <input type="text" value={value} onChange={onChange} placeholder="Search..."/>
        <IconButton className='searchIcon' onClick={() => onSearch(value)}>
            <SearchIcon/>
        </IconButton>
      </div> 

      {/* Displaying the drop down as the user starts typing in the search bar */}
      <div className="dropdown">
        {professions.filter(item => {
          const searchTerm = value.toLowerCase(); 
          const profession = item.toLowerCase();

          return (
            searchTerm &&
            profession.startsWith(searchTerm) &&
            profession !== searchTerm
          );             
        })
        .map((item, index) => (
          <div className="dropdown-row" onClick={() => onSearch(item)} key={index} >
            {item}
          </div>
        ))}
      </div> 
    </div>
  );
}




