import React, { useState, useEffect } from "react";
import axios from "axios";

export const GET_ALL_EXAMS_API = "http://localhost:4000/api/v1/exam/getAllExams";
export const GET_ALL_STUDENTS_API = "http://localhost:4000/api/v1/adminRoute/getAllStudents?studentClass=11&studentSection=A";
export const CREATE_RESULTS_API = "http://localhost:4000/api/v1/results/createResults";
export const GET_RESULTS_API = "http://localhost:4000/api/v1/results/getResults";

const Results = () => {
  const classdata = JSON.parse(localStorage.getItem("response"));
  
  const [resultData, setResultData] = useState([]);
  const [selectedExam, setSelectedExam] = useState("");
  const [students, setStudents] = useState([]);
  const [studentMarks, setStudentMarks] = useState({});
  const [examData, setExamData] = useState([]);
  const [maximumMarks, setMaximumMarks] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [totalMarks, setTotalMarks] = useState('');

  useEffect(() => {
    const fetchExamData = () => {
      axios
        .get(GET_ALL_EXAMS_API, {
          withCredentials: true,
        })
        .then((response) => {
          const examData = response.data.examData;
          setExamData(examData);

          const maxMarks = {};
          const examSubjects = [];

          if (examData) {
            examData.forEach((exam) => {
              if (exam.examInfo) {
                exam.examInfo.forEach((item) => {
                  maxMarks[item._id] = item.subjectTotalMarks;
                  examSubjects.push(item.subjectName);
                });
              }
            });
          }

          setMaximumMarks(maxMarks);
          setSubjects([...new Set(examSubjects)]);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    fetchExamData();
    console.log("selectedExam",selectedExam)
  }, [selectedExam]);


  useEffect(() => {
    if (selectedExam) {
      const selectedExamData = examData.find((exam) => exam.examName === selectedExam);

      if (selectedExamData && students.length > 0) {
        const newStudentMarks = {};

        students.forEach((student) => {
          const studentId = student._id;
          newStudentMarks[studentId] = {};

          selectedExamData.examInfo.forEach((item) => {
            const subjectName = item.subjectName;
            const existingMarks = studentMarks[studentId]?.[subjectName] || 0;
            newStudentMarks[studentId][subjectName] = existingMarks;
          });
        });

        console.log("Updated studentMarks based on selectedExam:", newStudentMarks);
        setStudentMarks(newStudentMarks);
      }
    }
  }, [selectedExam, students, examData]);

  const handleSubmitMarks = () => {
    const selectedExamData = examData.find((exam) => exam.examName === selectedExam);

    if (!selectedExamData) {
      console.error("Selected exam data not found.");
      return;
    }

    const postData = {
      examName: selectedExam,
      className: classdata.classTeacher,
      section: classdata.section,
      resultsRecords: students.map((student) => {
        const studentMarksData = selectedExamData.examInfo.map((item) => ({
          subjectName: item.subjectName,
          marks: studentMarks[student._id]?.[item.subjectName] || 0,
        }));

        return {
          studentId: student._id,
          studentName: student.fullName,
          rollNo: student.rollNo || "",
          subjects: studentMarksData,
        };
      }),
    };

    axios
      .post(CREATE_RESULTS_API, postData, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("Marks submitted successfully:", response.data);
        setEditMode(false);
      })
      .catch((error) => {
        console.error("Error submitting marks:", error.response?.data || error.message);
      });
  };

  useEffect(() => {
    const selectedData = classdata
    console.log(selectedData)
    if (selectedData) {
      const { classTeacher, section } = selectedData;
  
      axios
        .get(`http://localhost:4000/api/v1/adminRoute/getAllStudents?studentClass=${classTeacher}&studentSection=${section}`, {
          withCredentials: true,
        })
        .then((response) => {
          const allStudent = response.data.allStudent;
          console.log("Students", allStudent)
          if (allStudent) {
            setStudents(allStudent);
            const initialMarks = {};
            allStudent.forEach((student) => {
              initialMarks[student._id] = {};
            });
            setStudentMarks(initialMarks);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      // Handle the case when selectedData is not defined
      console.error("Selected exam data not found.");
    }
  }, [selectedExam, examData]);
  

useEffect(() => {
  if (selectedExam) {
    // Fetch student marks from the backend based on the selectedExam
    axios
      .get(`${GET_RESULTS_API}?examName=${selectedExam}`, {
        withCredentials: true,
      })
      .then((response) => {
        const fetchedStudentMarks = {};

        response.data.data.forEach((result) => {
          const studentId = result.studentId;
          fetchedStudentMarks[studentId] = {};

          result.subjects.forEach((subject) => {
            const subjectName = subject.subjectName;
            const marks = subject.marks || 0;
            fetchedStudentMarks[studentId][subjectName] = marks;
          });
        });

        console.log("Fetched studentMarks based on selectedExam:", fetchedStudentMarks);
        setStudentMarks(fetchedStudentMarks);
      })
      .catch((error) => {
        console.error("Error fetching studentMarks:", error.response?.data || error.message);
      });
  }
}, [selectedExam]);

// ...


  const handleExamChange = (e) => {
    const selectedExamName = e.target.value;
    setSelectedExam(selectedExamName);

    const selectedExamData = examData.find((exam) => exam.examName === selectedExamName);
    const examSubjects = selectedExamData ? selectedExamData.examInfo.map((item) => item.subjectName) : [];
    setSubjects(examSubjects);
  };

  const handleMarksChange = (subjectId, value, studentId) => {
    setStudentMarks((prevStudentMarks) => {
      const updatedMarks = { ...prevStudentMarks };

      if (!updatedMarks[studentId]) {
        updatedMarks[studentId] = {};
      }

      updatedMarks[studentId][subjectId] = parseInt(value, 10);

      return updatedMarks;
    });
  };

  const calculateTotalMarksForStudent = (studentId) => {
    if (selectedExam) {
      const exam = examData.find((exam) => exam.examName === selectedExam);
      if (exam) {
        console.log("ExamData",exam)
        let total = 0;
        exam.examInfo.forEach((item) => {
          total += item.subjectTotalMarks;
        });
        console.log("SubjectTotalMarks",total)
        return total;
      }
    }
    return 0;
  };

  const calculateMaximumMarksForStudent = () => {
    if (selectedExam) {
      const exam = examData.find((exam) => exam.examName === selectedExam);
      if (exam) {
        let total = 0;
        exam.examInfo.forEach((item) => {
          total = item.subjectTotalMarks;
        });
        console.log("MarksTotal",total)
        const subjectsCount = exam.examInfo.length;
        return `${total * subjectsCount}`;
      }
    }
    return 0;
  };
  

  const calculateMarksStudent = (studentId) => {
    if (!selectedExam) {
      return 0;
    }

    const studentMarkData = studentMarks[studentId];
    if (!studentMarkData) {
      return 0;
    }

    const filteredSubjects = subjects
      .filter((subject) => {
        const selectedExamData = examData.find((exam) => exam.examName === selectedExam);
        return selectedExamData?.examInfo.some((info) => info.subjectName === subject);
      });

    const totalMarks = filteredSubjects.reduce((acc, subject) => {
      return acc + (studentMarkData[subject] || 0);
    }, 0);

    console.log("totalMarks",totalMarks);
    return totalMarks;
  };

  const calculatePercentageForStudent = (studentId) => {
    if (!selectedExam || !studentMarks[studentId]) {
      return 0;
    }
  
    const studentMarkData = studentMarks[studentId];
  
    const totalMarks = Object.values(studentMarkData).reduce((acc, subjectMark) => {
      return acc + (subjectMark || 0);
    }, 0);
  
    const totalMaxMarks = calculateMaximumMarksForStudent();
  
    // Check for division by zero
    if (totalMaxMarks === 0) {
      return "N/A"; // or handle it in your preferred way
    }
  
    const percentage = ((totalMarks / totalMaxMarks) * 100).toFixed(2);
    return `${percentage}%`;
  };
  

  const calculateSumOfSubjectTotalMarks = () => {
    if (selectedExam) {
      const exam = examData.find((exam) => exam.examName === selectedExam);
      if (exam) {
        let total = 0;
        exam.examInfo.forEach((item) => {
          const subjectMarks = studentMarks[item._id];
          if (subjectMarks) {
            total += subjectMarks[item.subjectName] || 0;
          }
        });
        console.log('Total Marks',total)
        return total;
      }
    }
    return 0;
  };

  return (
    <div className="bg-gray-100 p-4">
      <div className="mx-auto">
        <h1 className="text-2xl font-bold mb-4">Results Management</h1>
        <div className="grid">
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
            <h1 className="p-2 border rounded-md md:w-1/4">
              Class: {classdata.classTeacher}
            </h1>
            <h1 className="p-2 border rounded-md md:w-1/4">
              Section: {classdata.section}
            </h1>
          </div>
          {selectedExam && students.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300">Student Name</th>
                    {subjects
                      .filter((subject) => {
                        const selectedExamData = examData.find((exam) => exam.examName === selectedExam);
                        return selectedExamData?.examInfo.some((info) => info.subjectName === subject);
                      })
                      .map((subject, index) => (
                        <th key={index} className="border border-gray-300">
                          {subject}
                        </th>
                      ))}
                    <th className="border border-gray-300">Maximum Marks</th>
                    <th className="border border-gray-300">Total Marks</th>
                    <th className="border border-gray-300">Percentage</th>
                  </tr>
                </thead>
<tbody>
  {students.map((student) => (
    <tr key={student._id}>
      <td className="border border-gray-300">{student.fullName}</td>
      {subjects
        .filter((subject) => {
          const selectedExamData = examData.find((exam) => exam.examName === selectedExam);
          return selectedExamData?.examInfo.some((info) => info.subjectName === subject);
        })
        .map((subject, index) => {
          const subjectMarks = studentMarks?.[student._id]?.[subject] || "";
          console.log(`Subject: ${subject}, Marks: ${subjectMarks}`);
          return (
            <td key={index} className="border border-gray-300">
              {editMode ? (
                <input
                  type="number"
                  value={subjectMarks}
                  onChange={(e) => handleMarksChange(subject, e.target.value, student._id)}
                />
              ) : (
                subjectMarks
              )}
            </td>
          );
        })}
      <td className="border border-gray-300">
        {editMode ? "" : calculateTotalMarksForStudent(student._id)}
      </td>
      <td className="border border-gray-300">{calculateMarksStudent(student._id)}</td>
      <td className="border border-gray-300">
        {editMode ? "" : calculatePercentageForStudent(student._id)}
      </td>
    </tr>
  ))}
</tbody>

              </table>
            </div>
          )}
          <div className="mt-4">
            {editMode ? (
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md"
                onClick={handleSubmitMarks}
              >
                Submit Marks
              </button>
            ) : (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={() => setEditMode(true)}
              >
                Edit Marks
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;