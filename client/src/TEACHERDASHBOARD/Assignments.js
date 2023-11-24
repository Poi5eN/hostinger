import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Api_Create = "http://localhost:4000/api/v1/adminRoute/createAssignment";
const Api_Update = "http://localhost:4000/api/v1/adminRoute/updateAssignment/";
const Api_GetAssiignment = "http://localhost:4000/api/v1/adminRoute/getAllAssignment";
const Api_GetAll ="http://localhost:4000/api/v1/adminRoute/getAllClass";
const API_DELETE = "http://localhost:4000/api/v1/adminRoute/deleteAssignment/6538e0fb0c6aa38bbddec27b";

const Assignments = () => {
  const [data, setData] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const[formData, setFormData] = useState({
    title: "",
    description:"",
    dueDate: "",
    className: "", 
    section: [], 
    subject: [],
    image: null,
 } )
 const[assignmentData, setAssignmentsData] = useState([]);
 const [shouldFetchData, setShouldFetchData] = useState(false)
 const [showAssignment, setShowAssignment] = useState(false);





  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({...formData, image:file});
  };

 


  const handleGradeChange = (e) => {
    const selectedGrade = e.target.value;
    setSelectedGrade(selectedGrade);

    // Set the selected grade's courses in the form data
    const selectedClass = data.find(item => item.className === selectedGrade);
    
    if (selectedClass) {
      // setFormData({ ...formData, className: selectedGrade, section:selectedClass.section.join(','), course: selectedClass.subject.join(',') });
      setFormData({
        ...formData,
        className: selectedGrade,
        section: selectedClass.section, 
        subject: selectedClass.subject, 
      });
    }
  };
  
  
 
 

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("dueDate", formData.dueDate);
    formDataToSend.append("image", formData.image);
    formDataToSend.append("className", formData.className);
    formDataToSend.append("section", formData.section);
    formDataToSend.append("subject", formData.subject);

    axios
      .post(Api_Create, formDataToSend, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
     

      .then((response) => {
        setFormData({
          title: "",
          description: "",
          dueDate: "",
          className: "",
          section: "",
          subject: "",
          image: null,
        });
      
        setShouldFetchData(!shouldFetchData)
      })
      .catch((error) => {
        console.error('Error creating assignment:', error);
      });
  };

  useEffect(() => {
    axios.get("http://localhost:4000/api/v1/adminRoute/getAllClass", {
      withCredentials: true,
    })
    .then((response) => {
      const { classList } = response.data;
      console.log("GetALLCLASS--->", classList)
      setData(classList);
    })
    .catch((error) => {
      console.error('Error fetching class data:', error);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:4000/api/v1/adminRoute/getAllAssignment", {
      withCredentials: true,
    })
    .then((response) => {
      console.log("DATA-->", response.data)
      const { allAssignment } = response.data;
      console.log("GetALLCLASS--->", allAssignment)
      setAssignmentsData(allAssignment);
    })
    .catch((error) => {
      console.error('Error fetching class data:', error);
    });
  }, [shouldFetchData]);


  const handleDeleteAssignment = (index) => {
    const assignmentId = assignmentData[index]._id; 
    axios
      .delete("http://localhost:4000/api/v1/adminRoute/deleteAssignment/" + assignmentId, {
        withCredentials: true,
      })
      .then(() => {
        const updatedAssignments = [...assignmentData];
        updatedAssignments.splice(index, 1);
        setAssignmentsData(updatedAssignments);
      })
      .catch((error) => {
        console.error('Error deleting assignment:', error);
      });
  };

  const handleSectionChange = (e) => {
    const selectedSection = e.target.value;
    setSelectedSection(selectedSection);
    setFormData({ ...formData, section: [selectedSection] }); 
  };

  const handleSubjectChange = (e) => {
    const selectedSubject = e.target.value;
    setSelectedSubject(selectedSubject);
    setFormData({ ...formData, subject: [selectedSubject] });
  };
  

  return (
    <div className="p-6 w-full max-w-md mx-auto bg-indigo-100 rounded-md shadow-md">
      <h1 className="text-2xl font-semibold text-indigo-600 mb-4">Create Homework Assignment</h1>
      <form onSubmit={handleSubmit}>
      
       <div className='grid md:grid-cols-2 gap-2'>
       <div className="mb-4">
          <label htmlFor="classValue" className="text-sm font-medium text-gray-600 block">
            Class
          </label>
          

       <select
                className="w-full p-2 rounded-md border border-indigo-200 focus:outline-none focus:border-indigo-500"
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
          <label htmlFor="section" className="text-sm font-medium text-gray-600 block">
            Section
          </label>
          

<select
    id="section"
    className="w-full p-2 rounded-md border border-indigo-200 focus:outline-none focus:border-indigo-500"
    value={selectedSection}
    onChange={handleSectionChange}
  >
    <option value="">Select Section</option>
    {selectedGrade &&
      data
        .find((item) => item.className === selectedGrade)
        .section.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
  </select>
       
       
        </div>
        
        
        <div className="mb-4">
          <label htmlFor="subjectValue" className="text-sm font-medium text-gray-600 block">
            Subject
          </label>
         
           <select
              className="w-full p-2 rounded-md border border-indigo-200 focus:outline-none focus:border-indigo-500"
              value={selectedSubject}
              onChange={handleSubjectChange}
            >
              <option value="">Select Subject</option>
              {selectedGrade &&
      data
        .find((item) => item.className === selectedGrade)
        .subject.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
            </select>
        </div>
        
        
        <div className="mb-4">
          <label htmlFor="title" className="text-sm font-medium text-gray-600 block">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="w-full p-2 rounded-md border border-indigo-200 focus:outline-none focus:border-indigo-500"
            placeholder="Enter assignment title"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value })}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="text-sm font-medium text-gray-600 block">
            Description
          </label>
          <textarea
            id="description"
            className="w-full p-2 rounded-md border border-indigo-200 focus:outline-none focus:border-indigo-500"
            placeholder="Enter assignment description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description : e.target.value })}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="dueDate" className="text-sm font-medium text-gray-600 block">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            className="w-full p-2 rounded-md border border-indigo-200 focus:outline-none focus:border-indigo-500"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData,  dueDate: e.target.value })}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="pdfFile" className="text-sm font-medium text-gray-600 block">
            Upload PDF
          </label>
          <input
            type="file"
            accept=".pdf"
            id="pdfFile"
            className="w-full p-2 rounded-md border border-indigo-200 focus:outline-none focus:border-indigo-500"
            onChange={handleFileChange}
          />
        </div>
       </div>
        {/* Existing input fields for title, description, dueDate, and pdfFile go here */}
        <button
         onclick={handleSubmit}
          type="submit"
          className="w-full bg-indigo-500 text-white p-2 rounded-md font-semibold hover:bg-indigo-600 focus:outline-none"
        >
          Create Assignment
        </button>
      </form>

      
      {/* {showAssignment && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold text-indigo-600 mb-2">Created Assignment</h2>
          <div className="bg-white p-4 rounded-md shadow-md">
            <h3 className="text-xl font-semibold">Title: {formData.title}</h3>
            <p className="text-gray-600">Description: {formData.description}</p>
            <p className="text-gray-600">Due Date: {formData.dueDate}</p>
            {item.file && (
                  <div className="mb-4">
                    <label className="text-lg  mb-2">View PDF:</label>
                    <a  href={item.file.url} target="_blank" rel="noopener noreferrer"  className="text-blue-500 hover:underline">
                    View Image
                    </a>
              </div>
            )}
          </div>
        </div>)} */}
     


      <div className="mt-4">
        <h2 className="text-lg font-semibold text-indigo-600">Created Assignments</h2>
        <ul>
          {assignmentData.map((item, index) => (
            <li key={index} className="mt-2">
              <div className="bg-white p-4 rounded-md shadow-md">
                <h3 className="text-xl font-semibold">Title: {item.title}</h3>
                <p className="text-gray-600">Description: {item.description}</p>
                <p className="text-gray-600">Due Date: {item.dueDate}</p>
                <p className="text-gray-600">Class: {item.className}</p>
                <p className="text-gray-600">Section: {item.section}</p>
                <p className="text-gray-600">Subject: {item.subject}</p>
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
                onClick={() => handleDeleteAssignment(index)}
                className="bg-red-500 text-white px-3 py-2 mt-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
   
   
    </div>
  );
};

export default Assignments; 