import React from "react";
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from "react";
import { useCallback } from "react";
import DisplayProfile from "./displayProfile";


export default function UserProfilePage(){
    const { userid } = useParams(); // retrieves the user id from URL 
    const [profileInfo, setProfileInfo] = useState(); 

    const fetchData = useCallback(async () => {
        try {
          const response = await fetch('http://localhost:3001/userprofile/' + userid);
          const data = await response.json();
          setProfileInfo(data) // Store the received data in the state variable 
        } catch (error) {
          console.error(error);
        }
    }, [userid]);   

    // Calls the fetchData function only once when the component is rendered
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <>
        {profileInfo?.map( p => 
            <DisplayProfile
                key = {p.fullName}
                fullName = {p.fullName}
                profession = {p.profession}
                headline = {p.headline}
                expYear = {p.expYear}
                location = {p.location}
                email = {p.email}
                phoneNum = {p.phoneNum}
                servicesAndProducts = {p.servicesAndProducts}
                experience = {p.experience} 
            />  
        )}
        </>
    )  
}


