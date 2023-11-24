// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Curriculum = () => {
//   const [selectedGrade, setSelectedGrade] = useState('');
//   const [data, setData] = useState([]);
//   const [formData, setFormData] = useState({
//     academicYear: '2023-2024',
//     className: '',
//     course: '',
//     image: null,
//   });

//   const handleGradeChange = (e) => {
//     const selectedGrade = e.target.value;
//     setSelectedGrade(selectedGrade);

//     // Set the selected grade's courses in the form data
//     const selectedClass = data.find(item => item.className === selectedGrade);
    
//     if (selectedClass) {
//       setFormData({ ...formData, className: selectedGrade, course: selectedClass.subject.join(',') });
//     }
//   };

//   const handlePDFUpload = (e) => {
//     const file = e.target.files[0];
//     setFormData({ ...formData, image: file });
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();

//     const formDataToSend = new FormData();
//     formDataToSend.append("academicYear", formData.academicYear);
//     formDataToSend.append("className", formData.className);
//     formDataToSend.append("course", formData.course);
//     formDataToSend.append("image", formData.image);

//     axios
//       .post("http://localhost:4000/api/v1/adminRoute/createCurriculum", formDataToSend, {
//         withCredentials: true,
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       })
//       .then((response) => {
//         console.log("Curriculum created successfully!");
        
//         // Reset the form after submission
//         setFormData({
//           academicYear: '2023-2024',
//           className: '',
//           course: '',
//           image: null,
//         });
//       })
//       .catch((error) => {
//         console.error('Error creating curriculum:', error);
//       });
//   };

//   useEffect(() => {
//     axios.get("http://localhost:4000/api/v1/adminRoute/getAllClass", {
//       withCredentials: true,
//     })
//     .then((response) => {
//       const { classList } = response.data;
//       setData(classList);
//     })
//     .catch((error) => {
//       console.error('Error fetching class data:', error);
//     });
//   }, []);

//   return (
//     <div className="min-h-screen p-8 flex flex-col items-center justify-center">
//       <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center">
//         <h1 className="text-3xl font-bold text-blue-500 mb-4">School Curriculum</h1>
//         <form onSubmit={handleFormSubmit}>
//           <div className="grid md:grid-cols-2 gap-2">
//             <div className="mb-4">
//               <label className="text-xl font-semibold mb-2">Academic Year:</label>
//               <select
//                 className="text-gray-600 bg-gray-100 p-2 rounded-md w-full"
//                 value={formData.academicYear}
//                 onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
//               >
//                 <option value="2023-2024">2023-2024</option>
//                 <option value="2024-2025">2024-2025</option>
//               </select>
//             </div>
//             <div className="mb-4">
//               <label className="text-xl font-semibold mb-2">Grade:</label>
//               <select
//                 className="text-gray-600 bg-gray-100 p-2 rounded-md w-full"
//                 value={selectedGrade}
//                 onChange={handleGradeChange}
//               >
//                 <option value="">Select Grade</option>
//                 {data.map((item) => (
//                   <option key={item.className} value={item.className}>
//                     {item.className}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="mb-4">
//               <label className="text-xl font-semibold mb-2">Courses:</label>
//               <ul className="text-gray-600"> <li>{formData.course}</li></ul>
//             </div>
//             <div className="mb-4">
//               <label className="text-xl font-semibold mb-2">Upload Curriculum PDF:</label>
//               <input
//                 type="file"
//                 accept=".pdf"
//                 onChange={handlePDFUpload}
//                 className="text-gray-600 bg-gray-100 p-2 rounded-md w-full"
//               />
//             </div>
//           </div>
//           {formData.image && (
//             <div className="mb-4">
//               <label className="text-lg  mb-2">View PDF:</label>
//               <a href={URL.createObjectURL(formData.image)} target="_blank" rel="noopener noreferrer">
//                 {formData.image.name}
//               </a>
//             </div>
//           )}
//           <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700" 
//           type="submit">Submit</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Curriculum;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Api_GetAll = "http://localhost:4000/api/v1/adminRoute/getAllCurriculum";
const Delete_API ="http://localhost:4000/api/v1/adminRoute/deleteCurriculum";

const Curriculum = () => {
  const [selectedGrade, setSelectedGrade] = useState('');
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    academicYear: '2023-2024',
    className: '',
    course: '',
    image: null,
  });
  const[curriculumData, setCurriculumData] = useState([]);
  const [shouldFetchData, setShouldFetchData] = useState(false)

  const handleGradeChange = (e) => {
    const selectedGrade = e.target.value;
    setSelectedGrade(selectedGrade);

    // Set the selected grade's courses in the form data
    const selectedClass = data.find(item => item.className === selectedGrade);
    
    if (selectedClass) {
      setFormData({ ...formData, className: selectedGrade, course: selectedClass.subject.join(',') });
    }
  };

  
  
  const handlePDFUpload = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  
 

  
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("academicYear", formData.academicYear);
    formDataToSend.append("className", formData.className);
    formDataToSend.append("course", formData.course);
    formDataToSend.append("image", formData.image);

    axios
      .post("http://localhost:4000/api/v1/adminRoute/createCurriculum", formDataToSend, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Curriculum created successfully!");
        setFormData({ academicYear: '2023-2024',  className: '', course: '', image: null });

        setShouldFetchData(!shouldFetchData);
      })
      .catch((error) => {
        console.error('Error creating curriculum:', error);
      });
  };
 
  useEffect(() => {
    axios.get("http://localhost:4000/api/v1/adminRoute/getAllCurriculum", {
      withCredentials: true,
    })
    .then((response) => {
      console.log("CurriculumDATA-->", response.data)
      const {allCurriculum} = response.data;
      console.log("GetALLCLASS--->", allCurriculum)
      setCurriculumData(allCurriculum);
    })
    .catch((error) => {
      console.error('Error fetching class data:', error);
    });
  }, [shouldFetchData]);
 
 
 
  useEffect(() => {
    axios.get("http://localhost:4000/api/v1/adminRoute/getAllClass", {
      withCredentials: true,
    })
    .then((response) => {
      const { classList } = response.data;
      console.log(classList)
      setData(classList);
    })
    .catch((error) => {
      console.error('Error fetching class data:', error);
    });
  }, []);

  const handleDeleteCurriculum = (index) => {
    const curriculumId = curriculumData[index]._id; 
    axios
      .delete("http://localhost:4000/api/v1/adminRoute/deleteCurriculum/" + curriculumId, {
        withCredentials: true,
      })
      .then(() => {
        const updatedCurriculum = [...curriculumData];
        updatedCurriculum.splice(index, 1);
        setCurriculumData(updatedCurriculum);
      })
      .catch((error) => {
        console.error('Error deleting curriculumData:', error);
      });
  };
  


  return (
    <div className="min-h-screen p-8 flex flex-col items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-blue-500 mb-4">School Curriculum</h1>
        <form onSubmit={handleFormSubmit}>
          <div className="grid md:grid-cols-2 gap-2">
            <div className="mb-4">
              <label className="text-xl font-semibold mb-2">Academic Year:</label>
              <select
                className="text-gray-600 bg-gray-100 p-2 rounded-md w-full"
                value={formData.academicYear}
                onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
              >
                <option value="2023-2024">2023-2024</option>
                <option value="2024-2025">2024-2025</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="text-xl font-semibold mb-2">Grade:</label>
              <select
                className="text-gray-600 bg-gray-100 p-2 rounded-md w-full"
                value={selectedGrade}
                onChange={handleGradeChange}
              >
                <option value="">Select Grade</option>
                {data.map((item) => (
                  <option key={item.className} value={item.className}>
                    {item.className}
                  </option>
                ))}
              </select>
           
            </div>
            <div className="mb-4">
              <label className="text-xl font-semibold mb-2">Courses:</label>
              <ul className="text-gray-600"> <li>{formData.course}</li></ul>
            </div>
            <div className="mb-4">
              <label className="text-xl font-semibold mb-2">Upload Curriculum PDF:</label>
              <input
                type="file"
                accept=".pdf"
                onChange={handlePDFUpload}
                className="text-gray-600 bg-gray-100 p-2 rounded-md w-full"
              />
            </div>
          </div>
          <button  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700" 
          type="submit">Submit</button>
        </form>

        <div className="mt-4">
        <h2 className="text-lg font-semibold text-indigo-600">Created Curriculum</h2>
        <ul>
          {curriculumData.map((item, index) => (
            <li key={index} className="mt-2">
              <div className="bg-white pt-2 pb-2 pl-0 pr-0 rounded-md shadow-md">
              <p className="text-gray-600">AcademicYear: {item.academicYear}</p>
                 <p className="text-gray-600">Class: {item.className}</p>
                 <p className="text-gray-600">Course: {item.course}</p>
              {item.file && (
                  <div className="mb-4">
                    <label className="text-lg  mb-2">View PDF:</label>
                    <a  href={item.file.url} target="_blank" rel="noopener noreferrer"  className="text-blue-500 hover:underline">
                    View Image
                    </a>
                  </div>
                )}
              </div>
              <button
                onClick={() => handleDeleteCurriculum(index)}
                className="bg-red-500 text-white px-3 py-2 mt-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
     
     
      </div>
       
       

    </div>
  );
};

export default Curriculum;
