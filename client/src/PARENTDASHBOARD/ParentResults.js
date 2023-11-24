import React, { useState } from "react";

const ParentResults = () => {
  const [exams, setExams] = useState([
    { id: 1, name: "Midterm Exam", subject: "Math" },
    { id: 2, name: "Final Exam", subject: "Science" },
    { id: 3, name: "Quiz 1", subject: "History" },
    { id: 4, name: "Quiz 2", subject: "English" },
    { id: 5, name: "Test 1", subject: "Physics" },
    { id: 6, name: "Test 2", subject: "Chemistry" },
  ]);

  const [selectedExam, setSelectedExam] = useState("");
  const [selectedClass, setSelectedClass] = useState("Class A");
  const [selectedSection, setSelectedSection] = useState("Section 1");

  const [students, setStudents] = useState([
    { id: 1, name: "Student 1" },
   
  ]);

  const [maximumMarks, setMaximumMarks] = useState({
    Math: 100,
    Science: 100,
    History: 100,
    English: 100,
    Physics: 100,
    Chemistry: 100,
  });

  const [marks, setMarks] = useState({});
  const [editMode, setEditMode] = useState(false);

  const handleExamChange = (e) => {
    setSelectedExam(e.target.value);
  };

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const handleSectionChange = (e) => {
    setSelectedSection(e.target.value);
  };

  const handleMarksChange = (studentId, subject, value) => {
    setMarks((prevMarks) => ({
      ...prevMarks,
      [studentId]: {
        ...prevMarks[studentId],
        [subject]: parseInt(value, 10), // Parse the input as an integer
      },
    }));
  };

  const calculateTotalMarksForStudent = (studentId) => {
    let totalMarks = 0;
    for (const subject in marks[studentId]) {
      totalMarks += marks[studentId][subject];
    }
    return totalMarks;
  };

  const calculateMaximumMarksForStudent = (studentId) => {
    let totalMaxMarks = 0;
    for (const subject in maximumMarks) {
      totalMaxMarks += maximumMarks[subject];
    }
    return totalMaxMarks;
  };

  const calculatePercentageForStudent = (studentId) => {
    const totalMarks = calculateTotalMarksForStudent(studentId);
    const totalMaxMarks = calculateMaximumMarksForStudent(studentId);
    return (totalMarks / totalMaxMarks) * 100;
  };

  const handleSubmitMarks = () => {
    // Implement API call to store marks for students
    // Use the marks state to send data to the server
    setEditMode(false);
  };

  return (
    <div className="bg-gray-100 p-4 ">
      <div className=" mx-auto">
        <h1 className="text-2xl font-bold mb-4">Results</h1>
        <div className="grid">
          <div className="flex flex-wrap space-y-2 md:space-y-0 md:space-x-4">
            {/* <select
              className="p-2 border rounded-md md:w-1/4"
              onChange={handleExamChange}
              value={selectedExam}
            >
              <option value="">Select Exam</option>
              {exams.map((exam) => (
                <option key={exam.id} value={exam.id}>
                  {exam.name}
                </option>
              ))}
            </select>
            <select
              className="p-2 border rounded-md md:w-1/4"
              onChange={handleClassChange}
              value={selectedClass}
            >
              <option value="Class A">Class A</option>
              <option value="Class B">Class B</option>
           
            </select>
            <select
              className="p-2 border rounded-md md:w-1/4"
              onChange={handleSectionChange}
              value={selectedSection}
            >
              <option value="Section 1">Section 1</option>
              <option value="Section 2">Section 2</option>
              
            </select> */}
          </div>
          {students.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300"> Name</th>
                    {exams.map((exam) => (
                      <th key={exam.id} className="border border-gray-300">
                        {exam.subject}
                      </th>
                    ))}
                    <th className="border border-gray-300">Total Marks</th>
                    <th className="border border-gray-300">Maximum Marks</th>
                    <th className="border border-gray-300">Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td className="border border-gray-300">{student.name}</td>
                      {exams.map((exam) => (
                        <td key={exam.id} className="border border-gray-300">
                          {editMode ? (
                            <input
                            // className="w-full"
                              type="number"
                              value={marks[student.id]?.[exam.subject] || ""}
                              onChange={(e) =>
                                handleMarksChange(
                                  student.id,
                                  exam.subject,
                                  e.target.value
                                )
                              }
                            />
                          ) : (
                            marks[student.id]?.[exam.subject]
                          )}
                        </td>
                      ))}
                      <td className="border border-gray-300">
                        {editMode ? (
                          ""
                        ) : (
                          calculateTotalMarksForStudent(student.id)
                        )}
                      </td>
                      <td className="border border-gray-300">
                        {calculateMaximumMarksForStudent(student.id)}
                      </td>
                      <td className="border border-gray-300">
                        {editMode ? (
                          ""
                        ) : (
                          calculatePercentageForStudent(student.id)
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="mt-4">
            {/* <button
              className={`bg-blue-500 text-white px-4 py-2 rounded-md ${
                editMode ? "hidden" : ""
              }`}
              onClick={() => setEditMode(true)}
            >
              Edit Marks
            </button> */}
            {/* <button
              className="bg-green-500 text-white px-4 py-2 rounded-md"
              onClick={handleSubmitMarks}
            >
              Submit Marks
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentResults;
