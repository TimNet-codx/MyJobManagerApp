import React,  { useState, createContext, useContext, useEffect }  from "react";
import { Outlet, redirect, useLoaderData, useNavigate, useNavigation } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Dashboard';
import { Navbar, BigSidebar, SmallSidebar, Loading } from '../components';
import customFetch from "../utils/customFetch";
import { toast } from 'react-toastify';
import { useQuery } from "@tanstack/react-query";

const userQuery = {
  queryKey: ['user'],
  queryFn: async () => {
    const { data } = await customFetch('/users/current-user');
    return data;
  },
};


// Get Current User Data load in to the APP
// export const loader = async () => {
//   try {
//     const {data} = await customFetch('/users/current-user');
//     return data;
//   } catch (error) {
//     return redirect('/'); 
//   }
// };
// Get Current User Data load in to the APP By using Reach Query
export const loader = (queryClient) => async () => {
  try {
    return await queryClient.ensureQueryData(userQuery);
  } catch (error) {
    return redirect('/'); 
  }
};
// Setting a Global Context
const DashboardContext = createContext();



const DashboardLayout = ({isDarkThemeEnabled, queryClient}) => {   
   // Current user
  //  const {user} = useLoaderData();
  const {user} = useQuery(userQuery).data;
   const navigate = useNavigate();  
   const navigation = useNavigation();
   const isPageLoading = navigation.state === 'loading';

   // temp
   //const user ={name: 'Timothy'};
  
  const [showSidebar, setShowSiderbar] = useState(false);
  const [isDarkTheme, setIsDarkTheme]  = useState(isDarkThemeEnabled);

  // Axios Interceptors
  const [isAuthError, setIsAuthError] = useState(false);


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
    queryClient.invalidateQueries();
    toast.success('Logging Out...');
    
  };
  
  customFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error?.response?.status === 401) {
        setIsAuthError(true);
      }
      return Promise.reject(error);
    }
  );
  useEffect(() => {
    if (!isAuthError) return;
    logoutUser();
  }, [isAuthError]);
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
                {isPageLoading ? <Loading/> : <Outlet context={{user}}/> }
              </div>
            </div>
          </main>
        </Wrapper>
      </DashboardContext.Provider>
        
  );
};
export const useDashboardContext = () => useContext(DashboardContext);


export default DashboardLayout;


