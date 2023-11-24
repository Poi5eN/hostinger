// ViewProfile.js
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { usePDF } from "react-to-pdf";

import { FcLeft } from "react-icons/fc";
// import "../../Dynamic/Form/FormStyle.css";

const ViewStudent = () => {
  const { email } = useParams();
  const [studentData, setStudentData] = useState({});

  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });

  useEffect(() => {
    // Fetch teacher data based on the email parameter
    axios
      .get(
        `http://localhost:4000/api/v1/adminRoute/getAllStudents?email=${email}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        const data = response.data.allStudent[0];
        setStudentData(data);
      })
      .catch((error) => {
        console.error("Error fetching Student data:", error);
      });
  }, [email]);

  return (
    <>
      <div className=" w-full h-screen  flex items-center justify-center pt-10 modal-blur">
        <div
          ref={targetRef}
          className="bg-white  h-screen md:h-[85vh] sm:h-[70vh] gap-2 sm:p-4 md:p-4 lg:p-4 p-2 pt-16 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px]   overflow-y-auto"
        >
          <div className="w-[330px]  bg-[#01a9ac]  p-5   hover:shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset]">
            <div className="absolute bg-white w-[50px] h-[50px] rounded-full flex justify-center items-center shadow-2xl">
              <Link to="/admin/allstudent" className=" text-blue-500 text-3xl">
                <FcLeft />
              </Link>
            </div>
            {console.log("student")}
            <div className=" flex justify-center mt-4">
              {studentData.image && studentData.image.url ? (
                <img
                  className="w-[150px] h-[150px] rounded-full"
                  src={studentData.image.url}
                  alt="Image"
                />
              ) : (
                <p>No image available</p>
              )}
            </div>
            <div className="p-8">
              <h2 className="text-center text-lg text-white font-bold  ">
                {" "}
                {studentData.fullName}
              </h2>

              <h2 className="text-center text-white font-bold">
                {"  "}
                +91{studentData.contact}
              </h2>
              <hr />
              <div className="h-14 ">
                <p className=" p-2 font-bold">{`Address : ${studentData.address}`}</p>
              </div>
              <div className="flex justify-center mt-3 ">
                <button
                  onClick={() => {
                    toPDF();
                  }}
                  className=" bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                >
                  <svg
                    class="fill-current w-4 h-4 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                  </svg>
                  <span className="">Download</span>
                </button>
              </div>
            </div>
          </div>
          <div className="w-[330px] border-1 rounded-md border-[#01a9ac] p-5   hover:shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset]">
            <h1 className="text-center mb-3 font-extrabold">
              {" "}
              {studentData.fullName}'s Details
            </h1>

            <div className="flex"></div>
            <div className="flex justify-between gap-2 border-b-1  border-green-300 p-1 ">
              <h2 className="w-[130px]  text-[14px] ">Roll No:</h2>
              <span className="w-[200px]font-semibold text-[#01a9ac]  text-[12px]">
                {" "}
                {studentData.rollNo}
              </span>
            </div>
            <div className="flex justify-between gap-2 border-b-1  border-green-300 p-1 ">
              <h2 cclassName="w-[130px]  text-[14px] ">Email :</h2>
              <span className="w-[200px] font-semibold text-[#01a9ac] text-[12px]  ">
                {studentData.email}
              </span>
            </div>
            <div className="flex justify-start gap-2 border-b-1  border-green-300 p-1 ">
              <h2 cclassName="w-[130px]  text-[14px] ">Gender :</h2>
              <span className="font-semibold text-[#01a9ac]  text-[12px]">
                {" "}
                {studentData.gender}
              </span>
            </div>
            <div className="flex justify-start gap-2 border-b-1  border-green-300 p-1 ">
              <h2 className="w-[110px] ">Joining Date :</h2>
              <span className="font-semibold text-[#01a9ac]  text-[12px]">
                {" "}
                {studentData.joiningDate}
              </span>
            </div>
            <div className="flex justify-start gap-2 border-b-1  border-green-300 p-1 ">
              <h2 cclassName="w-[130px]  text-[14px] "> Class:</h2>
              <span className="font-semibold text-[#01a9ac]  text-[12px]">
                {" "}
                {studentData.class}
              </span>
            </div>
            <div className="flex justify-start gap-2 border-b-1  border-green-300 p-1 ">
              <h2 cclassName="w-[130px]  text-[14px] "> Section :</h2>
              <span className="font-semibold text-[#01a9ac]  text-[12px]">
                {" "}
                {studentData.section}
              </span>
            </div>
            <div className="flex justify-start gap-2 border-b-1  border-green-300 p-1 ">
              <h2 cclassName="w-[130px]  text-[14px] ">Subject :</h2>
              <span className="font-semibold text-[#01a9ac]  text-[12px]">
                {" "}
                {studentData.subject}
              </span>
            </div>
            <div className="flex justify-start gap-2 border-b-1  border-green-300 p-1 ">
              <h2 cclassName="w-[130px]  text-[14px] ">DOB :</h2>
              <span className="font-semibold text-[#01a9ac]  text-[12px]">
                {" "}
                {studentData.dateOfBirth}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewStudent;
