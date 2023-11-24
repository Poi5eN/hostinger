import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import axios from 'axios'

function StockTable({ data, handleDelete, updateDependency }) {
  console.log("data", data.sellAmount)
  data.map((item)=>{
    console.log(item.sellAmount)
  })
  // {
  //   data.map((item)=>{
  //       <div>
  //         {
  //           console.log("item",item.price
  //           )
  //         }
  //       </div>
  //   })
  // }
  const navigate = useNavigate();

  const [counts, setCounts] = useState({});

  const decrement = (id) => {
    setCounts((prevCounts) => {
      const newCounts = { ...prevCounts };
      if (newCounts[id] > 0) {
        newCounts[id] -= 1;
      }
      return newCounts;
    });
  };

  const increment = (id) => {
    setCounts((prevCounts) => {
      const newCounts = { ...prevCounts };
      newCounts[id] = (newCounts[id] || 0) + 1;
      return newCounts;
    });
  };

  const handleSell = (row) => {
    const sellQuantity = counts[row.id]
    const totalAmount = counts[row.id] * row.price
    const quantity = row.quantity - counts[row.id]
    console.log("sellQuantity", sellQuantity );
    console.log("Totalamount", totalAmount )
    // Create the data object to send in the POST request
    // const { itemId, itemName, category, price, sellQuantity, totalAmount }
    const postData = {
      itemName: row.itemName,
      category: row.category,
      quantity: quantity,
      price: row.price,
      sellQuantity: sellQuantity,
      totalAmount: totalAmount,
      itemId: row._id,

      // Add any other data you want to send
    };
    console.log("POSTDATA---->", postData)

    // Perform the POST request to your API endpoint
    axios.post("http://localhost:4000/api/v1/inventory/createsellItem", postData,
      {
        withCredentials: true
      }
    )
      .then((response) => {
        // Handle success, e.g., display a success message
        console.log("Sell request successful", response.data);
        setCounts(0)
      })
      .catch((error) => {
        // Handle errors, e.g., display an error message
        console.error("Sell request failed", error);
      });

      updateDependency();
  };

  const columns = [
    { field: "id", headerName: "S. No.", width: 50 },
    { field: "itemName", headerName: "Item Name", width: 100 },
    { field: "category", headerName: "Category", width: 100 },
    { field: "quantity", headerName: "Quantity", width: 80 },
    { field: "price", headerName: "Price", width: 70 },
    {field: "sellAmount", headerName: "Total Sale", width: 90},
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <div className="flex justify-center items-center">

          <button
            className="w-8 h-8 bg-green-400 text-white rounded-full"
            onClick={() => decrement(params.row.id)}
          >
            -
          </button>

          <p className="px-2">{counts[params.row.id] || 0}</p>
          <button
            className="w-8 h-8 bg-green-400 text-white rounded-full"
            onClick={() => increment(params.row.id)}
          >
            +
          </button>
        </div>
      ),
    },

    {
      field: "amount",
      headerName: "Total Amount",
      width: 100,
      renderCell: (params) => {
        // Calculate the total amount by multiplying count and item price
        // const counts = { /* your counts object here */ };
        const totalAmount = (counts[params.row.id] || 0) * params.row.price;
        console.log("-----------totalAmount", totalAmount)

        return (
          <div className="flex justify-center items-center p-5">
            <p>{totalAmount}</p>
          </div>
        );
      },
    },
    
    
    {
      field: "sell",
      headerName: "Sell",
      width: 100,
      renderCell: (params) => (
        <div className="flex justify-center items-center">
          <IconButton
            onClick={() => handleSell(params.row)}

            color="primary"
          >
            Sell
          </IconButton>
        </div>
      ),
    },
    // {
    //   field: "sellAmount",
    //   headerName: "Total Sale",
    //   width: 100,
    //   renderCell: (params) => (
    //     <div className="flex justify-center items-center">
    //       {/* <IconButton
    //         onClick={() => handleSell(params.row._id)}
    //         color="primary"
    //       >
    //         Sell
    //       </IconButton> */}
    //       <p>{}</p>
    //     </div>
    //   ),
    // }, 
  ];

  // Hide "No rows" overlay
  const NoRowsOverlay = () => null;
  

  const dataWithIds = Array.isArray(data)
    ? data.map((item, index) => ({ id: index + 1, ...item }))
    : [];

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


