import React,{useState,useEffect} from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from 'axios'

function DynamicDataTable({data , handleDelete}) {
  const navigate = useNavigate();

    const columns = [
      { field: "id", headerName: "S. No." , width:50 },
      { field: "fullName", headerName: "Full Name" , width:150 },
      { field: "employeeId", headerName: "Employee ID", width:100 },
      { field: "email", headerName: "Email",  width:150 },
      // { field: "dateOfBirth", headerName: "Date of Birth",  width:100 },
      // { field: "status", headerName: "Status",  width:100 },
      // { field: "qualification", headerName: "Qualification",  width:100 },
      { field: "salary", headerName: "Salary",  width:70 },
      // { field: "subject", headerName: "Subject",  width:100 },
      // { field: "gender", headerName: "Gender",  width:80 },
      { field: "joiningDate", headerName: "Joining Date",  width:106 },
      // { field: "address", headerName: "Address",  width:100 },
      { field: "contact", headerName: "Contact",  width:100 },
      { field: "experience", headerName: "Experience",  width:80 },
      // { field: "section", headerName: "Section",  width:100 },
      // { field: "class", headerName: "Class of Student",  width:80 },
        { field: "actions", headerName: "Actions", width: 150,
          renderCell: (params) => (
            <div>
              <Link to={`/admin/allteachers/view-profile/${params.row.email}`}>
                <IconButton>
                  <VisibilityIcon  className="text-blue-600"/>
                </IconButton>
              </Link>
              <Link to={`/admin/allteachers/edit-profile/${params.row.email}`}>
                <IconButton>
                  <EditIcon  className="text-green-600"/>
                </IconButton>
              </Link>
              <IconButton onClick={() => handleDelete(params.row.email)}>
                <DeleteIcon  className="text-red-600" />
              </IconButton>
            </div>
          ),
        },
      ];

  // Hide "No rows" overlay
  const NoRowsOverlay = () => null;
  
  const dataWithIds = Array.isArray(data) ? data.map((item, index) => ({ id: index + 1, ...item})) : [];
  return (
    // <div className="h-[400px] w-[900px] mx-auto mt-3">
    <div className="h-[350px]  mx-auto  bg-white mt-2 rounded-md">
      <DataGrid
        rows={dataWithIds}
        columns={columns}
        
      />
    </div>
  );
}

export default DynamicDataTable;


