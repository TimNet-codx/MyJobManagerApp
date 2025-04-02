import React from "react";
// import { FaSuitcaseRolling, FaCalendarCheck } from 'react-icons/fa';

// import { useLoaderData, redirect } from 'react-router-dom';
// import customFetch from '../utils/customFetch';
// import Wrapper from '../assets/wrappers/StatsContainer';
// import { toast } from 'react-toastify';
import { UserListTable } from "../components";


// export const loader = async () =>{
//     try {
//         const response = await customFetch.get('/users/admin/app-stats');
//         return response.data;
//     } catch (error) {
//         toast.error('You are not authorized to view this page');
//         return redirect('/dashboard');
//     }
// };

const UsersList = () => {
    //const {users, jobs} = useLoaderData();
    return (
      <>
      <UserListTable/>
      </> 
    );
};

export default UsersList;