import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentAssigments = () => {
  const[assignmentData, setAssignmentsData] = useState([]);

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
  }, []);

  return (
    <div className="mt-12 p-2">
      <h2 className="text-lg font-semibold  text-indigo-600 mb-2">
             Assignment
          </h2>
      
      
        <div className="mt-4">
        {/* <h2 className="text-lg font-semibold text-indigo-600">Assignments</h2> */}
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
              
            </li>
          ))}
        </ul>
      </div>
    
    </div>
  );
};

export default StudentAssigments;