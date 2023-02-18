import React from 'react';
import './homepage.css';
import SearchIcon from '@material-ui/icons/Search'; //importing the search icon
import { useState } from 'react';


export default function SearchBar({placeholder, data}) { // search bar func that takes data and placeholder as paramaters
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState([])

    // this function displays suggestions based on what the user is typing
    const handleFilter = (event) => { 
        const searchProfession = event.target.value 
        const newFilter = data.filter((value) => {
            // converts input and all professions in the data array to all lower case so the search isn't case sensitive 
            // returns words that contain the letters the user is typing
            return (value.toLowerCase().includes(searchProfession.toLowerCase())); 
        });

        // removes all suggestions if the user has not typed anything in the search bar 
        if (searchProfession === ""){
            setFilteredData([])
        } else {
            setFilteredData(newFilter)
        }
    }

    return(
        <>
        <div className='search'>

            {/* Displaying the search bar */}
            <div className='searchInputs'>
                {/* displaying input bar */}
                <input type='text' placeholder={placeholder}  onChange={handleFilter}/>
                {/* displaying the search icon next to the search bar */}
                <div className='searchIcon'> 
                    <SearchIcon/>
                </div>
            </div>

            {(filteredData.length !=0) && (
                <div className='dataResult'>
                    {filteredData.map((value) => {  //loops through and displays all the items in the 'data' variable ('professions' array)
                        return (
                            <p className='dataItem'> {value} </p> // Displaying results
                        );
                    })}
                </div>
            )}
        </div>
        </>
    )   
}

