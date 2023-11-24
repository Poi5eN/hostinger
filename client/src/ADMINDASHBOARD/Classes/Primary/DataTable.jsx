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
     
      { field: "className", headerName: "Class" , flex:1},
      { field: "subject", headerName: "subject",flex:1},
      { field: "section", headerName: "Section", flex:1 },

        { field: "actions", headerName: "Actions",flex:1,
          renderCell: (params) => (
            <div>
              <Link to={`/admin/primary/view-primary/${params.row.className}`}>
                <IconButton>
                  <VisibilityIcon  className="text-blue-600"/>
                </IconButton>
              </Link>
              <Link to={`/admin/primary/edit-primary/${params.row.className}`}>
                <IconButton>
                  <EditIcon  className="text-green-600"/>
                </IconButton>
              </Link>
              <IconButton onClick={() => handleDelete(params.row.className)}>
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
  
    <div className="h-[350px]  mx-auto  bg-white mt-2 rounded-md">
      <DataGrid
        rows={dataWithIds}
        columns={columns}
        
      />
    </div>
  );
}

export default DynamicDataTable;


