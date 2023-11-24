import {useState, useEffect} from 'react'
import React  from 'react';
import axios from 'axios';



const Syllabus = () => {
  const[curriculumData, setCurriculumData] = useState([]);

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
  }, []);
 


  return (
    <div className="min-h-screen p-8 flex flex-col ">

<div className="mt-4">
        <h2 className="text-lg font-semibold text-indigo-600">Created Curriculum</h2>
        <ul>
          {curriculumData.map((item, index) => (
            <li key={index} className="mt-2">
              <div className="bg-white pt-2 pb-2 pl-5 pr-0 rounded-md shadow-md">
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
            
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Syllabus