// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import axios from "axios";

// const StudentFeeStatus = () => {
//   const { email } = useParams();
//   const [studentData, setStudentData] = useState({});

//   const studentId = studentData._id;
//   const [feeData, setFeeData] = useState({});
//   const [getFee, setGetFee] = useState({});
//   useEffect(() => {
//     axios
//       .get(
//         `http://localhost:4000/api/v1/adminRoute/getAllStudents?email=${email}`,
//         {
//           withCredentials: true,
//         }
//       )
//       .then((response) => {
//         const data = response.data.allStudent[0];
//         setStudentData(data);
//       })
//       .catch((error) => {
//         console.error("error fetching Student data : ", error);
//       });
//   }, [email]);

//   useEffect(() => {
//     axios
//       .get(
//         `http://localhost:4000/api/v1/fees/getFeeStatus?studentId=${studentId}`,
//         {
//           withCredentials: true,
//         }
//       )
//       .then((response) => {
//         console.log(response);
//       })
//       .catch((error) => {
//         console.error("error fetching Fees data : ", error);
//       });
//   }, [studentId]);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [examData, setExamData] = useState([]);
//   // const [feeData, setFeeData] = useState([]);
//   const [formData, setFormData] = useState({
//     studentId: "",
//     feeAmount: "",
//     FeeMonth: "",
//     feeDate: "",
//     feeStatus: "",
//   });

//   const handleModalOpen = () => {
//     axios
//       .get(`http://localhost:4000/api/v1/adminRoute/getFees`, {
//         withCredentials: true,
//       })
//       .then((response) => {
//         const data = response.data;
//         console.log("Fee Type", data);
//         const feeTypeArray = data;

//         // Assuming your studentData has a property called 'class'
//         const studentClass = studentData.class;
//         console.log("ajay", studentData);
//         console.log(studentClass);

//         // Check if feeTypeArray is an array
//         if (Array.isArray(feeTypeArray)) {
//           // Find the feeAmount for the studentClass
//           const studentFeeAmount = feeTypeArray
//             .filter((feeType) => feeType.className === studentClass)
//             .map((classData) => classData.amount);

//           // Log the feeAmount for the same class
//           console.log("Fee Amount for the class", studentFeeAmount);
//           setGetFee(studentFeeAmount);
//           setIsModalOpen(true);
//         } else {
//           console.error("Invalid or undefined feeTypeArray");
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching Fee data: ", error);
//       });
//   };

//   const handleModalClose = () => {
//     setIsModalOpen(false);
//   };

//   const handleFeeChange = (e) => {
//     setFormData({ ...formData, feeAmount: e.target.value });
//   };

//   const handleMonthsChange = (e) => {
//     setFormData({ ...formData, FeeMonth: e.target.value });
//   };

//   const handleFeeStatusChange = (e) => {
//     setFormData({ ...formData, feeStatus: e.target.value });
//   };

//   const handleSubjectChange = (e, index) => {
//     const updatedExamInfo = [...formData.additionalType];
//     updatedExamInfo[index].feeName = e.target.value;
//     setFormData({ ...formData, additionalType: updatedExamInfo });
//   };

//   const handleDateChange = (e, index) => {
//     const updatedExamInfo = [...formData.additionalType];
//     updatedExamInfo[index].additionalFeeDate = e.target.value;
//     setFormData({ ...formData, additionalType: updatedExamInfo });
//   };

//   const handleStartTimeChange = (e, index) => {
//     const updatedExamInfo = [...formData.additionalType];
//     updatedExamInfo[index].startTime = e.target.value;
//     setFormData({ ...formData, additionalType: updatedExamInfo });
//   };

//   const handleEndTimeChange = (e, index) => {
//     const updatedExamInfo = [...formData.additionalType];
//     updatedExamInfo[index].endTime = e.target.value;
//     setFormData({ ...formData, additionalType: updatedExamInfo });
//   };

//   const handleTotalMarksChange = (e, index) => {
//     const updatedExamInfo = [...formData.additionalType];
//     updatedExamInfo[index].subjectTotalMarks = e.target.value;
//     setFormData({ ...formData, additionalType: updatedExamInfo });
//   };
//   const handleFeeType = (e, index) => {
//     const updatedExamInfo = [...formData.additionalType];
//     updatedExamInfo[index].feeType = e.target.value;
//     setFormData({ ...formData, additionalType: updatedExamInfo });
//   };

//   const handleAddSubject = () => {
//     const updatedExamInfo = [
//       ...formData.additionalType,
//       {
//         feeName: "",
//         additionalFeeDate: "",
//         feeType: "",
//         startTime: "",
//         endTime: "",
//         subjectTotalMarks: "",
//       },
//     ];
//     setFormData({ ...formData, additionalType: updatedExamInfo });
//   };
//   const handleMonthChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = () => {
//     const newExamData = {
//       studentId: studentId,
//       feeHistory: [
//         {
//           paidAmount: formData.feeAmount,
//           month: formData.FeeMonth,
//           status: formData.feeStatus,
//           date: formData.feeDate,
//           studentId: studentId,
//           // additionalType: formData.additionalType,
//         },
//       ],
//     };
//     const apiUrl = "http://localhost:4000/api/v1/fees/createFeeStatus";
//     axios
//       .post(apiUrl, newExamData, {
//         withCredentials: true,
//         // headers: {
//         //   "Content-Type": "multipart/form-data",
//         // },
//       })
//       .then((response) => {
//         console.log("Data Post Seccessfully : ", response);
//       })
//       .catch((error) => {
//         console.error("Error Posting Data :", error);
//       });

//     setExamData([...examData, newExamData]);

//     setFormData({
//       feeAmount: "",
//       FeeMonth: "",
//       feeStatus: "",
//       feeDate: "",
//       // additionalType: [
//       //   {
//       //     feeName: '',
//       //     additionalFeeDate: '',
//       //     // startTime: '',
//       //     feeType:'',
//       //     // endTime: '',
//       //     subjectTotalMarks: '',
//       //   }
//       // ],
//     });

//     // console.log("P2 examData", feeDate);

//     console.log("P2 formData", formData);

//     setIsModalOpen(false);
//   };

//   return (
//     <div className="py-8 px-4 md:px-8">
//       <div className=" flex justify-center mt-4">
//         {studentData.image && studentData.image.url ? (
//           <img
//             className="w-[80px] h-[80px] rounded-full"
//             src={studentData.image.url}
//             alt="Image"
//           />
//         ) : (
//           <p>No image available</p>
//         )}
//       </div>

//       <div className=" ">
//         <h2 className="  text-[14px] ">Name : {studentData.fullName}</h2>
//         <h2 className="  text-[14px] ">Email : {studentData.email}</h2>
//         <h2 className="  text-[14px] ">Class : {studentData.class}</h2>
//       </div>
//       <div className="flex justify-center">
//         <button
//           className="bg-blue-500 hover-bg-blue-700 text-white font-semibold py-2 px-4 rounded"
//           onClick={handleModalOpen}
//         >
//           Create Fee
//         </button>
//       </div>

//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center z-50">
//           <div className="modal p-4 bg-white rounded-lg shadow-lg md:w-2/3 lg:w-1/2">
//             <div className="flex justify-between">
//               {/* <h2 className="text-2xl font-semibold mb-4 text-indigo-600">Fee Form</h2> */}
//               <span className="text-2xl font-semibold mb-4 text-indigo-600">
//                 Fee Form
//               </span>
//               <span className="text-2xl font-semibold mb-4 text-indigo-600">
//                 Fee Amounts : {getFee}
//               </span>
//               {/* {console.log("p2", getFee)} */}
//             </div>
//             <div className="grid grid-cols-2 gap-4 mt-4">
//               <div className="mb-4">
//                 <label className="block text-gray-600">Months</label>
//                 <select
//                   className="w-full border rounded-lg p-2"
//                   value={formData.FeeMonth}
//                   onChange={handleMonthsChange}
//                 >
//                   <option>Select Months </option>
//                   <option value="January">January</option>
//                   <option value="February">February</option>
//                   <option value="March">March</option>
//                   <option value="April">April</option>
//                   <option value="May">May</option>
//                   <option value="June">June</option>
//                   <option value="July">July</option>
//                   <option value="August">August</option>
//                   <option value="September">September</option>
//                   <option value="October">October</option>
//                   <option value="November">November</option>
//                   <option value="December">December</option>
//                   {/* Add options for Class 2 to 12 */}
//                 </select>
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-600">Fee Status</label>
//                 <select
//                   className="w-full border rounded-lg p-2"
//                   value={formData.feeStatus}
//                   onChange={handleFeeStatusChange}
//                 >
//                   <option>Select Status</option>
//                   <option value="paid">Paid</option>
//                   <option value="unPaid">UnPaid</option>
//                   <option value="dues">Dues</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-gray-600">Date</label>
//                 <input
//                   type="date"
//                   name="feeDate" // Make sure to provide the name
//                   className="w-full border rounded-lg p-2"
//                   value={formData.feeDate}
//                   onChange={handleMonthChange}
//                   // type="date"
//                   // className="w-full border rounded-lg p-2"
//                   // value={formData.FeeDate}
//                   // // onChange={(e) => handleDateChange(e, index)}
//                   // onChange={handleMonthChange}
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-600">Fee Amount</label>
//                 <input
//                   type="number"
//                   className="w-full border rounded-lg p-2"
//                   value={formData.feeAmount}
//                   onChange={handleFeeChange}
//                 />
//               </div>
//             </div>
//             {/* <h2 className="text-2xl font-semibold mb-4 text-indigo-600">Additional Fee</h2>
//             <div className="overflow-y-auto max-h-60 md:max-h-80 lg:max-h-96">
                 
//               {formData.additionalType.map((additionalType, index) => (
//                 <div key={index} className="mb-4 border rounded p-4">
                 
//                   <div className="grid grid-cols-2 gap-4 mt-4">
//                   <div className="mb-4">
//               <label className="block text-gray-600">Additional FeeType</label>
//               <select
//                 className="w-full border rounded-lg p-2"
//                 value={additionalType.feeType}
//                 // value={examInfo.subjectName}
//                 // onChange={handleClassChange}
//                 // onChange={handleFeeType}
//                 onChange={(e) => handleFeeType(e, index)}
//                 // onChange={(e) => handleSubjectChange(e, index)}
//               >
//                 <option >Select Type </option>
//                 <option value="A">A</option>
//                 <option value="B">B</option>
//                 <option value="C">C</option>
               
                
//               </select>
//             </div>
//                     <div>
//                       <label className="block text-gray-600">Date</label>
//                       <input
//                         type="date"
//                         className="w-full border rounded-lg p-2"
//                         value={additionalType.additionalFeeDate}
//                         onChange={(e) => handleDateChange(e, index)}
//                       />
//                     </div>
                   
//                     <div>
//                       <label className="block text-gray-600">Amount</label>
//                       <input
//                         type="number"
//                         className="w-full border rounded-lg p-2"
//                         value={additionalType.subjectTotalMarks}
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
//               +
//             </button> */}
//             {/* <button
//               className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
//               onClick={handleModalClose}
//             >
//               Cancel
//             </button> */}
//             <div className="flex justify-end mt-4">
//               <button
//                 className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
//                 onClick={handleSubmit}
//               >
//                 Submit
//               </button>
//               <button
//                 // className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
//                 className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
//                 onClick={handleModalClose}
//               >
//                 {/* {   &#x2716;} */}
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="mt-8">
//         <h2 className="text-2xl font-semibold mb-4 text-indigo-600">
//           Exam Data
//         </h2>
//         <div className="overflow-x-auto bg-gray-100 rounded-lg p-4">
//           <table className="w-full border-collapse table-auto">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="border text-left px-4 py-2">Months</th>
//                 <th className="border text-left px-4 py-2">Status</th>
//                 <th className="border text-left px-4 py-2">Total Amount</th>
//                 <th className="border text-left px-4 py-2">Amount</th>
//                 <th className="border text-left px-4 py-2">Fee Paid Date</th>
//                 <th className="border text-left px-4 py-2">Additional Fee</th>
//               </tr>
//             </thead>
//             <tbody>
//               {examData.map((data, index) => (
//                 <tr key={index}>
//                   {/* Log the data for debugging */}
//                   {console.log("data", data)}

//                   {/* Display individual data fields in table cells */}
//                   <td className="border px-4 py-2">{data.month}</td>
//                   <td className="border px-4 py-2">{data.status}</td>
//                   <td className="border px-4 py-2">{data.paidAmount}</td>
//                   {/* Uncomment the line below if 'feeAmount' is part of your data */}
//                   {/* <td className="border px-4 py-2">{data.feeAmount}</td> */}
//                   <td className="border px-4 py-2">{data.date}</td>

//                   {/* AdditionalType data (commented out for now) */}
//                   {/* <td className="border px-4 py-2">
//         {data.additionalType.length > 0 ? (
//           data.additionalType.map((subject, i) => (
//             <div key={i}>
//               <div className='flex'>
//                 <p className='font-bold w-[100px] '> feeType :</p>
//                 {subject.feeType}
//               </div>
//               <div className='flex'>
//                 <p className='font-bold w-[100px]'>Amount:</p>
//                 {subject.subjectTotalMarks}
//               </div>
//               <div className='flex'>
//                 <p className='font-bold w-[100px] '> Date:</p>
//                 {subject.additionalFeeDate}
//               </div> 
//             </div>
//           ))) : (<div>No data found</div>)
//         }
//       </td> */}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentFeeStatus;

// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import axios from "axios";

// const StudentFeeStatus = () => {
//   const { email } = useParams();
//   const [studentData, setStudentData] = useState({});
//   const [getFee, setGetFee] = useState({});
//   const [selectedMonths, setSelectedMonths] = useState([]);
//   const [selectedAdditionalFees, setSelectedAdditionalFees] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [examData, setExamData] = useState([]);

//   const [formData, setFormData] = useState({
//     studentId: "",
//     feeAmount: "",
//     FeeMonth: "",
//     feeDate: "",
//     feeStatus: "",
//     amountSubmitted: "",
//   });

//   useEffect(() => {
//     axios
//       .get(`http://localhost:4000/api/v1/adminRoute/getAllStudents?email=${email}`, {
//         withCredentials: true,
//       })
//       .then((response) => {
//         const data = response.data.allStudent[0];
//         setStudentData(data);
//       })
//       .catch((error) => {
//         console.error("error fetching Student data : ", error);
//       });
//   }, [email]);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:4000/api/v1/fees/getFeeStatus?studentId=${studentData._id}`, {
//         withCredentials: true,
//       })
//       .then((response) => {
//         console.log(response);
//       })
//       .catch((error) => {
//         console.error("error fetching Fees data : ", error);
//       });
//   }, [studentData._id]);

//   const handleModalOpen = () => {
//     axios
//       .get(`http://localhost:4000/api/v1/adminRoute/getFees`, {
//         withCredentials: true,
//       })
//       .then((response) => {
//         const data = response.data;
//         const feeTypeArray = data;
//         const studentClass = studentData.class;
  
//         if (Array.isArray(feeTypeArray)) {
//           const studentFeeAmount = feeTypeArray
//             .filter((feeType) => feeType.className === studentClass)
//             .map((classData) => classData.amount)[0];
  
//           console.log("Fee Amount for the class", studentFeeAmount);
//           setGetFee(studentFeeAmount);
//           setIsModalOpen(true);
//         } else {
//           console.error("Invalid or undefined feeTypeArray");
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching Fee data: ", error);
//       });
//   };
  

//   const handleMonthsChange = (e) => {
//     setFormData({ ...formData, FeeMonth: e.target.value });
//   };

//   const handleMonthCheckboxChange = (e) => {
//     const { value, checked } = e.target;
//     if (checked) {
//       setSelectedMonths((prevSelectedMonths) => [...prevSelectedMonths, value]);
//     } else {
//       setSelectedMonths((prevSelectedMonths) =>
//         prevSelectedMonths.filter((month) => month !== value)
//       );
//     }
//   };

//   const handleAdditionalFeeCheckboxChange = (e) => {
//     const { value, checked } = e.target;
//     if (checked) {
//       setSelectedAdditionalFees((prevSelectedFees) => [...prevSelectedFees, value]);
//     } else {
//       setSelectedAdditionalFees((prevSelectedFees) =>
//         prevSelectedFees.filter((fee) => fee !== value)
//       );
//     }
//   };

//   const calculateTotalAmount = () => {
//     const regularFeesAmount = selectedMonths.length * getFee;
//     const additionalFeesAmount = selectedAdditionalFees.reduce((total, fee) => {
//       // Replace this with your actual logic to get the amount for each additional fee
//       // For example, if 'getAdditionalFeeAmount' is a function to get additional fee amount
//       const feeAmount = getAdditionalFeeAmount(fee);
//       return total + feeAmount;
//     }, 0);

//     return regularFeesAmount + additionalFeesAmount;
//   };

//   const handleAmountSubmittedChange = (e) => {
//     setFormData({ ...formData, amountSubmitted: e.target.value });
//   };

//   const handleSubmit = () => {
//     if (selectedMonths.length === 0) {
//       alert("Please select at least one month for regular fees.");
//       return;
//     }

//     const totalAmount = calculateTotalAmount();
//     const dues = totalAmount - formData.amountSubmitted;

//     const newExamData = {
//       studentId: studentData._id,
//       feeHistory: [
//         {
//           paidAmount: totalAmount,
//           month: selectedMonths,
//           status: formData.feeStatus,
//           date: formData.feeDate,
//           studentId: studentData._id,
//         },
//       ],
//     };

//     const apiUrl = "http://localhost:4000/api/v1/fees/createFeeStatus";
//     axios
//       .post(apiUrl, newExamData, {
//         withCredentials: true,
//       })
//       .then((response) => {
//         console.log("Data Post Successfully : ", response);
//       })
//       .catch((error) => {
//         console.error("Error Posting Data :", error);
//       });

//     setExamData([...examData, newExamData]);

//     setFormData({
//       feeAmount: "",
//       FeeMonth: "",
//       feeStatus: "",
//       feeDate: "",
//     });

//     setIsModalOpen(false);
//   };

//   // ... (previous code remains unchanged)

//   return (
//     <div className="py-8 px-4 md:px-8">
//       <div className=" flex justify-center mt-4">
//         {studentData.image && studentData.image.url ? (
//           <img
//             className="w-[80px] h-[80px] rounded-full"
//             src={studentData.image.url}
//             alt="Image"
//           />
//         ) : (
//           <p>No image available</p>
//         )}
//       </div>

//       <div className=" ">
//         <h2 className="  text-[14px] ">Name : {studentData.fullName}</h2>
//         <h2 className="  text-[14px] ">Email : {studentData.email}</h2>
//         <h2 className="  text-[14px] ">Class : {studentData.class}</h2>
//       </div>
//       <div className="flex justify-center">
//         <button
//           className="bg-blue-500 hover-bg-blue-700 text-white font-semibold py-2 px-4 rounded"
//           onClick={handleModalOpen}
//         >
//           Create Fee
//         </button>
//       </div>

//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center z-50">
//           <div className="modal p-4 bg-white rounded-lg shadow-lg md:w-2/3 lg:w-1/2">
//             {/* ... (previous modal code remains unchanged) */}
//           </div>
//         </div>
//       )}

//       <div className="mt-8">
//         <h2 className="text-2xl font-semibold mb-4 text-indigo-600">
//           Exam Data
//         </h2>
//         <div className="overflow-x-auto bg-gray-100 rounded-lg p-4">
//           <table className="w-full border-collapse table-auto">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="border text-left px-4 py-2">Months</th>
//                 <th className="border text-left px-4 py-2">Status</th>
//                 <th className="border text-left px-4 py-2">Total Amount</th>
//                 <th className="border text-left px-4 py-2">Fee Paid Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {examData.map((data, index) => (
//                 <tr key={index}>
//                   <td className="border px-4 py-2">{data.month}</td>
//                   <td className="border px-4 py-2">{data.status}</td>
//                   <td className="border px-4 py-2">{data.paidAmount}</td>
//                   <td className="border px-4 py-2">{data.date}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentFeeStatus;

import React, { useEffect, useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const StudentFeeStatus = () => {
  const [studentData, setStudentData] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    class: "Class 10",
  });

  const [getFee, setGetFee] = useState(100);

  const [selectedMonths, setSelectedMonths] = useState([]);
  const [selectedAdditionalFees, setSelectedAdditionalFees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [examData, setExamData] = useState([]);

  const [formData, setFormData] = useState({
    regularFee: "",
    feeDate: new Date(), // Initialize with the current date
    feeStatus: "",
    amountSubmitted: "",
  });

  const demoAdditionalFees = [
    { id: 1, name: "Exam Fee", amount: 50 },
    { id: 2, name: "Library Fee", amount: 30 },
  ];

  const handleModalOpen = () => {
    setGetFee(100);
    setIsModalOpen(true);
  };

  const handleRegularFeeChange = (selectedOption) => {
    setFormData({ ...formData, regularFee: selectedOption.value });
  };

  const handleMonthsChange = (selectedOptions) => {
    setSelectedMonths(selectedOptions.map((option) => option.value));
  };

  const handleAdditionalFeesChange = (selectedOptions) => {
    setSelectedAdditionalFees(
      selectedOptions.map((option) => {
        const selectedFeeId = option.value;
        return demoAdditionalFees.find((fee) => fee.id === parseInt(selectedFeeId));
      })
    );
  };

  const getTotalFeesAmount = () => {
    const regularFeesAmount = formData.regularFee * selectedMonths.length;
    const additionalFeesAmount = selectedAdditionalFees.reduce((total, fee) => total + fee.amount, 0);

    return regularFeesAmount + additionalFeesAmount;
  };

  const handleAmountSubmittedChange = (e) => {
    setFormData({ ...formData, amountSubmitted: e.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, feeDate: date });
  };

  const handleSubmit = () => {
    if (selectedMonths.length === 0) {
      alert("Please select at least one month for regular fees.");
      return;
    }

    const totalAmount = getTotalFeesAmount();
    const dues = totalAmount - formData.amountSubmitted;

    const newExamData = {
      studentId: 1, // Demo student ID
      feeHistory: [
        {
          paidAmount: totalAmount,
          month: selectedMonths,
          status: formData.feeStatus,
          date: formData.feeDate.toISOString(), // Convert date to string
          studentId: 1, // Demo student ID
        },
      ],
    };

    // Update examData state with the new exam data
    setExamData((prevExamData) => [...prevExamData, newExamData]);

    // Log the new exam data for demo purposes
    console.log("New Exam Data:", newExamData);

    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="py-8 px-4 md:px-8">
      <div className="flex justify-center mt-4">
        <p>No image available</p>
      </div>

      <div>
        <h2 className="text-[14px]">Name: {studentData.fullName}</h2>
        <h2 className="text-[14px]">Email: {studentData.email}</h2>
        <h2 className="text-[14px]">Class: {studentData.class}</h2>
      </div>
      <div className="flex justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          onClick={handleModalOpen}
        >
          Create Fee
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal p-4 bg-white rounded-lg shadow-lg md:w-2/3 lg:w-1/2">
            <div className="flex justify-between">
              <span className="text-2xl font-semibold mb-4 text-indigo-600">Fee Form</span>
              <span className="text-2xl font-semibold mb-4 text-indigo-600">
                Fee Amounts: {getFee}
              </span>
            </div>
            <div className="mb-4">
              <label className="block text-gray-600">Regular Fee</label>
              <Select
                options={[
                  { value: "100", label: "100" },
                  { value: "150", label: "150" },
                  // Add more options as needed
                ]}
                value={{ value: formData.regularFee, label: formData.regularFee }}
                onChange={handleRegularFeeChange}
                isSearchable={false}
                placeholder="Select regular fee"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600">Months</label>
              <Select
                options={["January", "February", "March"].map((month) => ({
                  value: month,
                  label: month,
                }))}
                value={selectedMonths.map((month) => ({ value: month, label: month }))}
                onChange={handleMonthsChange}
                isMulti
                placeholder="Select months"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600">Additional Fees</label>
              <Select
                options={demoAdditionalFees.map((fee) => ({
                  value: fee.id.toString(),
                  label: `${fee.name} (${fee.amount})`,
                }))}
                value={selectedAdditionalFees.map((fee) => ({
                  value: fee.id.toString(),
                  label: `${fee.name} (${fee.amount})`,
                }))}
                onChange={handleAdditionalFeesChange}
                isMulti
                placeholder="Select additional fees"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="mb-4">
                <label className="block text-gray-600">Fee Status</label>
                <select
                  className="w-full border rounded-lg p-2"
                  value={formData.feeStatus}
                  onChange={(e) => setFormData({ ...formData, feeStatus: e.target.value })}
                >
                  <option value="Paid">Paid</option>
                  <option value="Unpaid">Unpaid</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Amount Submitted</label>
                <input
                  type="number"
                  className="w-full border rounded-lg p-2"
                  value={formData.amountSubmitted}
                  onChange={handleAmountSubmittedChange}
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-600">Fee Submission Date</label>
              <DatePicker
                selected={formData.feeDate}
                onChange={handleDateChange}
                dateFormat="MMMM d, yyyy"
                className="w-full border rounded-lg p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600">Total Fees Amount</label>
              <p>{getTotalFeesAmount()}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-600">Dues</label>
              <p>{getTotalFeesAmount() - formData.amountSubmitted}</p>
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
                onClick={handleSubmit}
              >
                Submit
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
                onClick={handleModalClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">Exam Data</h2>
        <div className="overflow-x-auto bg-gray-100 rounded-lg p-4">
          <table className="w-full border-collapse table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="border text-left px-4 py-2">Months</th>
                <th className="border text-left px-4 py-2">Status</th>
                <th className="border text-left px-4 py-2">Total Amount</th>
                <th className="border text-left px-4 py-2">Fee Paid Date</th>
              </tr>
            </thead>
            <tbody>
              {examData.map((data, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{data.feeHistory[0].month.join(", ")}</td>
                  <td className="border px-4 py-2">{data.feeHistory[0].status}</td>
                  <td className="border px-4 py-2">{data.feeHistory[0].paidAmount}</td>
                  <td className="border px-4 py-2">{data.feeHistory[0].date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentFeeStatus;

