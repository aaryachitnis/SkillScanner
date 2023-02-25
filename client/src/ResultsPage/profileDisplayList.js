import Profile from "./profile";
import { useState } from "react";
import React from "react";

// maping the Profile function to all the professional user's profiles in the profiles array 
const ProfileDisplayList = (props) =>{

    return(
        <div>
            {props.profiles.map( p => 
                <Profile
                    fullName = {p.fullName}
                    headline = {p.headline}
                />  
            )}
        </div>
    )
}
export default ProfileDisplayList