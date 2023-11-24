import React, { useState, useEffect } from "react";
import InputForm from "../../../Dynamic/Form/InputForm";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams , useNavigate } from "react-router-dom";


function EditAdditional() {
  const navigate = useNavigate();
  const { _id } = useParams();
  console.log(_id)
  const [formData, setFormData] = useState({
    name:"",
    feeType:"",
    amount:"",
  });
  
  const [submittedData, setSubmittedData] = useState([]);

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
            "Content-Type": "application/json", 
          },
        }
      );
      console.log(response);
      setFormData(response.data);
      navigate("/admin/additional");
      toast.success("Fees Updated successfully!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while updating the item.");
    }
  };

  useEffect(() => {
    // Fetch data from the server when the component mounts
    axios.get(`http://localhost:4000/api/v1/adminRoute/getAdditionalFees?_id=${_id}`, {
      withCredentials: true, 
    })
    .then((response) => {
      setFormData({ ...response.data[0] });
    })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [_id]);

  const formFields = [
  
    {
      label: "Name",
      name: "name",
      type: "text",
      value: formData.name,
      required: true,
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

export default EditAdditional;
