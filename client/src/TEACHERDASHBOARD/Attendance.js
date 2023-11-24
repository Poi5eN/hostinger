import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import 'tailwindcss/tailwind.css';

const Attendance = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [date, setDate] = useState(getFormattedDate(new Date()));
  const [isEditing, setIsEditing] = useState(true);
  const [daysInMonth, setDaysInMonth] = useState(getDaysInMonth(new Date()));
  const [currentDate, setCurrentDate] = useState('');
  const [studentAttendance, setStudentAttendance] = useState([]);
  const [studentTotalPresents, setStudentTotalPresents] = useState([]);
  const [dataAvailable, setDataAvailable] = useState(false);
  const [hoverMessage, setHoverMessage] = useState(''); // State to store the hover message


  useEffect(() => {
    // Set the initial state for studentTotalPresents here
    setStudentTotalPresents(Array(students.length).fill(studentTotalPresents));
  }, []);
  
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/adminRoute/getAllStudents", {
          withCredentials: true,
        });

        if (Array.isArray(response.data.allStudent)) {
          const updatedStudents = response.data.allStudent.map((student) => ({
            id: student._id,
            name: student.fullName,
            rollNo: student.rollNo,
            attendance: false,
          }));

          setStudents(updatedStudents);
        } else {
          console.error("Data format is not as expected:", response.data.allStudent);
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudentData();
  }, []);

  const toggleAttendance = (studentId) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === studentId
          ? { ...student, attendance: !student.attendance }
          : student
      )
    );
  };

  const handleSubmit = async () => {
    setModalIsOpen(false);
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    const studentInfo = students.map((student) => ({
      studentId: student.id,
      rollNo: student.rollNo,
      present: student.attendance,
      date: formattedDate,
    }));

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/teacher/createAttendance",
        {
          attendanceRecords: studentInfo,
        },
        {
          withCredentials: true,
        }
      );
      console.log("Attendance data sent:", response.data);

      // Clear the attendance status after a successful POST request
      setStudents((prevStudents) =>
        prevStudents.map((student) => ({
          ...student,
          attendance: false,
        })
      ));
    } catch (error) {
      console.error("Error sending attendance data:", error);
    }
  };

  useEffect(() => {
    setDataAvailable(true);
    fetchData();
  }, [date]);

  useEffect(() => {
    fetchData();
  }, []);





  useEffect(() => {
    setStudentTotalPresents(Array(students.length).fill(0));
  }, [students]);

  const fetchData = async () => {
    const selectedDate = new Date(date);
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1;
    try {
      const response = await axios.get("http://localhost:4000/api/v1/teacher/getAttendance", {
        params: {
          year: year,
          month: month,
        },
        withCredentials: true,
      });

      if (response.data && response.data.data) {
        console.log(response.data.data[0].attendanceData[0].date)
        const attendanceData = response.data.data;
      if (attendanceData.length > 0) {
        attendanceData.forEach((studentData) => {
        const studentId = studentData.studentId;
        const totalAttendance = studentData.attendanceData.reduce((total, data) => total + data.present, 0);
        console.log(`Student Id: ${studentId}, Total Attendance: ${totalAttendance}`);

        setStudentAttendance(attendanceData);
        setStudentTotalPresents((prevPresents) => {
          const updatedPresents = [...prevPresents];
          const studentIndex = students.findIndex((student) => student.id === studentId);
          updatedPresents[studentIndex] = totalAttendance;
        return updatedPresents;
      });
    });
        } else {
          console.log("No student attendance data found in the response.");
          setDataAvailable(false); // Data is not available for the selected month

        }
      } else {
        console.log("No attendance data found in the response.");
        setDataAvailable(false); // Data is not available for the selected month

      }

      console.log("Response from the backend:", response.data);
    } catch (error) {
      console.error("Error while fetching attendance data:", error);
      setDataAvailable(false); // Data is not available for the selected month

    }
  };

  useEffect(() => {
    setDaysInMonth(getDaysInMonth(new Date(date)));
  }, [date]);

  const handleToggleAttendance = (studentId, day) => {
    setStudents((prevStudents) => {
      const updatedStudents = prevStudents.map((student) => {
        if (student.id === studentId) {
          return {
            ...student,
            attendance: [
              ...student.attendance.slice(0, day),
              !student.attendance[day],
              ...student.attendance.slice(day + 1),
            ],
          };
        }
        return student;
      });
      return updatedStudents;
    });
  };

  function getFormattedDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${year}-${month}`;
  }

  function getDaysInMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }

  const dateHeaders = [...Array(daysInMonth)].map((_, index) => (
    <th key={index} className="px-2 py-1 border bg-gray-300">
      {index + 1}
    </th>
  ));

  useEffect(() => {
    const today = new Date();
    const formattedDate = getFormattedDate(today);
    setCurrentDate(formattedDate);
    console.log(formattedDate);
  }, []);

  const dateLabels = Array.from({ length: daysInMonth }, (_, day) => {
    const date = new Date(new Date().setDate(day + 1));
    const formattedDate = date.getDate().toString().padStart(2, '0');
    return formattedDate;
  });
  
  
  

  const studentRows = students.map((student, index) => {
    const totalPresents = studentTotalPresents[index]; // Get the total presents for the current student
  
    return (
      <tr key={student.id}>
        <td className="px-2 py-1 border">{index + 1}</td>
        <td className="px-2 py-1 border">{student.name}</td>
        {dateLabels.map((dateLabel, dateIndex) => {
        const attendanceData = studentAttendance.find(
          (data) => data.studentId === student.id
        );
  
        const formattedResponseDate = (responseDate) => {
          const dateObject = new Date(responseDate);
          const day = dateObject.getDate(); // Get the day part (1-31)
          return day.toString().padStart(2, '0'); // Format it as "DD"
        };

          const cellContent = () => {
            if (attendanceData && attendanceData.attendanceData[dateIndex]) {
              
            const responseDate = attendanceData.attendanceData[dateIndex].date; // Replace with your actual date
            const formattedDate = formattedResponseDate(responseDate)
            const matchingDateData = attendanceData.attendanceData.find(
              (data) => formattedResponseDate(data.date)+1 == dateLabel
            );
            const inputDate = new Date(attendanceData.attendanceData[dateIndex].date);

            const year = inputDate.getFullYear();
            const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
            const day = inputDate.getDate().toString().padStart(2, '0');

            const formatDate = `${year}-${month}-${day}`;
              return (
                <td key={dateIndex} 
                className="px-2 py-1 border text-center"
                onMouseEnter={() => handleMouseEnter(student.name, formatDate)}
                >
                  <span
                    className={
                      attendanceData.attendanceData[dateIndex].present
                        ? 'text-green-600' /* Add a green color class for '✅' */
                        : 'text-red-600' /* Add a red color class for '❌' */
                    }
                  >
                    {attendanceData.attendanceData[dateIndex].present ? '✅' : '❌'}
                  </span>
                </td>
              );
            } else {
              return (
                <td key={dateIndex} className="px-2 py-1 border text-center">
                {/* Render date labels in this cell */}
                {/* {dateLabel} */}
              </td>              ); // Render an empty cell if no data is available for the specific date
            }
          };
  
          return cellContent();
        })}
        <td className="px-2 py-1 border">{totalPresents}</td> {/* Display total presents here */}
      </tr>
    );
  });
  
  
  
  const handleMouseEnter = (studentName, date) => {
    const message = `Student Name: ${studentName}, Date: ${date}`;
    console.log(message); // Log the message to the console
    setHoverMessage(message); // Update the state with the message
  };

  const handleMouseLeave = () => {
    // Clear the hover message when the mouse leaves the table
    setHoverMessage('');
  };

  return (
    <div className="text-center py-6">
      <button
        onClick={() => setModalIsOpen(true)}
        className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
      >
        Mark Attendance
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Mark Attendance Modal"
        style={{
          overlay: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
          content: {
            width: '50%',
            height: '50%',
            position: 'relative',
          },
        }}
      >
        <h2 className="text-2xl mb-4 font-semibold">Mark Attendance for {currentDate}</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2">Student</th>
              <th className="py-2">Present</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-b">
                <td className="py-2">{student.name}</td>
                <td className="py-2">
                  <input
                    type="checkbox"
                    checked={student.attendance}
                    onChange={() => toggleAttendance(student.id)}
                    className="form-checkbox h-5 w-5 text-blue-500"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleSubmit}
            className="bg-green-500 hover-bg-green-700 text-white font-bold py-2 px-4 rounded-md mr-4"
          >
            Submit
          </button>
          <button
            onClick={() => setModalIsOpen(false)}
            className="bg-red-500 hover-bg-red-700 text-white font-bold py-2 px-4 rounded-md"
          >
            Cancel
          </button>
        </div>
      </Modal>

      <div className="grid mx-auto p-4 overflow-hidden">
        <h1 className="text-2xl font-bold mb-4 text-indigo-600">
          Student Attendance Management System
        </h1>
        <div className="mb-4">
          <label className="mr-2">Month:</label>
          <input
            type="month"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            disabled={!isEditing}
            className="rounded p-2 border border-gray-300"
          />
          {hoverMessage && (
        <div className="mt-4">
          <p>{hoverMessage}</p>
        </div>
      )}
        </div>
        <div className="overflow-x-auto w-full p-3 flex justify-center">
        <div className="w-full overflow-scroll" onMouseLeave={handleMouseLeave}>
          {dataAvailable ? (
            
            <table className="table-auto">
              <thead>
                <tr>
                  <th className="px-2 py-1 border bg-gray-300">Serial Number</th>
                  <th className="px-2 py-1 border bg-gray-300">Student Name</th>
                  {dateLabels.map((dateLabel, dateIndex) => (
                  <th key={dateIndex} className="px-2 py-1 border bg-gray-300">
                    {dateLabel}
                  </th>
                  ))} 
                  <th className="px-2 py-1 border bg-gray-300">Total No Of Present</th>
                </tr>
              </thead>
              <tbody>{studentRows}</tbody>
            </table>
          ) : (
            <h1>No Records found for the {date}.</h1>
          )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;