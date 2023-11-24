import React, { useState, useEffect } from "react";

import axios from "axios";
import '../../Dynamic/Form/FormStyle.css'
import InputForm from "../../Dynamic/Form/InputForm";

import DynamicDataTable from "./DataTable";
const modalStyle = {
  content: {
    width: "80%",
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1000,
  },
};

function CreatePayment() {
  const [loading,setLoading]=useState(false)
 
  const [submittedData, setSubmittedData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetch data from the server when the component mounts
    axios.get('http://localhost:4000/api/v1/adminRoute/getTeachers', {
      withCredentials: true, // Set withCredentials to true
    })
    .then((response) => {
      if (Array.isArray(response.data.data)) {
        // Update the state with the array
        setSubmittedData(response.data.data);
        console.log(response.data.data);
      } else {
        console.error("Data format is not as expected:", response.data);
      }
    })
    
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);



  return (
    <div className=" mt-12  mx-auto p-3">
      <h1 className="text-2xl font-bold mb-4">Payment Status</h1>
      
      <DynamicDataTable
       data={submittedData} 
      // handleDelete={handleDelete}
      />
    </div>
  );
}

export default CreatePayment;