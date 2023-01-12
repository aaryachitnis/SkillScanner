import React  from 'react';
//import routing from './routing';
import {useNavigate} from "react-router-dom";
// import ProfileSetup from './profileSetup';


export default function Register() {
  let navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault(); // stops the page from refreshing each time the form is submitted

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
        if (data === "valid"){
          alert("Account created!")
          setTimeout(() => {  navigate("/profileSetup"); }, 1000);
        } else if (data === "invalid"){
          alert("Invalid email or password. Please try again")
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
    </>
  );
}



