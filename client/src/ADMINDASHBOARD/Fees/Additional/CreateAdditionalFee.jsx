import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Modal from "react-modal";
import axios from "axios";
import './../../../Dynamic/Form/FormStyle.css'
// import InputForm from "../../../components/Dynamic/Form/InputForm";
// import InputForm from "../../Dynamic/Form/InputForm";
import InputForm from "./../../../Dynamic/Form/InputForm";
import Additional_Fees_DataTable from "./DataTable";
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

function CreateAdditionalFee() {
  const [loading,setLoading]=useState(false)
  const [formData, setFormData] = useState({
    name:"",
    feeType:"",
    amount:"",
  });
  const [submittedData, setSubmittedData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shouldFetchData, setShouldFetchData] = useState(false);

  useEffect(() => {
    // Fetch data from the server when the component mounts
    axios.get('http://localhost:4000/api/v1/adminRoute/getAdditionalFees', {
      withCredentials: true, 
    })
    .then((response) => {
        setSubmittedData(response.data);
    })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [shouldFetchData]);

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
    console.log(formDataToSend)

    try {
      setLoading(true)
      const response = await axios.post(
        "http://localhost:4000/api/v1/adminRoute/createAdditionalFees",
        formDataToSend,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        
        }
      );
      setFormData({
        name:"",
        feeType:"",
        amount:"",
      });
      setSubmittedData([...submittedData, formData]);
      setLoading(false)
      toast.success("Form submitted successfully!");
      setShouldFetchData(true)
      closeModal();
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while submitting the form.");
    }
  };

  const handleDelete = (itemId) => {
    axios.delete(`http://localhost:4000/api/v1/adminRoute/deleteFees/${itemId}`, {
      withCredentials: true
    })
      .then((response) => {
        console.log("Fees deleted successfully");
  
        // Update the state to remove the deleted data from the data table
        const updatedData = submittedData.filter((item) => item._id !== itemId);
        setSubmittedData(updatedData);
  
        toast.success("Fees deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting Fees:", error);
        toast.error("An error occurred while deleting the Fees.");
      });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
    <div className=" mt-12  mx-auto p-3">
      {console.log("anandi")}
      <h1 className="text-2xl font-bold mb-4">Create Additional Fee</h1>
      <button
        onClick={openModal}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full"
      >
        Add Additional Fee
      </button>
      {isModalOpen && <div className="modal-blur"></div>}
      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Create Form"
        style={modalStyle}
        overlayClassName="overlay"
      >
        <h1 style={{ fontSize: 30, fontWeight: 800, textAlign: "center" }}>
          Create Additional Fee
        </h1>
        <InputForm
          fields={formFields}
          handleChange={handleFieldChange}
        />
        <div style={{ display: "flex", justifyContent: "flex-end", padding: "10px" }}>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            
          >
           { loading ?
               ( <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
               <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
           </svg>): " Submit"
            }
          </button>
          <button onClick={closeModal} className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded">
            Cancel
          </button>
        </div>
      </Modal>

      <Additional_Fees_DataTable data={submittedData} handleDelete={handleDelete}/>
    </div>
  );
}

export default CreateAdditionalFee;
