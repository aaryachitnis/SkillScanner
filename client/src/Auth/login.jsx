import React  from 'react';
import {useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";


export default function Login (){
  let navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault(); // stops data being sent to the server immediately

    // storing the data entered by users in variables:
    let formData = new FormData(event.currentTarget);
    let email = formData.get("email");
    let password = formData.get("password");

    console.log ( email, password); // for testing purposes

    try{
      const response =  fetch ('http://localhost:3001/login', {
        method: "POST",
        crossDomain: true,
        headers: { 
          "Content-Type": "application/json",
          Accept:"application/json",
          "Accept-Control-Allow-Origin":"*",
        },
        body: JSON.stringify({
          email, password, //sends email and passwor to the server
        }),
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data === "Login successful"){ // if email and password are valid
          alert("Login successful!") // send an alert saying login was sucessful 
          setTimeout(() => {  navigate("/homepage"); }, 1500); //routes to homepage after 1.5 seconds
        } else if (data === "User not found"){ // if the email entered was not valid 
          alert("Invalid email. Please try again.") // 
        } else if (data === "Wrong password"){
          alert("Invalid password. Please try again.")
        }
      })
    } 
    catch (err){
      console.log(err);
    }
  }
    return(
        <>
        <div>
          <h3>Login</h3>
          <form onSubmit={handleSubmit}>
            <div> 
            <label htmlFor="email">Email </label>
            <br/> 
            {/*  */}
            <input size="50" type="email" placeholder="Enter email " name="email" required/>
            </div>
            <br/>
            <div>
            <label htmlFor="password">Password </label>
            <br/>
            <input size="50" type="password" placeholder="Enter password" name="password" required/>
            </div>
            <br/>
            <button>Log In</button>
          </form>
          <p> No account? <Link to = {`/register`} > Create an account here!</Link></p>
        </div>
        </>
      );
}


