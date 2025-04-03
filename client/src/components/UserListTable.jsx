import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Wrapper from '../assets/wrappers/UserListTable';

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
