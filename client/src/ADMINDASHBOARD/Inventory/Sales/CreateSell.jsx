import React, { useState, useEffect } from "react";
// import InputForm from "../../../Dynamic/Form/InputForm";
// import { toast } from "react-toastify";
// import Modal from "react-modal";
import axios from "axios";
import StockTable from "./StockDataTable";

// const modalStyle = {
//   content: {
//     width: "80%",
//     margin: "0 auto",
//     zIndex: 1000,
//     borderRadius: "8px",
//     boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
//     border: "none",
//   },
// };
// const { itemId, itemName, category, price, sellQuantity, totalAmount }
//  const post_api ="http://localhost:4000/api/v1/inventory/createsellItem";

function CreateSell() {
  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    quantity: "",
    price: "",


  });
  const [submittedData, setSubmittedData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shouldFetchData, setShouldFetchData] = useState(false);


  const handleFieldChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const updateDependency = () => {
    setShouldFetchData(!shouldFetchData);
  }


  // const handleSubmit = async () => {
  //   const formDataToSend = new FormData();
  //   Object.entries(formData).forEach(([key, value]) => {
  //     if (key !== "image") {
  //       formDataToSend.append(key, String(value));
  //     }
  //   });
  //   console.log(formDataToSend)

  //   try {
  //     // setLoading(true)
  //     const response = await axios.post(
  //       "http://localhost:4000/api/v1/adminRoute/createItem",
  //       formDataToSend,
  //       {
  //         withCredentials: true,
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     console.log(response)
  //     setSubmittedData([...submittedData, formData]);
  //     console.log(submittedData)
  //     setFormData(
  //       {
  //         itemName: "",
  //         category: "",
  //         quantity: "",
  //         price: "",
  //       }
  //     )
  //     // setLoading(false)
  //     toast.success("Form submitted successfully!");
  //     setShouldFetchData(true)
  //     closeModal();
  //   } catch (error) {
  //     console.error("Error:", error);
  //     toast.error("An error occurred while submitting the form.");
  //   }
  // };

  // const handleDelete = (itemId) => {
  //   axios.delete(`http://localhost:4000/api/v1/adminRoute/deleteItem/${itemId}`, {
  //     withCredentials: true
  //   })
  //     .then((response) => {
  //       console.log("Item deleted successfully");

  //       // Update the state to remove the deleted data from the data table
  //       const updatedData = submittedData.filter((item) => item._id !== itemId);
  //       setSubmittedData(updatedData);

  //       toast.success("Item deleted successfully");
  //     })
  //     .catch((error) => {
  //       console.error("Error deleting Item:", error);
  //       toast.error("An error occurred while deleting the Item.");
  //     });
  // };

  // const openModal = () => {
  //   setIsModalOpen(true);
  // };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };

  // const formFields = [
  //   {
  //     label: "Item Name",
  //     name: "itemName",
  //     type: "text",
  //     value: formData.itemName,
  //     required: true,
  //   },
  //   {
  //     label: "Category",
  //     name: "category",
  //     type: "text",
  //     value: formData.category,
  //     required: true,
  //   },
  //   {
  //     label: "Quantity",
  //     name: "quantity",
  //     type: "number",
  //     value: formData.quantity,
  //     required: true,
  //   },
  //   {
  //     label: "Price",
  //     name: "price",
  //     type: "number",
  //     value: formData.price,
  //     required: true,
  //   },

  // ];

  // const handleFormSubmit = (e) => {
  //   e.preventDefault();

  //   const formDataToSend = new FormData();
  //   formDataToSend.append("academicYear", formData.academicYear);
  //   formDataToSend.append("className", formData.className);
  //   formDataToSend.append("course", formData.course);
  //   formDataToSend.append("image", formData.image);

  //   axios
  //     .post("http://localhost:4000/api/v1/adminRoute/inventory/createsellItem", formDataToSend, {
  //       withCredentials: true,
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     })
  //     .then((response) => {
  //       console.log("Curriculum created successfully!");
  //       setFormData({ academicYear: '2023-2024',  className: '', course: '', image: null });

  //       setShouldFetchData(!shouldFetchData);
  //     })
  //     .catch((error) => {
  //       console.error('Error creating curriculum:', error);
  //     });
  // };

  useEffect(() => {

    axios.get('http://localhost:4000/api/v1/adminRoute/getAllItems', {
      withCredentials: true, // Set withCredentials to true
    })
      .then((response) => {
        console.log("hereIAM")
        setSubmittedData(response.data.listOfAllItems);
      })

      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [shouldFetchData]);

  return (
    <div className=" mt-12  w-[900px] mx-auto p-3">
      <h1 className="text-2xl font-bold mb-4">Products Sell</h1>
      {/* <button
        onClick={openModal}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full"
      >
        Create Stock
      </button>

      
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Create Form"
        style={modalStyle}
        overlayClassName="overlay"
      >
        <h1 style={{ fontSize: 30, fontWeight: 800, textAlign: "center" }}>
          Create Stock
        </h1>
        <InputForm
          fields={formFields}
          handleChange={handleFieldChange}
          // handleImageChange={handleImageChange}
        />
        <div style={{ display: "flex", justifyContent: "flex-end", padding: "10px" }}>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Submit
          </button>
          <button onClick={closeModal} className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded">
            Cancel
          </button>
        </div>
      </Modal> */}

      <StockTable data={submittedData} updateDependency={updateDependency}
      //  handleDelete={handleDelete}
      />
    </div>
  );
}

export default CreateSell;
