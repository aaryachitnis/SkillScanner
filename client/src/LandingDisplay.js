import React from 'react';
import styles from './mystyle.module.css'; 
import {useNavigate} from "react-router-dom"
  


const LandingDisplay = () => {
    const navigate = useNavigate();
    return (
        <>
        <div>
            {/* login and register buttons, routes to the "login.jsx" and "register.jsx" according to the button */}
            <button className={styles.LoginBtnPos} onClick={()=>navigate("/login")}>Login</button>
            <button className={styles.RegisterBtnPos} onClick={()=>navigate("/register")}>Register</button>
        </div>
        </>
    )
};
  
export default LandingDisplay;




