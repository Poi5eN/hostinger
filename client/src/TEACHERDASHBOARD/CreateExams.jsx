import React, { useEffect, useState } from 'react';
import axios from 'axios';


const CreateExams = () => {

  const data = JSON.parse(localStorage.response);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [examData, setExamData] = useState([]);
  const [examCreated, setExamCreated] = useState(false); 
  const [formData, setFormData] = useState({
    examName: '',
    className: data.classTeacher,
    section: data.section,
    examInfo: [
      {
        subjectName: '',
        examDate: '',
        startTime: '',
        endTime: '',
        subjectTotalMarks: '',
      },
    ],
  });

  useEffect(() => {

    console.log("use effect");

    axios.get(`http://localhost:4000/api/v1/exam/getAllExams?className=${data.classTeacher}&section=${data.section}`, {
      withCredentials: true
    })
    .then((response) => {
      console.log("P2 response", response.data.examData);
      setExamData(response.data.examData);
    })
    .catch((error) => {
      console.log(error.message);
    })

  }, [examCreated])

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleExamNameChange = (e) => {
    setFormData({ ...formData, examName: e.target.value });
  };

  // const handleClassChange = (e) => {
  //   setFormData({ ...formData, className: e.target.value });
  // };

  // const handleSectionChange = (e) => {
  //   setFormData({ ...formData, section: e.target.value });
  // };

  const handleSubjectChange = (e, index) => {
    const updatedExamInfo = [...formData.examInfo];
    updatedExamInfo[index].subjectName = e.target.value;
    setFormData({ ...formData, examInfo: updatedExamInfo });
  };

  const handleDateChange = (e, index) => {
    const updatedExamInfo = [...formData.examInfo];
    updatedExamInfo[index].examDate = e.target.value;
    setFormData({ ...formData, examInfo: updatedExamInfo });
  };

  const handleStartTimeChange = (e, index) => {
    const updatedExamInfo = [...formData.examInfo];
    updatedExamInfo[index].startTime = e.target.value;
    setFormData({ ...formData, examInfo: updatedExamInfo });
  };

  const handleEndTimeChange = (e, index) => {
    const updatedExamInfo = [...formData.examInfo];
    updatedExamInfo[index].endTime = e.target.value;
    setFormData({ ...formData, examInfo: updatedExamInfo });
  };

  const handleTotalMarksChange = (e, index) => {
    const updatedExamInfo = [...formData.examInfo];
    updatedExamInfo[index].subjectTotalMarks = e.target.value;
    setFormData({ ...formData, examInfo: updatedExamInfo });
  };

  const handleAddSubject = () => {
    const updatedExamInfo = [...formData.examInfo, { subjectName: '', examDate: '', startTime: '', endTime: '', subjectTotalMarks: '' }];
    setFormData({ ...formData, examInfo: updatedExamInfo });
  };

  const handleDelete= async (id)=>{

    try {
      const response = await axios.delete(`http://localhost:4000/api/v1/exam/deleteExam/${id}`, {
        withCredentials: true
      });

      console.log("message", response);
      setExamCreated(!examCreated);
    }
    catch (error) {
      console.log("error", error.message);
    }

  }



  const handleSubmit = async () => {
    try {
  
      await axios.post("http://localhost:4000/api/v1/exam/createExam", formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      })
  
      setFormData({
        examName: '',
        className: data.classTeacher,
        section: data.section,
        examInfo: [
          {
            subjectName: '',
            examDate: '',
            startTime: '',
            endTime: '',
            subjectTotalMarks: '',
          },
        ],
      });

      setExamCreated(!examCreated);
      setIsModalOpen(false);
    }
    catch (error) {
      console.log("error", error)
    }
  };

  return (
    <div className="py-8 px-4 md:px-8">
      <div className="flex justify-center">
        <button
          className="bg-blue-500 hover-bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          onClick={handleModalOpen}
        >
          Open Modal
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal p-4 bg-white rounded-lg shadow-lg md:w-2/3 lg:w-1/2">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-600">Exam Form</h2>
            <div className="mb-4">
              <h1>Class: {data.classTeacher}</h1>
              {/* <label className="block text-gray-600">Class</label> */}

              {/* <select
                className="w-full border rounded-lg p-2"
                value={formData.className}
                onChange={handleClassChange}
              >
                <option value="1">Class 1</option>
                <option value="2">Class 2</option>
                <option value="3">Class 3</option>
                <option value="4">Class 4</option>
                <option value="5">Class 5</option>
                <option value="6">Class 6</option>
                <option value="7">Class 7</option>
                <option value="8">Class 8</option>
                <option value="9">Class 9</option>
                <option value="10">Class 10</option>
                <option value="11">Class 11</option>
                <option value="12">Class 12</option>
                Add options for Class 2 to 12
              </select> */}
            </div>
            <div className="mb-4">
              <h1>Section: {data.section}</h1>
              {/* <label className="block text-gray-600">Section</label>
              <select
                className="w-full border rounded-lg p-2"
                value={formData.section}
                onChange={handleSectionChange}
              >
                <option value="A">Section A</option>
                <option value="B">Section B</option>
                <option value="C">Section C</option>
                <option value="D">Section D</option>
                <option value="E">Section E</option>
                <option value="F">Section F</option>
                Add options for Sections A to E
              </select> */}
            </div>
            <div className="mb-4">
              <label className="block text-gray-600">Exam Name</label>
              <input
                type="text"
                className="w-full border rounded-lg p-2"
                value={formData.examName}
                onChange={handleExamNameChange}
              />
            </div>
            <div className="overflow-y-auto max-h-60 md:max-h-80 lg:max-h-96">
              {formData.examInfo.map((examInfo, index) => (
                <div key={index} className="mb-4 border rounded p-4">
                  <label className="block text-gray-600">Subject</label>
                  <input
                    type="text"
                    className="w-full border rounded-lg p-2"
                    value={examInfo.subjectName}
                    onChange={(e) => handleSubjectChange(e, index)}
                  />
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-gray-600">Date</label>
                      <input
                        type="date"
                        className="w-full border rounded-lg p-2"
                        value={examInfo.examDate}
                        onChange={(e) => handleDateChange(e, index)}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600">Start Time</label>
                      <input
                        type="time"
                        className="w-full border rounded-lg p-2"
                        value={examInfo.startTime}
                        onChange={(e) => handleStartTimeChange(e, index)}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600">End Time</label>
                      <input
                        type="time"
                        className="w-full border rounded-lg p-2"
                        value={examInfo.endTime}
                        onChange={(e) => handleEndTimeChange(e, index)}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600">Total Marks</label>
                      <input
                        type="text"
                        className="w-full border rounded-lg p-2"
                        value={examInfo.subjectTotalMarks}
                        onChange={(e) => handleTotalMarksChange(e, index)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mr-2"
              onClick={handleAddSubject}
            >
              Add Subject
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
              onClick={handleModalClose}
            >
              Cancel
            </button>
            <div className="flex justify-end mt-4">
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
            onClick={handleModalClose}
          >
            &#x2716;
          </button>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">Exam Data</h2>
        <div className="overflow-x-auto bg-gray-100 rounded-lg p-4">
          <table className="w-full border-collapse table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="border text-left px-4 py-2">Class</th>
                <th className="border text-left px-4 py-2">Section</th>
                <th className="border text-left px-4 py-2">Exam Name</th>
                <th className="border text-left px-4 py-2">Subjects</th>
                <th className="border text-left px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {examData.map((data, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{data.className}</td>
                  <td className="border px-4 py-2">{data.section}</td>
                  <td className="border px-4 py-2">{data.examName}</td>
                  <td className="border px-4 py-2">
                    {data.examInfo.map((subject, i) => (
                      <div key={i}>
                        {subject.subjectName} - Date: {subject.examDate}, Time: {subject.startTime} - {subject.endTime}, Total Marks: {subject.subjectTotalMarks}
                      </div>
                    ))}
                  </td>

                  <button className='bg-red-400 p-3' onClick={() => handleDelete(data._id)}>Delete</button>

                </tr>
              ))}
            </tbody>
          </table>
         
        </div>
      </div>
    </div>
  );
};

export default CreateExams;




// import React, { useState } from 'react';

// const CreateExams = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [examData, setExamData] = useState([]);
//   const [formData, setFormData] = useState({
//     examName: '',
//     className: '1',
//     section: 'A',
//     examInfo: [
//       {
//         subjectName: '',
//         examDate: '',
//         startTime: '',
//         endTime: '',
//         subjectTotalMarks: '',
//       },
//     ],
//   });

//   const handleModalOpen = () => {
//     setIsModalOpen(true);
//   };

//   const handleModalClose = () => {
//     setIsModalOpen(false);
//   };

//   const handleExamNameChange = (e) => {
//     setFormData({ ...formData, examName: e.target.value });
//   };

//   const handleClassChange = (e) => {
//     setFormData({ ...formData, className: e.target.value });
//   };

//   const handleSectionChange = (e) => {
//     setFormData({ ...formData, section: e.target.value });
//   };

//   const handleSubjectChange = (e, index) => {
//     const updatedExamInfo = [...formData.examInfo];
//     updatedExamInfo[index].subjectName = e.target.value;
//     setFormData({ ...formData, examInfo: updatedExamInfo });
//   };

//   const handleDateChange = (e, index) => {
//     const updatedExamInfo = [...formData.examInfo];
//     updatedExamInfo[index].examDate = e.target.value;
//     setFormData({ ...formData, examInfo: updatedExamInfo });
//   };

//   const handleStartTimeChange = (e, index) => {
//     const updatedExamInfo = [...formData.examInfo];
//     updatedExamInfo[index].startTime = e.target.value;
//     setFormData({ ...formData, examInfo: updatedExamInfo });
//   };

//   const handleEndTimeChange = (e, index) => {
//     const updatedExamInfo = [...formData.examInfo];
//     updatedExamInfo[index].endTime = e.target.value;
//     setFormData({ ...formData, examInfo: updatedExamInfo });
//   };

//   const handleTotalMarksChange = (e, index) => {
//     const updatedExamInfo = [...formData.examInfo];
//     updatedExamInfo[index].subjectTotalMarks = e.target.value;
//     setFormData({ ...formData, examInfo: updatedExamInfo });
//   };

//   const handleAddSubject = () => {
//     const updatedExamInfo = [...formData.examInfo, { subjectName: '', examDate: '', startTime: '', endTime: '', subjectTotalMarks: '' }];
//     setFormData({ ...formData, examInfo: updatedExamInfo });
//   };

//   const handleSubmit = () => {
//     // Create a new exam data object
//     const newExamData = {
//       examName: formData.examName,
//       className: formData.className,
//       section: formData.section,
//       examInfo: formData.examInfo,
//     };

//     // Add the new exam data to the examData array
//     setExamData([...examData, newExamData]);

//     // Reset the form data
//     setFormData({
//       examName: '',
//       className: '1',
//       section: 'A',
//       examInfo: [
//         {
//           subjectName: '',
//           examDate: '',
//           startTime: '',
//           endTime: '',
//           subjectTotalMarks: '',
//         },
//       ],
//     });

//     console.log("P2 examData", examData);

//     console.log("P2 formData", formData);
//     // Close the modal
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="py-8 px-4 md:px-8">
//       <div className="flex justify-center">
//         <button
//           className="bg-blue-500 hover-bg-blue-700 text-white font-semibold py-2 px-4 rounded"
//           onClick={handleModalOpen}
//         >
//           Open Modal
//         </button>
//       </div>

//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center z-50">
//           <div className="modal p-4 bg-white rounded-lg shadow-lg md:w-2/3 lg:w-1/2">
//             <h2 className="text-2xl font-semibold mb-4 text-indigo-600">Exam Form</h2>
//             <div className="mb-4">
//               <label className="block text-gray-600">Class</label>
//               <select
//                 className="w-full border rounded-lg p-2"
//                 value={formData.className}
//                 onChange={handleClassChange}
//               >
//                 <option value="1">Class 1</option>
//                 {/* Add options for Class 2 to 12 */}
//               </select>
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-600">Section</label>
//               <select
//                 className="w-full border rounded-lg p-2"
//                 value={formData.section}
//                 onChange={handleSectionChange}
//               >
//                 <option value="A">Section A</option>
//                 {/* Add options for Sections A to E */}
//               </select>
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-600">Exam Name</label>
//               <input
//                 type="text"
//                 className="w-full border rounded-lg p-2"
//                 value={formData.examName}
//                 onChange={handleExamNameChange}
//               />
//             </div>
//             <div className="overflow-y-auto max-h-60 md:max-h-80 lg:max-h-96">
//               {formData.examInfo.map((examInfo, index) => (
//                 <div key={index} className="mb-4 border rounded p-4">
//                   <label className="block text-gray-600">Subject</label>
//                   <input
//                     type="text"
//                     className="w-full border rounded-lg p-2"
//                     value={examInfo.subjectName}
//                     onChange={(e) => handleSubjectChange(e, index)}
//                   />
//                   <div className="grid grid-cols-2 gap-4 mt-4">
//                     <div>
//                       <label className="block text-gray-600">Date</label>
//                       <input
//                         type="date"
//                         className="w-full border rounded-lg p-2"
//                         value={examInfo.examDate}
//                         onChange={(e) => handleDateChange(e, index)}
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-gray-600">Start Time</label>
//                       <input
//                         type="time"
//                         className="w-full border rounded-lg p-2"
//                         value={examInfo.startTime}
//                         onChange={(e) => handleStartTimeChange(e, index)}
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-gray-600">End Time</label>
//                       <input
//                         type="time"
//                         className="w-full border rounded-lg p-2"
//                         value={examInfo.endTime}
//                         onChange={(e) => handleEndTimeChange(e, index)}
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-gray-600">Total Marks</label>
//                       <input
//                         type="text"
//                         className="w-full border rounded-lg p-2"
//                         value={examInfo.subjectTotalMarks}
//                         onChange={(e) => handleTotalMarksChange(e, index)}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <button
//               className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mr-2"
//               onClick={handleAddSubject}
//             >
//               Add Subject
//             </button>
//             <button
//               className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
//               onClick={handleModalClose}
//             >
//               Cancel
//             </button>
//             <div className="flex justify-end mt-4">
//               <button
//                 className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
//                 onClick={handleSubmit}
//               >
//                 Submit
//               </button>
//             </div>
//           </div>
//           <button
//             className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
//             onClick={handleModalClose}
//           >
//             &#x2716;
//           </button>
//         </div>
//       )}

//       <div className="mt-8">
//         <h2 className="text-2xl font-semibold mb-4 text-indigo-600">Exam Data</h2>
//         <div className="overflow-x-auto bg-gray-100 rounded-lg p-4">
//           <table className="w-full border-collapse table-auto">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="border text-left px-4 py-2">Class</th>
//                 <th className="border text-left px-4 py-2">Section</th>
//                 <th className="border text-left px-4 py-2">Exam Name</th>
//                 <th className="border text-left px-4 py-2">Subjects</th>
//                 <th className="border text-left px-4 py-2">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {examData.map((data, index) => (
//                 <tr key={index}>
//                   <td className="border px-4 py-2">{data.className}</td>
//                   <td className="border px-4 py-2">{data.section}</td>
//                   <td className="border px-4 py-2">{data.examName}</td>
//                   <td className="border px-4 py-2">
//                     {data.examInfo.map((subject, i) => (
//                       <div key={i}>
//                         {subject.subjectName} - Date: {subject.examDate}, Time: {subject.startTime} - {subject.endTime}, Total Marks: {subject.subjectTotalMarks}
//                       </div>
//                     ))}
//                   </td>
//                   <button className="border px-4 py-2">Delete </button>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
         
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateExams;
