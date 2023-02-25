import React from "react";
import { Link } from "react-router-dom";


// displaying one profile 
const Profile = (props)=> {

    return(
        <div>
            <Link to = '/userprofile' >{props.fullName}</Link>
            <h4>{props.headline}</h4>
        </div>
    )
}

export default Profile
