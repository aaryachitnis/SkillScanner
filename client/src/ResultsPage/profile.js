import React from "react";
import { Link } from "react-router-dom";
import './resultsPageStyling.css';

// displaying one profile 
const Profile = (props)=> {
    return(
        <div className="profile-container">
            
            {/* Displays the name of the user as a link: */}
            <Link to = {`/userprofile/${props.id}`} >{props.fullName}</Link> 

            {/* Displays years of experience */}
            <h4>{props.expYear}</h4>

            {/* Displays headline: */}
            <h4>{props.headline}</h4>

        </div>
    )
}

export default Profile




