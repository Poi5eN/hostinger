import React from 'react';
import school from '../../ShikshMitraWebsite/assets/student.png';

const AdmitCard = () => {
  return (
    <div className="p-4 border border-gray-300 rounded-lg max-w-xl mx-auto bg-white shadow-md">
      <div className="text-center">
        <h1 className="text-3xl font-semibold">Corplyx Public School</h1>
        <p>School Address</p>
      </div>
      <div className="mt-4 text-center">
        <h2 className="text-xl font-semibold">Admit Card</h2>
        <p>Exam: Your Exam Name</p>
        <p>Academic Year: 2023-2024</p>
      </div>
      <div className="mt-8 flex flex-wrap justify-center items-center">
        <img src={school} alt="Student Photo" className="w-24 h-24 mr-6" />
        <div className="mt-4 w-full md:w-1/2 text-center md:text-left">
          <p className="font-semibold">Student Details</p>
          <p>Name: John Doe</p>
          <p>Class: 10th Grade</p>
          <p>Admission Number: 123456</p>
          <p>Roll Number: 12345</p>
        </div>
      </div>
      <div className="mt-6">
        <p className="font-semibold">Exam Schedule:</p>
        <table className="w-full border border-gray-300 mt-2">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 p-2">Exam</th>
              <th className="border border-gray-300 p-2">Date</th>
              <th className="border border-gray-300 p-2">Day</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">Math</td>
              <td className="border border-gray-300 p-2">12/05/2023</td>
              <td className="border border-gray-300 p-2">Monday</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Science</td>
              <td className="border border-gray-300 p-2">12/06/2023</td>
              <td className="border border-gray-300 p-2">Tuesday</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Science</td>
              <td className="border border-gray-300 p-2">12/06/2023</td>
              <td className="border border-gray-300 p-2">Tuesday</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Science</td>
              <td className="border border-gray-300 p-2">12/06/2023</td>
              <td className="border border-gray-300 p-2">Tuesday</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Science</td>
              <td className="border border-gray-300 p-2">12/06/2023</td>
              <td className="border border-gray-300 p-2">Tuesday</td>
            </tr>
            {/* Add more rows for other exams and dates */}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <p className="font-semibold">Important Instructions:</p>
        <ul className="list-disc list-inside text-sm">
          <li>Please arrive at the exam center 30 minutes before the exam.</li>
          <li>Bring this admit card and a valid ID for verification.</li>
          {/* Add more instructions as needed */}
        </ul>
      </div>
      <div className="mt-4">
        <p className="font-semibold">Signature:</p>
        <div className="border border-gray-300 w-1/2 mx-auto h-8"></div>
      </div>
    </div>
  );
};

export default AdmitCard;