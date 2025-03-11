import React from "react";
import { Outlet, redirect, useLoaderData, useNavigate } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Dashboard';
import { Navbar, BigSidebar, SmallSidebar } from '../components';
import { useState, createContext, useContext } from "react";
import customFetch from "../utils/customFetch";
import { toast } from 'react-toastify';


// Get Current User Data load in to the APP
export const loader = async () => {
  try {
    const {data} = await customFetch('/users/current-user');
    return data;
  } catch (error) {
    return redirect('/'); 
  }
};
// Setting a Global Context
const DashboardContext = createContext();



const DashboardLayout = ({isDarkThemeEnabled}) => {   
   // Current user
   const {user} = useLoaderData();
   const navigate = useNavigate();  

   // temp
   //const user ={name: 'Timothy'};
  
  const [showSidebar, setShowSiderbar] = useState(false);
  const [isDarkTheme, setIsDarkTheme]  = useState(isDarkThemeEnabled);

  const toggleDarkTheme = () => {
    // console.log('toggle dark theme');
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle('dark-theme', newDarkTheme);
    localStorage.setItem('darkTheme', newDarkTheme);
  };

  const toggleSidebar = () => {
    setShowSiderbar(!showSidebar);
  };

  const logoutUser = async () =>{
    navigate('/');
    await customFetch.get('/auth/logout');
    toast.success('Logging Out...');
  };

    return (
      <DashboardContext.Provider 
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
      >
       <Wrapper> 
          <main className='dashboard'>
            <SmallSidebar />
            <BigSidebar />
            <div>
              <Navbar />
              <div className='dashboard-page'>
                <Outlet context={{user}}/>
              </div>
            </div>
          </main>
        </Wrapper>
      </DashboardContext.Provider>
        
  );
};
export const useDashboardContext = () => useContext(DashboardContext);


export default DashboardLayout;


