import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";

import { Link, useParams } from "react-router-dom";
import Issue from "./Issue";

function DynamicDataTable({ data, handleDelete }) {
  const [openModals, setOpenModals] = useState({}); 

  const handleOpenModal = (rowId) => {

    setOpenModals((prevModals) => ({
      ...prevModals,
      [rowId]: true,
    }));

  };

  const handleCloseModal = (rowId) => {

    setOpenModals((prevModals) => ({
      ...prevModals,
      [rowId]: false,
    }));
    
  };

  const navigate = useNavigate();

  const columns = [
      { field: "id", headerName: "S. No." , width:50 },
      { field: "bookName", headerName: "Book Name" },
      { field: "quantity", headerName: "Quantity" },
      { field: "category", headerName: "Category" },
      { field: "className", headerName: "Class Name" },
      { field: "subject", headerName: "Subject" },
      {
        field: "actions",
        headerName: "Actions",
        renderCell: (params) => (
        <div>        
          <IconButton
         
              onClick={() => handleOpenModal(params.row._id)}
              className="bg-blue-600 text-white "
          >
            
          <p className="bg-green-500 text-white p-0 rounded-xl">  Issue </p>
         
          </IconButton>
          {/* </div> */}
          <Issue
            isOpen={openModals[params.row._id] || false}
            onClose={() => handleCloseModal(params.row._id)}
            bookId={params.row._id} // Pass the book ID as a prop
          />

          <Link to={`/admin/books/return-book/${params.row._id}`}>
          <IconButton >
                
                <p className="bg-red-500 text-white p-0 rounded-lg"> Book Issued Student List</p>

          </IconButton>
          </Link>
         
        </div>
      ),
      width:500 ,innerHeight:200
    },
  ];

  const dataWithIds = Array.isArray(data)
    ? data.map((item, index) => ({ id: index + 1, ...item }))
    : [];

  return (
    <div className="h-[350px] mx-auto bg-white mt-2 rounded-md">
      <DataGrid rows={dataWithIds} columns={columns} />
    </div>
  );
}

export default DynamicDataTable;