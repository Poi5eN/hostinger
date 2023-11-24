// import React, { useState } from 'react';

// const Study = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [materials, setMaterials] = useState([]);
//   const [newMaterial, setNewMaterial] = useState({
//     title: '',
//     type: 'Video',
//     link: '',
//   });


//   const API_POST_URL = "api/v1/createStudyMaterial";
// const API_DELETE = "/api/v1/adminRoute/deleteNotice/";
// const API_GET_DATA = "api/v1/deleteStudyMaterial";

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const addMaterial = () => {
//     setMaterials([...materials, newMaterial]);
//     setNewMaterial({ title: '', type: 'Video', link: '' });
//     closeModal();
//   };

//   const deleteMaterial = (index) => {
//     const updatedMaterials = [...materials];
//     updatedMaterials.splice(index, 1);
//     setMaterials(updatedMaterials);
//   };

//   return (
//     <div className="p-4 text-center bg-gray-100 min-h-screen">
//       <h1 className="text-3xl text-blue-900 mb-4">Study Materials</h1>

//       <button
//         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         onClick={openModal}
//       >
//         Add Material
//       </button>

//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center z-50">
//           <div className="modal-container">
//             <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//               <h2 className="text-2xl mb-4 text-blue-500">Add New Material</h2>
//               <input
//                 type="text"
//                 placeholder="Title"
//                 className="w-full border rounded p-2 mb-2"
//                 value={newMaterial.title}
//                 onChange={(e) =>
//                   setNewMaterial({ ...newMaterial, title: e.target.value })
//                 }
//               />
//               <div className="mb-2">
//                 <label htmlFor="materialType">Material Type</label>
//                 <select
//                   id="materialType"
//                   className="w-full border rounded p-2"
//                   value={newMaterial.type}
//                   onChange={(e) =>
//                     setNewMaterial({ ...newMaterial, type: e.target.value })
//                   }
//                 >
//                   <option value="Video">Video</option>
//                   <option value="PDF">PDF</option>
//                   <option value="YouTube">YouTube</option>
//                   <option value="Notes">Notes</option>
//                 </select>
//               </div>
//               {(newMaterial.type === 'PDF' || newMaterial.type === 'Notes') && (
//                 <input
//                   type="file"
//                   accept=".pdf"
//                   className="w-full border rounded p-2 mb-4"
//                 />
//               )}
//               {(newMaterial.type === 'Video' || newMaterial.type === 'YouTube') && (
//                 <input
//                   type="text"
//                   placeholder={`Link (e.g., YouTube URL)`}
//                   className="w-full border rounded p-2 mb-4"
//                   value={newMaterial.link}
//                   onChange={(e) =>
//                     setNewMaterial({ ...newMaterial, link: e.target.value })
//                   }
//                 />
//               )}
//               <div className="flex justify-end">
//                 <button
//                   className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
//                   onClick={addMaterial}
//                 >
//                   Add
//                 </button>
//                 <button
//                   className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
//                   onClick={closeModal}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="mt-8">
//       <div className="grid gap-7 xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1  p-3">
//         {materials.map((material, index) => (
//           <div
//             key={index}
//             className="bg-white p-4 rounded mb-4 shadow-lg border border-blue-500"
//           >
//             <h3 className="text-xl font-semibold mb-2 text-blue-500">
//               {material.title}
//             </h3>
//             <p className="text-lg">Type: {material.type}</p>
//             <div className="mt-4">
//               {material.type === 'PDF' || material.type === 'Notes' ? (
//                 <a
//                   href={material.link}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-500 hover:underline text-lg"
//                 >
//                   View PDF
//                 </a>
//               ) : (material.type === 'Video' || material.type === 'YouTube') ? (
//                 <a
//                   href={material.link}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-500 hover:underline text-lg"
//                 >
//                   View Video
//                 </a>
//               ) : (
//                 <p className="text-lg text-blue-500 hover:underline">View Notes</p>
//               )}
//             </div>
//             <button
//               className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mt-4"
//               onClick={() => deleteMaterial(index)}
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>
//       </div>
//     </div>
//   );
// };

// export default Study;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Study = () => {
  const [fetchData, setFetchData] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [materials, setMaterials] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    link: '',
    image: null ,

  });

const API_BASE_URL="api/v1/teacher"
  const API_POST_URL = "api/v1/createStudyMaterial";
const API_DELETE = "/api/v1/adminRoute/deleteNotice/";
const API_GET_DATA = "api/v1/deleteStudyMaterial";

// const [submittedData, setSubmittedData] = useState([]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file)
    if (file) {
      setFormData({
        ...formData,
        image: file,
      });
    }
  };

  const addMaterial = () => {
    // Create a new material and send a POST request to the server
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      // if (key === "image") continue;
      // formDataToSend.append(key, String(value));
      if (key !== "image") {
        formDataToSend.append(key, String(value));
      }
    });
    formDataToSend.append("image", formData.image);

    axios.post(`${API_BASE_URL}/createStudyMaterial`,   formDataToSend,
    {
      withCredentials: true, // Set withCredentials to true
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        // Assuming the server responds with the created material
        const createdMaterial = response.data;
        setMaterials([...materials, createdMaterial]);
        setFormData({ title: '', type: '', link: '', image: null  });
        setFetchData(true)
        closeModal();
      })
      .catch((error) => {
        console.error('Error adding material:', error);
      });
  };

  const deleteMaterial = (material,index) => {
    // Send a DELETE request to the server to delete the material
    console.log("index",material)
    axios.delete(`${API_BASE_URL}/deleteStudyMaterial/${material._id}`,{
        withCredentials: true, 
    })
      .then(() => {
        const updatedMaterials = [...materials];
        updatedMaterials.splice(index, 1);
        setMaterials(updatedMaterials);
      })
      .catch((error) => {
        console.error('Error deleting material:', error);
      });
  };

  useEffect(() => {
    // Fetch materials from the server using a GET request
    axios.get(`${API_BASE_URL}/getStudyMaterial`,
    {
      withCredentials: true
    })
      .then((response) => {
        const materialsData = response.data.study;
        setMaterials(materialsData);
      })
      .catch((error) => {
        console.error('Error fetching materials:', error);
      });
    }, [fetchData]);
    console.log(formData)

 

  

  

  return (
    <div className="p-4 text-center bg-gray-100 min-h-screen">
      <h1 className="text-3xl text-blue-900 mb-4">Study Materials</h1>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={openModal}
      >
        Add Material
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-container">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-2xl mb-4 text-blue-500">Add New Material</h2>
              <input
                type="text"
                placeholder="Title"
                className="w-full border rounded p-2 mb-2"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
              <div className="mb-2">
                <label htmlFor="materialType">Material Type</label>
                <select
                  id="materialType"
                  className="w-full border rounded p-2"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })}
                >  
                  <option >Select Type</option>
                  <option value="Video">Video</option>
                  <option value="PDF">PDF</option>
                  <option value="youtube">YouTube</option>
                  <option value="Notes">Notes</option>
                </select>
              </div>
              {(formData.type === 'PDF' || formData.type === 'Notes') && (
                <input
                  type="file"
                  // accept=".pdf"
                  className="w-full border rounded p-2 mb-4"
                  onChange={handleImageChange}

                />
                )}  
              {(formData.type === 'Video' || formData.type === 'youtube') && (
                <input
                  type="text"
                  placeholder={`Link (e.g., YouTube URL)`}
                  className="w-full border rounded p-2 mb-4"
                  value={formData.link}
                  onChange={(e) =>
                    setFormData({ ...formData, link: e.target.value })
                  }
                />
              )}
              <div className="flex justify-end">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={addMaterial}
                >
                  Add
                </button>
                <button
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8">
      <div className="grid gap-7 xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1  p-3">
        {materials.map((material, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded mb-4 shadow-lg border border-blue-500"
          >
            <h3 className="text-xl font-semibold mb-2 text-blue-500">
              {material.title}
             
            </h3>
            <p className="text-lg">Type: {material.type}</p>
            <div className="mt-4">
              {material.type === 'PDF' || material.type === 'Notes' ? (
                <a
                  href={material.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline text-lg"
                >
                  View PDF
                </a>
              ) : (material.type === 'Video' || material.type === 'YouTube') ? (
                <a
                  href={material.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline text-lg"
                >
                  View Video
                </a>
              ) : (
                <p className="text-lg text-blue-500 hover:underline">View Notes</p>
              )}
            </div>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mt-4"
              onClick={() => deleteMaterial(material)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default Study;


// import React, { useState } from 'react';

// const Study = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [materials, setMaterials] = useState([]);
//   const [newMaterial, setNewMaterial] = useState({
//     title: '',
//     type: 'Video',
//     link: '',
//   });

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const addMaterial = () => {
//     setMaterials([...materials, newMaterial]);
//     setNewMaterial({ title: '', type: 'Video', link: '' });
//     closeModal();
//   };

//   const deleteMaterial = (index) => {
//     const updatedMaterials = [...materials];
//     updatedMaterials.splice(index, 1);
//     setMaterials(updatedMaterials);
//   };

//   return (
//     <div className="p-4 text-center">
//       <h1 className="text-3xl text-blue-500 mb-4">Study Materials</h1>

//       <button
//         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         onClick={openModal}
//       >
//         Add Material
//       </button>

//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center z-50">
//           <div className="modal-container">
//             <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//               <h2 className="text-2xl mb-4 text-blue-500">Add New Material</h2>
//               <input
//                 type="text"
//                 placeholder="Title"
//                 className="w-full border rounded p-2 mb-2"
//                 value={newMaterial.title}
//                 onChange={(e) =>
//                   setNewMaterial({ ...newMaterial, title: e.target.value })
//                 }
//               />
//               <div className="mb-2">
//                 <label htmlFor="materialType">Material Type</label>
//                 <select
//                   id="materialType"
//                   className="w-full border rounded p-2"
//                   value={newMaterial.type}
//                   onChange={(e) =>
//                     setNewMaterial({ ...newMaterial, type: e.target.value })
//                   }
//                 >
//                   <option value="Video">Video</option>
//                   <option value="PDF">PDF</option>
//                   <option value="YouTube">YouTube</option>
//                   <option value="Notes">Notes</option>
//                 </select>
//               </div>
//               {(newMaterial.type === 'PDF' || newMaterial.type === 'Notes') && (
//                 <input
//                   type="file"
//                   accept=".pdf"
//                   className="w-full border rounded p-2 mb-4"
//                 />
//               )}
//               {(newMaterial.type === 'Video' || newMaterial.type === 'YouTube') && (
//                 <input
//                   type="text"
//                   placeholder={`Link (e.g., YouTube URL)`}
//                   className="w-full border rounded p-2 mb-4"
//                   value={newMaterial.link}
//                   onChange={(e) =>
//                     setNewMaterial({ ...newMaterial, link: e.target.value })
//                   }
//                 />
//               )}
//               <div className="flex justify-end">
//                 <button
//                   className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
//                   onClick={addMaterial}
//                 >
//                   Add
//                 </button>
//                 <button
//                   className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
//                   onClick={closeModal}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}



// <div className="mt-12 p-2">
    
//       <div className="grid gap-7 xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1  p-3">
     
//         {materials.map((material, index) => (
//           <div
//             key={index}
//             className="bg-gray-100 p-4 rounded mb-4 shadow-lg"
//           >
//             <h3 className="text-xl font-semibold mb-2 text-blue-500">
//               {material.title}
//             </h3>
//             <p className="text-lg">Type: {material.type}</p>
//             <div className="mt-4">
//               {material.type === 'PDF' || material.type === 'Notes' ? (
//                 <a
//                   href={material.link}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-500 hover:underline text-lg"
//                 >
//                   View PDF
//                 </a>
//               ) : material.type === 'Video' || material.type === 'YouTube' ? (
//                 <div className="responsive-video-container">
//                   <iframe
//                     title="Video"
//                     src={material.link}
//                     frameBorder="0"
//                     allowFullScreen
//                     className="w-full"
//                     style={{ height: '300px' }}
//                   ></iframe>
//                 </div>
//               ) : (
//                 <p className="text-lg text-blue-500 hover:underline">View Notes</p>
//               )}
//             </div>
//             <button
//               className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mt-4"
//               onClick={() => deleteMaterial(index)}
//             >
//               Delete
//             </button>
//           </div>
//         ))}
     
//           </div>
     
//     </div>  
//     </div>
//   );
// };

// export default Study;