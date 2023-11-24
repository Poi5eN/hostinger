import React, { useState, useEffect } from "react";
import InputForm from "../../..//Dynamic/Form/InputForm";
import { toast } from "react-toastify";
// import DataTable from "../../Dynamic/DataTable/DynamicDataTable";
import axios from "axios";
import DynamicDataTable from "./DataTable";

const modalStyle = {
  content: {
    width: "80%",
    margin: "0 auto",
    zIndex: 1000,
    borderRadius: "8px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
    border: "none",
  },
};

function CreateParents() {

  const [submittedData, setSubmittedData] = useState([]);

  useEffect(() => {
    // Fetch data from the server when the component mounts
    axios.get('/api/v1/adminRoute/getAllParents', 
    {
      withCredentials: true, // Set withCredentials to true
    })
      .then((response) => {
        setSubmittedData(response.data.allParent);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // setSubmittedData(response.data.allParent[0])
        // Handle the error gracefully, e.g., show an error message to the user
      });
  }, []);

  const handleDelete = (email) => {
    axios.put(`/api/v1/adminRoute/deactivateParent`, {email}, {
      withCredentials: true,
    })
      .then((response) => {
        console.log("Parent data deleted successfully");
  
        // Update the state to remove the deleted data from the data table
        const updatedData = submittedData.filter((item) => item.email !== email);
        setSubmittedData(updatedData);
        toast.success("Parent data deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting Parent data:", error);
        toast.error("An error occurred while deleting the Parent data.");
      });
  };
  

  return (
    <div className=" mt-12  w-[900px] mx-auto p-3">
      <DynamicDataTable data={submittedData} handleDelete={handleDelete} />
    </div>
  );
}

export default CreateParents;
