import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

function DynamicDataTable({ data, handleDelete }) {
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingItemId, setDeletingItemId] = useState(null);

  const handleDeleteClick = (itemId) => {
    setDeletingItemId(itemId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    handleDelete(deletingItemId);
    setDeleteDialogOpen(false);
    setDeletingItemId(null);
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setDeletingItemId(null);
  };

  // const columns = [
  //   { field: "id", headerName: "S. No.", width: 50 },
  //   { field: "fullName", headerName: "Student Name", width: 150 },
  //   { field: "email", headerName: "Email", width: 150 },
  //   // { field: "studentDateOfBirth", headerName: "Date of Birth",  width:100 },
  //   { field: "rollNo", headerName: "Roll No", width: 100 },
  //   // { field: "studentGender", headerName: "Gender",  width:80 },
  //   // { field: "studentJoiningDate", headerName: "Joining Date",  width:106 },
  //   // { field: "studentAddress", headerName: "Address",  width:100 },
  //   { field: "contact", headerName: "Contact", width: 100 },
  //   { field: "class", headerName: "Class", width: 80 },
  //   { field: "section", headerName: "Section", width: 100 },
  //   // { field: "studentCountry", headerName: "Country",  width:70 },
  //   // { field: "studentSubject", headerName: "Subject",  width:100 },
  //   // { field: "fatherName", headerName: "Father Name",  width:80 },
  //   // { field: "motherName", headerName: "Mother Name",  width:80 },
  //   // { field: "parentContact", headerName: "Parent Contact",  width:80 },
  //   {
  //     field: "actions",
  //     headerName: "Actions",
  //     width: 300,
  //     renderCell: (params) => (
  //       <div>
  //         <Link
  //           to={`/admin/allstudent/viewstudent/view-profile/${params.row.email}`}
  //         >
  //           <IconButton>
  //             <VisibilityIcon className="text-blue-600" />
  //           </IconButton>
  //         </Link>

  //         <Link
  //           to={`/admin/allstudent/editstudent/edit-profile/${params.row.email}`}
  //         >
  //           <IconButton>
  //             <EditIcon className="text-green-600" />
  //           </IconButton>
  //         </Link>
  //         <IconButton onClick={() => handleDelete(params.row.email)}>
  //           <DeleteIcon className="text-red-600" />
  //         </IconButton>
  //         <Link to={`/admin/allstudent/StudentFeeStatus/${params.row.email}`}>
  //           <IconButton>
  //             <p className="bg-pink-500 py-3  text-white p-2">Fee status </p>
  //           </IconButton>
  //         </Link>
  //       </div>
  //     ),
  //   },
  // ];

  const columns = [
    { field: "id", headerName: "S. No.", width: 50 },
    { field: "fullName", headerName: "Student Name", width: 150 },
    { field: "email", headerName: "Email", width: 150 },
    // { field: "studentDateOfBirth", headerName: "Date of Birth",  width:100 },
    { field: "rollNo", headerName: "Roll No", width: 100 },
    // { field: "studentGender", headerName: "Gender",  width:80 },
    // { field: "studentJoiningDate", headerName: "Joining Date",  width:106 },
    // { field: "studentAddress", headerName: "Address",  width:100 },
    { field: "contact", headerName: "Contact", width: 100 },
    { field: "class", headerName: "Class", width: 80 },
    { field: "section", headerName: "Section", width: 100 },

    {
      field: "actions",
      headerName: "Actions",
      width: 300,
      renderCell: (params) => (
        <div>
          <Link
            to={`/admin/allstudent/viewstudent/view-profile/${params.row.email}`}
          >
            <IconButton>
              <VisibilityIcon className="text-blue-600" />
            </IconButton>
          </Link>

          <Link
            to={`/admin/allstudent/editstudent/edit-profile/${params.row.email}`}
          >
            <IconButton>
              <EditIcon className="text-green-600" />
            </IconButton>
          </Link>
          <IconButton onClick={() => handleDeleteClick(params.row.email)}>
            <DeleteIcon className="text-red-600" />
          </IconButton>
          <Link to={`/admin/allstudent/StudentFeeStatus/${params.row.email}`}>
            <IconButton>
              <p className="bg-pink-500 py-3  text-white p-2">Fee status</p>
            </IconButton>
          </Link>
        </div>
      ),
    },
  ];

  const NoRowsOverlay = () => null;

  const dataWithIds = Array.isArray(data)
    ? data.map((item, index) => ({ id: index + 1, ...item }))
    : [];

  return (
    <div className="h-[350px] mx-auto bg-white mt-2 rounded-md">
      <DataGrid rows={dataWithIds} columns={columns} />
      <Dialog open={deleteDialogOpen} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you really want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            No
          </Button>
          <Button onClick={handleConfirmDelete} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DynamicDataTable;
