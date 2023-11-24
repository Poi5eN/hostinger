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
      { field: "email", headerName: "Email", width:250 },
      { field: "fatherName", headerName: "Father Name" , width:150 },
      { field: "motherName", headerName: "Mother Name" , width:150 },
      { field: "parentContact", headerName: "Contact",  width:150 },
        // { field: "Delete", headerName: "Actions", width: 150,
        //   renderCell: (params) => (
        //     <div>
        //       {/* <IconButton onClick={() => handleDelete(params.row.email)}>
        //         <DeleteIcon  className="text-red-600" />
        //       </IconButton> */}
        //     </div>
        //   ),
        // },
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


