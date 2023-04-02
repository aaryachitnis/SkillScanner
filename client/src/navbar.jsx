import React from "react";
import styles from './mystyle.module.css'; 


export default function Navbar(){
    return (
        <>
        <nav className={styles.navigation}>
            <ul>
                <li>
                    <a href="/shortlist"> Shortlist</a>
                </li>
                <li>
                    <a href="/chat"> Chat</a>
                </li>
                <li>
                    <a href="/homepage"> Homepage</a>
                </li>
                <li>
                    <a href="/account"> Account</a>
                </li>
            </ul>
        </nav>
        </>
    )
}





