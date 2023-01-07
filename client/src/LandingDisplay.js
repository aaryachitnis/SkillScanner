import React from 'react';
import styles from './mystyle.module.css'; 
import {useNavigate} from "react-router-dom"
  


const LandingDisplay = () => {
    const navigate = useNavigate();
    return (
        <>
        <div>
              {/* Displays the title and the slogan of the website  */}
              <h1 className={styles.headings}>Skill Scanner</h1>
              <h2 className={styles.headings}>Connecting clients with professionals</h2>
            {/* login and register buttons, routes to the "login.jsx" and "register.jsx" according to the button */}
            <button className={styles.LoginBtnPos} onClick={()=>navigate("/login")}>Login</button>
            <button className={styles.RegisterBtnPos} onClick={()=>navigate("/register")}>Register</button>
        </div>
        </>
    )
};
  
export default LandingDisplay;




