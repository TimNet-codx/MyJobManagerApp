import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import customFetch from "../utils/customFetch";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Wrapper from '../assets/wrappers/UserListTable';
import { Button, Dialog, DialogDismiss, DialogHeading } from "@ariakit/react";

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

const UserListTable = () => {
  const queryClient = useQueryClient();
  const { data: users = [], isLoading, isError } = useQuery(userQuery);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const deleteMutation = useMutation({
    mutationFn: async (_id) => {
      try {
        const response = await customFetch.delete(`/users/admin/${_id}`);
        return response.data; // Ensure response is handled correctly
      } catch (error) {
        console.error("Error deleting user:", error.response?.data || error.message);
        toast.error(error.response?.data?.message || "Failed to delete user");
        throw error;
      }
    },
    onSuccess: (_, _id) => {
      toast.success("User deleted successfully");
  
      // Remove user from local UI state
      setRows((prevRows) => prevRows.filter((row) => row.id !== _id));
  
      queryClient.invalidateQueries(["users"]); //Ensure fresh data
      setOpen(false); //Close modal after delete
    },
    onError: () => {
      toast.error("Failed to delete user");
      setOpen(false);
    }
  });
  

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

  const handleDeleteClick = (_id) => {
    console.log("Selected user for deletion:", _id); 
    setSelectedUserId(_id);
    setOpen(true);
  };
  
  const handleConfirmDelete = () => {
    if (selectedUserId) {
      deleteMutation.mutate(selectedUserId);
    }
  };

  // Columns including the delete button
  const columns = [
    { field: "id", headerName: "ID", flex: 1.6, headerClassName: "custom-header" },
    { field: "name", headerName: "First Name", flex: 1, headerClassName: "custom-header" },
    { field: "lastName", headerName: "Last Name", flex: 1, headerClassName: "custom-header" },
    { field: "email", headerName: "Email", flex: 1.5, headerClassName: "custom-header" },
    { field: "location", headerName: "Location", flex: 1, headerClassName: "custom-header" },
    { field: "role", headerName: "Role", flex: 1, headerClassName: "custom-header" },
    {
      field: "delete",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <button
          variant="contained"
          type="button"
          className="btn delete-btn"
          onClick={() => handleDeleteClick(params.row.id)}
        >
          Delete
        </button>
      ),
    }
  ];

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching users</p>;

  return (
    <Wrapper sx={{ height: "100%", width: "100%", marginTop: 5 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        sx={{
          "& .custom-header": {
            backgroundColor: "#ff6767",
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

      {/* Delete Confirmation Dialog */}
      <Dialog
  open={open}
  onClose={() => setOpen(false)}
  getPersistentElements={() => document.querySelectorAll(".Toastify")}
  backdrop={<div className="backdrop" />}
  className="dialog"
>
  <DialogHeading className="heading">Delete User</DialogHeading>
  <hr />
  <p className="description">Are you sure you want to delete this user?</p>
  <div className="buttons">
    <button
      type="button"
      className={`btn delete-btn ${deleteMutation.isLoading ? 'loading' : ''}`} // Add a loading class for styling
      onClick={handleConfirmDelete}
      disabled={deleteMutation.isLoading} // Disable button while deleting
    >
      {deleteMutation.isLoading ? 'Deleting...' : 'Yes'}
    </button>
    <DialogDismiss className="btn secondary" disabled={deleteMutation.isLoading}>
      Cancel
    </DialogDismiss>
  </div>
</Dialog>
    </Wrapper>
  );
};

export default UserListTable;

// import React, { useState } from "react";
// import { DataGrid } from "@mui/x-data-grid";
// import { useLoaderData, useNavigation } from "react-router-dom";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { toast } from "react-toastify";
// import customFetch from "../utils/customFetch";
// import Wrapper from "../assets/wrappers/UserListTable";
// import { Button, Dialog, DialogDismiss, DialogHeading } from "@ariakit/react";

// // ✅ Fetch Users Query
// const userQuery = {
//   queryKey: ["users"],
//   queryFn: async () => {
//     try {
//       const { data } = await customFetch.get("/users/admin/users");
//       return data.users || [];
//     } catch (error) {
//       console.error("Error fetching users:", error);
//       toast.error("You are not authorized to view this page");
//       throw new Error("Failed to fetch users");
//     }
//   },
// };

// // ✅ Loader function for user data
// export const loader = (queryClient) => async () => {
//   await queryClient.ensureQueryData(userQuery);
//   return null;
// };

// // ✅ Action function for deleting a user
// export const action = (queryClient) => async ({ _id }) => {
//   try {
//     await customFetch.delete(`/users/admin/${_id}`);
//     queryClient.invalidateQueries(["users"]); // Refresh user list
//     toast.success("User deleted successfully");
//     return null;
//   } catch (error) {
//     toast.error(error.response?.data?.message || "Failed to delete user");
//     return error;
//   }
// };

// const UserListTable = () => {
//   const queryClient = useQueryClient();
//   const { data: users = [] } = useQuery(userQuery);
//   const navigation = useNavigation();
//   const isSubmitting = navigation.state === "submitting";

//   const [open, setOpen] = useState(false);
//   const [selectedUserId, setSelectedUserId] = useState(null);

//   // ✅ Delete Mutation
//   const deleteMutation = useMutation({
//     mutationFn: async (_id) => {
//       try {
//         await customFetch.delete(`/users/admin/${_id}`);
//         queryClient.invalidateQueries(["users"]); // Ensure fresh data
//         toast.success("User deleted successfully");
//         return true;
//       } catch (error) {
//         toast.error(error.response?.data?.message || "Failed to delete user");
//         return false;
//       }
//     },
//     onSuccess: () => {
//       setOpen(false); // Close modal after delete
//     },
//     onError: () => {
//       setOpen(false);
//     },
//   });

//   // Handle delete button click
//   const handleDeleteClick = (_id) => {
//     setSelectedUserId(_id);
//     setOpen(true);
//   };

//   // Confirm deletion
//   const handleConfirmDelete = () => {
//     if (selectedUserId) {
//       deleteMutation.mutate(selectedUserId);
//     }
//   };

//   // Table columns
//   const columns = [
//     { field: "id", headerName: "ID", flex: 1.6, headerClassName: "custom-header" },
//     { field: "name", headerName: "First Name", flex: 1, headerClassName: "custom-header" },
//     { field: "lastName", headerName: "Last Name", flex: 1, headerClassName: "custom-header" },
//     { field: "email", headerName: "Email", flex: 1.5, headerClassName: "custom-header" },
//     { field: "location", headerName: "Location", flex: 1, headerClassName: "custom-header" },
//     { field: "role", headerName: "Role", flex: 1, headerClassName: "custom-header" },
//     {
//       field: "delete",
//       headerName: "Actions",
//       flex: 1,
//       renderCell: (params) => (
//         <button
//           type="button"
//           className="btn delete-btn"
//           onClick={() => handleDeleteClick(params.row.id)}
//         >
//           Delete
//         </button>
//       ),
//     },
//   ];

//   return (
//     <Wrapper sx={{ height: "100%", width: "100%", marginTop: 5 }}>
//       <DataGrid
//         rows={users.map((user, index) => ({
//           id: user._id || `user-${index}`,
//           name: user.name || "N/A",
//           lastName: user.lastName || "N/A",
//           email: user.email || "N/A",
//           location: user.location || "Unknown",
//           role: user.role || "N/A",
//         }))}
//         columns={columns}
//         sx={{
//           "& .custom-header": {
//             backgroundColor: "#ff6767",
//             color: "white",
//             fontSize: "14px",
//             fontWeight: "bold",
//           },
//         }}
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

//       {/* Delete Confirmation Dialog */}
//       <Dialog open={open} onClose={() => setOpen(false)} className="dialog">
//         <DialogHeading className="heading">Delete User</DialogHeading>
//         <hr />
//         <p className="description">Are you sure you want to delete this user?</p>
//         <div className="buttons">
//           <button
//             type="button"
//             className={`btn delete-btn ${deleteMutation.isLoading ? "loading" : ""}`}
//             onClick={handleConfirmDelete}
//             disabled={deleteMutation.isLoading}
//           >
//             {deleteMutation.isLoading ? "Deleting..." : "Yes"}
//           </button>
//           <DialogDismiss className="btn secondary" disabled={deleteMutation.isLoading}>
//             Cancel
//           </DialogDismiss>
//         </div>
//       </Dialog>
//     </Wrapper>
//   );
// };

// export default UserListTable;

