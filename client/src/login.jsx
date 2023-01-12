import React  from 'react';
import {useNavigate} from "react-router-dom";
import styles from './mystyle.module.css'; 


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
          email, password,
        }),
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data === "Login successful"){
          alert("Login successful!")
          setTimeout(() => {  navigate("/homepage"); }, 1500); //routes to homepage after 1.5 seconds
        } else if (data === "User not found"){
          alert("Invalid email. Please try again")
        } else if (data === "Wrong password"){
          alert("Invalid password. Please try again")
        }
      })
    } 
    catch (err){
      console.log(err);
    }
  }
    return(
        <>
        <div className={styles.landing}>
          <h3>Login</h3>
          <form onSubmit={handleSubmit}>
            <div> 
            <label htmlFor="email">Email </label>
            <br/>
            <input size="50" type="email" placeholder="Enter email " name="email"/>
            </div>
            <br/>
            <div>
            <label htmlFor="password">Password </label>
            <br/>
            <input size="50" type="password" placeholder="Enter password" name="password" />
            </div>
            <br/>
            <button>Log In</button>
          </form>
        </div>
        </>
      );
}


