import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentResults = () => {

  const [selectedExam, setSelectedExam] = useState("");
  const [examData, setExamData] = useState([]);
 
  const [resultData, setResultData] = useState([]);
  

  const userData = JSON.parse(localStorage.getItem("response"));
  console.log("userData", userData);
  const userId = userData ? userData._id : null;


  


  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/exam/getAllExams", {
        withCredentials: true,
      })
      .then((response) => {
        const examData = response.data.examData;
        setExamData(examData);
        console.log("Exam-Data--->", examData)

      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const handleExamChange = (e) => {
    console.log('chaya',e)
    setSelectedExam(e.target.value);
  };



  useEffect(() => {
    if (selectedExam && userId) {
      {console.log("first", selectedExam &&  userId)}
      axios
        .get(`http://localhost:4000/api/v1/results/getResults?examName=${selectedExam}&studentId=${userId}`, {
          withCredentials: true,
        })
        .then((response) => {
          const data = response.data.data; // Assuming 'data' is the property containing the array
          setResultData(data);
          console.log("ResultData--->", data)


        


        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [selectedExam, userId]);

 
  return (
    <div className="p-4 border border-gray-300 rounded-lg max-w-xl mx-auto bg-white shadow-md">
      <div className="flex flex-wrap space-y-2 md:space-y-0 md:space-x-4">
        <select
          className="p-2 border rounded-md md:w-1/4"
          onChange={handleExamChange}
          value={selectedExam}
        >
          <option value="">Select Exam</option>
          {examData.map((exam) => (
            <option key={exam._id} value={exam.examName}>
              {exam.examName}
            </option>
          ))}
        </select>
       
      </div>
      <div className="text-center mb-4">
        {/* <img src={school} alt="School Logo" className="w-16 h-16 mx-auto" /> */}
        <h1 className="text-3xl font-semibold mt-2">School Name</h1>
        <p className="text-sm text-gray-600">School Address</p>
      </div>
      <div className="flex justify-between">
        <div>
          <p className="text-sm text-gray-600">Sr. No: 12345</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Date: Exam Date</p>
        </div>
      </div>
      <div className="mt-4 text-center">
        <p className="text-lg font-semibold">Report Card</p>
        <p className="text-md">Academic Year: 2023-2024</p>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Student Details</h2>
        <p className="text-sm">Name:{userData.fullName}</p>
        <p className="text-sm">Class:{userData.studentClass}</p>
        <p className="text-sm">Section: {userData.studentSection}</p>
        <p className="text-sm">Roll Number: {userData.studentRollNo}</p>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Results</h2>
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 p-2">Subject</th>
              <th className="border border-gray-300 p-2">Marks</th>
            </tr>
          </thead>
          <tbody>
            <tr>


              
                {resultData.map((item) => {
                  return item.subjects.map((data) => (
                    <tr>
                      <td key={data.subjectId} className='p-2'>
                         {data.subjectName}
                      </td>
                  </tr>
                  ));
                })}
              

              <td className="border border-gray-300 p-2">
                {resultData.map((item) => {
                  return item.subjects.map((data) => (
                   <tr> <td key={data.subjectId}  className='p-2'>
                   {data.marks}
                 </td></tr>
                  ));
                })}
              </td>
           </tr>
         
          </tbody>

        
        </table>
      </div>
      <div className="mt-4">
        <p className="font-semibold" 
         
        >Percentage: 90%</p>
        <p className="font-semibold">Grade: A</p>
      </div>
      <div className="mt-4">
        <div className="flex justify-between">
          <div>
            <p className="font-semibold">Remarks: Excellent performance.</p>
          </div>
          <div>
            <p className="font-semibold">Principal's Signature</p>
            {/* <img src={school} alt="Principal's Signature" className="w-24 h-12" /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentResults;