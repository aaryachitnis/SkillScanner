import React  from 'react';
import SearchBar from './searchBar';

// array containing all the professions: 
const professions = ['Accountant', 'Actor', 'Architect', 'Artist', 'Builder', 'Carpenter', 'Chef', 
                    'Dentist', 'Dietician', 'Doctor','Eyelash technician', 'Electrician', 'Filmmaker', 
                    'Gardener', 'Hair stylist', 'Housekeeper', 'Interior designer', 'Jeweller', 'Lawyer',
                    'Makeup artist', 'Mechanic', 'Nail technician', 'Nutritionist', 'Nurse', 'Painter',
                    'Photographer', 'Physician', 'Plumber', 'Secretary', 'Software developer', 'Solicitor',
                    'Sports coach', 'Tutor', 'Therapist', 'Translator', 'Videographer',
]


export default function Homepage() {
    return (
        <>
        <h2>Homepage</h2> 
        {/* Calls search bar function and passes arguments in the placeholder and data parameters */}
        <SearchBar placeholder={"Search..."} data={professions}/>
        </>
    );
}



