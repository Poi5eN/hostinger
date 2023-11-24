import React, { useState } from 'react';

const CreateCurriculum = () => {
  const [selectedGrade, setSelectedGrade] = useState('10th');
  const [selectedAcademicYear, setSelectedAcademicYear] = useState('2023-2024');
  const [uploadedPDF, setUploadedPDF] = useState(null);

  const handleGradeChange = (e) => {
    setSelectedGrade(e.target.value);
  };

  const handleAcademicYearChange = (e) => {
    setSelectedAcademicYear(e.target.value);
  };

  const handlePDFUpload = (e) => {
    const file = e.target.files[0];
    setUploadedPDF(file);
  };

  return (
    <div className="bg-gradient-to-r from-yellow-400 to-green-500 min-h-screen p-8 flex flex-col items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-blue-500 mb-4">School Curriculum</h1>

        <div className="mb-4">
          <label className="text-xl font-semibold mb-2">Grade:</label>
          <select
            value={selectedGrade}
            onChange={handleGradeChange}
            className="text-gray-600 bg-gray-100 p-2 rounded-md w-full"
          >
            <option value="10th">10th</option>
            <option value="11th">11th</option>
            <option value="12th">12th</option>
            {/* Add more grade options here */}
          </select>
        </div>

        <div className="mb-4">
          <label className="text-xl font-semibold mb-2">Academic Year:</label>
          <select
            value={selectedAcademicYear}
            onChange={handleAcademicYearChange}
            className="text-gray-600 bg-gray-100 p-2 rounded-md w-full"
          >
            <option value="2023-2024">2023-2024</option>
            <option value="2024-2025">2024-2025</option>
            {/* Add more academic year options here */}
          </select>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Courses</h2>
          <ul className="text-gray-600">
            <li>Mathematics</li>
            <li>Science</li>
            <li>English</li>
            <li>History</li>
            <li>Physical Education</li>
          </ul>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Upcoming Events</h2>
          <ul className="text-gray-600">
            <li>Parent-Teacher Meeting: October 15, 2023</li>
            <li>School Play: November 5, 2023</li>
          </ul>
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

        {uploadedPDF && (
          <div className="mb-4">
            <label className="text-xl font-semibold mb-2">Uploaded PDF:</label>
            <a href={URL.createObjectURL(uploadedPDF)} target="_blank" rel="noopener noreferrer">
              {uploadedPDF.name}
            </a>
          </div>
        )}

        {/* Additional information sections, like courses and events, can be added as needed */}
      </div>
    </div>
  );
};

export default CreateCurriculum;