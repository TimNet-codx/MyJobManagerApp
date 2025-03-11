import React from "react";
import styled from 'styled-components';
import logo from '../assets/images/logo.svg';
import Wrapper from "../assets/wrappers/LandingPage";
import { Link } from "react-router-dom";
import {Logo} from '../components';
import main from '../assets/images/main.svg';


const Landing = () => {
    return (
        <Wrapper>      
       <nav>
       {/* <img src={logo} alt='jobify' className='logo' /> */}
        <Logo />
        </nav>
        <div className="container page">
            <div className="info">
              <h1> Job <span>Manager</span> app</h1> 
              <p>
              It allows users to create, assign, and monitor tasks efficiently, ensuring projects stay on schedule. Key features include real-time notifications, deadline reminders, progress tracking, and reporting capabilities.
              The app enhances productivity by centralizing job-related data, reducing manual follow-ups, and improving workflow transparency. Ideal for businesses and teams of all sizes, Job Manager App simplifies work management for increased efficiency and accountability..
              </p>
              <Link to="/register" className='btn register-link'>Register</Link>
              <Link to="/login" className='btn'>Login</Link>
            </div>
            <img src={main} alt='job hunt' className='img main-img'/>
            
        </div>
        </Wrapper>  
    );
};
export default Landing;