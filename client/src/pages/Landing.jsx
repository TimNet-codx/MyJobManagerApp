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
              <h1> My Job <span>Manager</span> app</h1> 
              <p>
              "The app allows users to add jobs with details such as position, company, job location, job status, and job type. Users can also edit and update the current job status or the job they have applied for while keeping a record of all jobs. By centralizing job-related data and reducing manual follow-ups, the app enhances productivity. Ideal for businesses and teams of all sizes, Job Manager simplifies work management, increasing efficiency and accountability."
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