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
      { field: "bookName", headerName: "Book Name" , flex:1},
      { field: "authorName", headerName: "Author Name",flex:1},
      { field: "quantity", headerName: "Quantity", flex:1 },
      { field: "category", headerName: "Category", flex:1 },
      { field: "className", headerName: "Class Name", flex:1 },
      { field: "subject", headerName: "Subject", flex:1 },


        { field: "actions", headerName: "Actions",flex:1,
          renderCell: (params) => (
            <div>
              <Link to={`/admin/books/view-book/${params.row._id}`}>
                <IconButton>
                  <VisibilityIcon  className="text-blue-600"/>
                </IconButton>
              </Link>
              <Link to={`/admin/books/edit-book/${params.row._id}`}>
                <IconButton>
                  <EditIcon  className="text-green-600"/>
                </IconButton>
              </Link>
              <IconButton onClick={() => handleDelete(params.row._id)}>
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


