import React, { useState, useEffect } from "react";
import InputForm from "../../../Dynamic/Form/InputForm";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams , useNavigate } from "react-router-dom";


function Edit_Classwise_Fees() {
  const navigate = useNavigate();
  const { _id } = useParams();
  const [formData, setFormData] = useState({
    className:"",
    feeType:"",
    amount:"",
  });
  
  const [submittedData, setSubmittedData] = useState({});

  const handleFieldChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const handleSubmit = async () => {
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "image") {
        formDataToSend.append(key, String(value));
      }
    });

    try {
      const response = await axios.put(
        `http://localhost:4000/api/v1/adminRoute/updateFees/${_id}`,
        formDataToSend,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json", // Use multipart/form-data for file uploads
          },
        }
      );
      setFormData(response.data);
      navigate("/admin/classwise");
      toast.success("Fees Updated successfully!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while updating the item.");
    }
  };

  useEffect(() => {
    axios.get(`http://localhost:4000/api/v1/adminRoute/getFees?_id=${_id}`, {
      withCredentials: true,
    })
    .then((response) => {
      const  data  = response.data[0];
      setSubmittedData(data);
      setFormData((prevFormData) => ({
        ...prevFormData,
        ...data,
      }));
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  }, [_id]);
  
  const formFields = [
  
    {
      label: "Class",
      name: "className",
      type: "select",
      value: formData.className,
      required: true,
      selectOptions:["Class", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]

    },
    {
      label: "Fee Type",
      name: "feeType",
      type: "select", 
      value: formData.feeType,
      required: true,
      selectOptions: ['Fee Type',"Monthly", "Quarterly", "Half Yearly", "Annually"], 
    },
    {
      label: "Amount",
      name: "amount",
      type: "number",
      value: formData.amount,
      required: true,
    
    },
   
  ];

  return (
    <div className="mt-12 w-[900px] mx-auto p-3">
      
      <InputForm
        fields={formFields}
        handleChange={handleFieldChange}
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 hoverbg-blue-600 text-white py-2 px-4 rounded w-full"
      >
        Update Fees
      </button>
    </div>
  );
}

export default Edit_Classwise_Fees;
