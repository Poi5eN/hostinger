import React,{useState,useEffect} from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from 'axios'

function StockTable({data , handleDelete}) {
  const navigate = useNavigate();

    const columns = [
      { field: "id", headerName: "S. No." , width:50 },
      { field: "itemName", headerName: "Item Name" , width:150 },
      { field: "category", headerName: "Category", width:150 },
      { field: "quantity", headerName: "Quantity",  width:100 },
      { field: "price", headerName: "Price",  width:100 },
        { field: "actions", headerName: "Actions", width: 150,
          renderCell: (params) => (
            <div>
            {/* console.log("Params",params.row); */}
                  {/* <Link to={`/student/view-profile/${params.row.email}`}>
                <IconButton>
                  <VisibilityIcon  className="text-blue-600"/>
                </IconButton>
              </Link> */}
              <Link to={`/admin/stocks/editstock/${params.row._id}`}>
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
    // <div className="h-[400px] w-[900px] mx-auto mt-3">
    <div className="h-[350px]  mx-auto  bg-white mt-2 rounded-md">
      <DataGrid
        rows={dataWithIds}
        columns={columns}
        
      />
    </div>
  );
}

export default StockTable;


