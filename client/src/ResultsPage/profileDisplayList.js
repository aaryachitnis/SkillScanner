import Profile from "./profile";
import React from "react";

// maping the Profile function to all the professional user's profiles in the profiles array 
const ProfileDisplayList = (props) =>{
    return(
        <div>
            {props.profiles?.map( p => 
            // applies the following function to every profile in the profilesList array 
                <Profile
                    key={p.id}
                    id = {p.id}
                    fullName = {p.fullName}
                    headline = {p.headline}
                    expYear = {p.expYear}
                />  
            )}
        </div>
    )
}
export default ProfileDisplayList





