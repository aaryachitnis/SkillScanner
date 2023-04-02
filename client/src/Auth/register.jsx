import React  from 'react';
import {useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";


export default function Register() {
  let navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault(); // stops the data from being sent to the server

    // storing the data entered by users in variables:
    let formData = new FormData(event.currentTarget);
    let email = formData.get("email");
    let password = formData.get("password");
    let confirmPassword = formData.get("confirmPassword");

    console.log ( email, password, confirmPassword); // for testing purposes
    
    // sending email and password to backend
    try{
      const response =  fetch ('http://localhost:3001/register', {
        method: "POST",
        crossDomain: true,
        headers: { 
          "Content-Type": "application/json",
          Accept:"application/json",
          "Accept-Control-Allow-Origin":"*",
        },
        body: JSON.stringify({
          email, password, confirmPassword,
        }),
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        
        if (data.status === "valid"){ // if account details are valid
          alert("Account created!") // send an alert on the browser saying the account was created
          window.localStorage.setItem ("token", data.token) // saves jwt token to browser's local storage
          setTimeout(() => {  navigate("/profilesetup"); }, 1500); // waits 1.5 seconds before redirecting to profile setup page

        } else if (data === "invalid"){ // if account details are invalid
          alert("Invalid email or password. Please try again") // send an alert on the browser to display the error

        } else if (data === "User exists"){ // if the email already exists in the database
          alert ("An account associated with this email already exists. Proceed to login") // send an alert asking the user to login 
        }
      })
    } 
    catch (err){
      console.log(err);
    }
  }

  // displaying the registration form 
  return(
    <>
      <h3>Create an account</h3>
      <h4>Password requirements:</h4>
      <ul>
        <li>Minimum 10 characters</li>
        <li>Contains a number</li>
        <li>Contains a capital letter</li>
        <li>Contains a special character</li>
      </ul>

      <form onSubmit={handleSubmit}>
        <div> 
        <label htmlFor="email">Email  </label>
        <br/>
        <input size="50" type="email" placeholder="Enter email" name="email" required />
        </div>
        <br/>
        <div>
        <label htmlFor="password">Password  </label>
        <br/>
        <input size="50" type="password" placeholder="Enter password" name="password" required/>
        </div>
        <br/>
        <div>
        <label htmlFor="confirmPassword">Confirm password  </label>
        <br/>
        <input size="50" type="password" placeholder="Re-enter password" name="confirmPassword" required/>
        </div>        
        <br/>
        <button>Register</button>
      </form> 
      <p> Already have an account? <Link to = {`/login`} > Login here!</Link></p>
    </>
  );
}



