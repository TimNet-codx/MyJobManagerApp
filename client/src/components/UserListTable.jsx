// import React from 'react';
// import Box from '@mui/material/Box';
// import { DataGrid } from '@mui/x-data-grid';

// const columns = [
//   { field: 'id', headerName: 'ID', },
//   {
//     field: 'firstName',
//     headerName: 'First name',
//   },
//   {
//     field: 'lastName',
//     headerName: 'Last name',
//   },
//   {
//     field: 'age',
//     headerName: 'Age',
//     type: 'number',
//   },
//   {
//     field: 'fullName',
//     headerName: 'Full name',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,

//     valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
//   },
// ];

// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

// const UserListTable = () => {

//     return (
//        <div>
//      <Box sx={{ height: 400, width: "100%", marginTop: 5 }}>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         initialState={{
//           pagination: {
//             paginationModel: {
//               pageSize: 5,
//             },
//           },
//         }}
//         pageSizeOptions={[5]}
//         checkboxSelection
//         disableRowSelectionOnClick
//       />
//     </Box>
//    </div>

//     );
// }

// export default UserListTable;

// import React from "react";
// import Box from "@mui/material/Box";
// import { DataGrid } from "@mui/x-data-grid";
// import customFetch from "../utils/customFetch";
// import { useLoaderData } from "react-router-dom";
// import { toast } from "react-toastify";
// //import { useOutletContext } from 'react-router-dom';


// // Loader function to fetch users
// export const loaderr = async () => {
//   try {
//     const response = await customFetch.get("/admin/users");
//     console.log("response:", response.data  );
//     return Array.isArray(response.data) ? response.data : []; // Ensure it's always an array
//   } catch (error) {
//     toast.error("You are not authorized to view this page");
//     return []; // Return an empty array on failure
//   }
// }

// const columns = [
//   { field: "id", headerName: "ID", flex: 1 },
//   { field: "name", headerName: "First Name", flex: 1 },
//   { field: "lastName", headerName: "Last Name", flex: 1 },
//   { field: "email", headerName: "Email", flex: 1.5 },
//   { field: "location", headerName: "Location", flex: 1 },
// ];

// const UserListTable = () => {
//   const users = useLoaderData(); // Do not destructure, since users is an array
//   console.log("Users data:", users);
//   //  const {user} = useOutletContext();
//   // const {name, lastName, email, location} = user;

//   const validUsers = Array.isArray(users) ? users : [];
//   console.log("validUsers:", validUsers);

//   // Format users to include an "id" field for DataGrid
//   const rows = validUsers.map((user, index) => ({
//     id: user._id || index, // Use MongoDB `_id` or fallback to index
//     name: user.name || "N/A",
//     lastName: user.lastName || "N/A",
//     email: user.email || "N/A",
//     location: user.location || "Unknown",
//   }));

//   return (
//     <Box sx={{ height: 400, width: "100%", marginTop: 5 }}>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         initialState={{
//           pagination: {
//             paginationModel: {
//               pageSize: 5,
//             },
//           },
//         }}
//         pageSizeOptions={[5, 10]}
//         checkboxSelection
//         disableRowSelectionOnClick
//       />
//     </Box>
//   );
// };

// export default UserListTable;

import React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Wrapper from '../assets/wrappers/UserListTable';
import { colors } from "@mui/material";
import { red } from "@mui/material/colors";


// Loader function to fetch users /users/admin/app-stats
// const userQuery = {
//   queryKey: ['users'],
//   queryFn: async () => {
//     const { response } = await customFetch.get("/users/admin/users");
//     return response.data;
//   },
// };
const userQuery = {
  queryKey: ["users"],
  queryFn: async () => {
    try {
      const { data } = await customFetch.get("/users/admin/users");
      return data.users || [];
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("You are not authorized to view this page");
      throw new Error("Failed to fetch users");
    }
  },
};
export const loader = (queryClient) => async () => {
  return await queryClient.ensureQueryData(userQuery);
};



// export const loader = async () => {
//   try {
//     const response = await customFetch.get("/users/admin/users");
//     console.log("API Response:", response); // Debug the response
//     // return response.data;
//     return response.data.users || [];
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     toast.error("You are not authorized to view this page");
//     return [];
//   }
// };

// export const loader = (queryClient) =>  async () => {
//   try {
//     const response = await customFetch.get("/users/admin/users");
//     console.log("API Response:", response); // Debug the response
//     // return response.data;
//     return response.data.users || [];
   
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     toast.error("You are not authorized to view this page");
//     return [];
//   }
// };

const columns = [
  { field: "id", headerName: "ID", flex: 1.6, headerClassName: "custom-header"  },
  { field: "name", headerName: "First Name", flex: 1, headerClassName: "custom-header" },
  { field: "lastName", headerName: "Last Name", flex: 1, headerClassName: "custom-header" },
  { field: "email", headerName: "Email", flex: 1.5,  headerClassName: "custom-header" },
  { field: "location", headerName: "Location", flex: 1,  headerClassName: "custom-header" },
  { field: "role", headerName: "Role", flex: 1,  headerClassName: "custom-header" },

];

const UserListTable = () => {
  // const users = useLoaderData();
   //const {users} = useQuery(userQuery);
   const { data: users = [], isLoading, isError } = useQuery(userQuery);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (Array.isArray(users) && users.length > 0) {
      const formattedRows = users.map((user, index) => ({
        id: user._id || `user-${index}`,
        name: user.name || "N/A",
        lastName: user.lastName || "N/A",
        email: user.email || "N/A",
        location: user.location || "Unknown",
        role: user.role || "N/A",

      }));
      setRows(formattedRows);
    }
  }, [users]);

  console.log("Final Rows:", rows);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching users</p>;

  return (
    <Wrapper sx={{ height: "100%", width: "100%", marginTop: 5,}}>
      <DataGrid
        rows={rows}
        columns={columns}
        sx={{
          "& .custom-header": {
            backgroundColor: "#ff6767", // Red header background
            color: "white",
            fontSize: "14px",
            fontWeight: "bold",
          },
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Wrapper>
  );
};

export default UserListTable;
