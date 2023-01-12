import React from 'react';
import styles from './mystyle.module.css'; 
import {useNavigate} from "react-router-dom"
  


const LandingDisplay = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.landing} >
            <h1 className={styles.headings}>Skill Scanner</h1>
            <h2 className={styles.headings}>Connecting clients with professionals</h2>
            <button className={styles.LoginBtnPos} onClick={()=>navigate("/login")}>Login</button>
            <button className={styles.RegisterBtnPos} onClick={()=>navigate("/register")}>Register</button>
        </div>
    )
};
  
export default LandingDisplay;




