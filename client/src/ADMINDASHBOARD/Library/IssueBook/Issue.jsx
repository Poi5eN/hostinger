import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Issue = ({ isOpen, onClose, bookId }) => {

  const [studentId, setStudentId] = useState('');

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post("http://localhost:4000/api/v1/adminRoute/issueBook", {
        studentId,
        bookId
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': "application/json"
        }
      } );
      console.log("response", response.data.message);
      onClose(); 
      setStudentId('');
    }
    catch (error) {
      console.log("Error: ", error.message);
    }

  };

  const handleCancel = () => {
    setStudentId('');
    onClose(); 
  };

  return (
    <div className={`modal ${isOpen ? 'block' : 'hidden'}`}>
      <div className="modal-dialog" style={{ top: 0, left: 0, right: 0, bottom: 0 }}>
        <div className="modal-content" style={{ height: '100%', borderRadius: 0 }}>
        
          <div className="modal-body">
            <div className="w-64 mx-auto ">
              <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
                <div className=" flex">
              
                  <input
                    type="text"
                    id="studentId"
                    name="studentId"
                    value={studentId}
                    placeholder="student id"
                    onChange={(e) => setStudentId(e.target.value)}
                    className="w-full  border rounded focus:outline-none focus:ring focus:border-blue-300"
                    required
                  />
                  <button type="submit" className="w-full bg-blue-500 text-white rounded py-2 hover:bg-blue-600">
                    Submit
                  </button>
                  <button type="button" onClick={handleCancel} className="w-full bg-gray-300 text-gray-700 rounded py-2 hover:bg-gray-400">
                    Cancel
                  </button>
                </div>
             
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Issue;

