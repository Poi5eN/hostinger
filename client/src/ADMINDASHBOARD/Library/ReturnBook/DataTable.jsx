import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";



function DynamicDataTable({ data, updateFetchData }) {



  const handleReturn= async (issueId)=>{

    try {

      const response = await axios.put(`http://localhost:4000/api/v1/adminRoute/returnBook/${issueId}`,{}, {
        withCredentials: true,
      })


      console.log("message", response.data.message);

      updateFetchData();

    }
    catch (error) {
      console.log("Error Message", error.message);
    }

  }

  const navigate = useNavigate();

    const columns = [
      { field: "id", headerName: "S. No." , width:50 },
      { field: "studentId", headerName: "Student Id" , flex:1},
      { field: "issueDate", headerName: "Issued Date",flex:1},
      
        { field: "actions", headerName: "Actions",flex:1,
          renderCell: (params) => (
            <div>
              {/* <Link to={`/admin/books/view-book/${params.row._id}`}> */}
                <IconButton onClick={() => handleReturn(params.row._id)}>
                
                  <p className="bg-gray-500 text-red-800 p-2 rounded-xl">Return</p>

                </IconButton>
              {/* </Link> */}
             
            </div>
          ),
        },
      ];

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


