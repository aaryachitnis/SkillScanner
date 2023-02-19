import React from 'react';
import './homepage.css';
import SearchIcon from '@material-ui/icons/Search'; //importing the search icon
import { IconButton } from '@material-ui/core';
import { useState } from 'react';


// array containing all the professions: 
const professions = ['Accountant', 'Actor', 'Architect', 'Artist', 'Builder', 'Carpenter', 'Chef', 
                    'Dentist', 'Dietician', 'Doctor','Eyelash technician', 'Electrician', 'Filmmaker', 
                    'Gardener', 'Hair stylist', 'Housekeeper', 'Interior designer', 'Jeweller', 'Lawyer',
                    'Makeup artist', 'Mechanic', 'Nail technician', 'Nutritionist', 'Nurse', 'Painter',
                    'Photographer', 'Physician', 'Plumber', 'Secretary', 'Software developer', 'Solicitor',
                    'Sports coach', 'Tutor', 'Therapist', 'Translator', 'Videographer',
]

export default function App() {
    const [value, setValue] = useState("");
  
    const onChange = (event) => {
      setValue(event.target.value);
    };
  
    const onSearch = (searchTerm) => {
      setValue(searchTerm);
      const lowercaseProfessions = professions.map(profession => profession.toLowerCase());

      if (lowercaseProfessions.includes(searchTerm.toLowerCase()) === true){
        // send searchTerm to server here
        console.log("search ", searchTerm); 
      } else {
        alert("Invalid search")
      }

    };
  
    return (
        <div className="search-container">

          <div className="searchInputs">
            <input type="text" value={value} onChange={onChange} placeholder="Search..."/>
            <IconButton className='searchIcon' onClick={() => onSearch(value)}>
                <SearchIcon/>
            </IconButton>
          </div>


           <div className="dropdown">
            {professions.filter(item => {
                const searchTerm = value.toLowerCase();
                const fullName = item.toLowerCase();
  
                return (
                  searchTerm &&
                  fullName.startsWith(searchTerm) &&
                  fullName !== searchTerm
                );             
            })
            .map((item, index) => (
                <div className="dropdownRow" onClick={() => onSearch(item)} key={index} >
                  {item}
                </div>
              ))}

          </div> 
        </div>
    );
}
  

