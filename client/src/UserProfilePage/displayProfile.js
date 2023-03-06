import React from "react";

const DisplayProfile = (props) =>{
    console.log (props)
    return(
        <>
        <h3> Your search: {props.profession} </h3>
        <p> <b>Name:</b>  {props.fullName} </p>
        <p> <b> Years of experience: </b> {props.expYear} </p>
        <p> <b>A little about me: </b>{props.headline} </p>
        <p> <b>Location: </b> {props.location} </p>
        <p> <b>Contant information: </b> </p>
        <p> <b>Email: </b> {props.email} </p>
        <p> <b>Phone number: </b> {props.phoneNum} </p>
        <p> <b>About my services and products: </b> {props.servicesAndProducts} </p>
        <p> <b>About my experience: </b> {props.experience} </p>
        </>
    )
}
export default DisplayProfile




