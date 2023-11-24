// ViewProfile.js
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import { FcLeft } from "react-icons/fc";
// import "../Dynamic/Form/FormStyle.css";

const ViewSeconday = () => {
  const { email } = useParams();
  const [teacherData, setTeacherData] = useState({});

  useEffect(() => {
    // Fetch teacher data based on the email parameter
    axios
      .get(
        `http://localhost:4000/api/v1/adminRoute/getTeachers?email=${email}`,
        {
          email: email,
        }
      )
      .then((response) => {
        const data = response.data.data[0];
        setTeacherData(data);
      })
      .catch((error) => {
        console.error("Error fetching teacher data:", error);
      });
  }, [email]);

  return (
    <>
      <div className=" w-full h-screen  flex items-center justify-center pt-10 modal-blur">
        <div className="bg-white  h-screen md:h-[85vh] sm:h-[70vh] gap-2 sm:p-4 md:p-4 lg:p-4 p-2 pt-16 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px]   overflow-y-auto">
          <div className="w-[330px]  bg-[#01a9ac]  p-5   hover:shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset]">
            <div className="absolute bg-white w-[50px] h-[50px] rounded-full flex justify-center items-center shadow-2xl">
              <Link to="/allteachers" className=" text-blue-500 text-3xl">
                <FcLeft />
              </Link>
            </div>
            <div className=" flex justify-center mt-4">
              {teacherData.image && teacherData.image.url ? (
                <img
                  className="w-[150px] h-[150px] rounded-full"
                  src={teacherData.image.url}
                  alt="Image"
                />
              ) : (
                <p>No image available</p>
              )}
            </div>
            <div className="p-8">
              <h2 className="text-center text-lg text-white font-bold  ">
                {" "}
                {teacherData.fullName}
              </h2>
              <h2 className="text-center text-lg text-white font-bold">
                {" Status: "}
                {teacherData.status}
              </h2>
              <h2 className="text-center text-white font-bold">
                {"  "}
                +91{teacherData.contact}
              </h2>
              <hr />
              <div className="h-14 ">
                <p className=" p-2 font-bold">{`Address : ${teacherData.address}`}</p>
              </div>
              <div className="flex justify-center mt-3 ">
                <button className=" bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
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
              {teacherData.fullName}'s Details
            </h1>

            <div className="flex">
              {/* <div>
              <h2 className="w-[100px]  text-[14px] ">Employee ID:</h2>
              </div>
              <div className="w-[100px] bg-slate-400 ">
              <span className=" font-semibold text-[#01a9ac]  text-[12px]">
                {" "}
                {teacherData.employeeId}anand
              </span>
              </div> */}
              {/* <table>
                <thead>
                  <tr className="w-full bg-slate-300">
                    <th className="w-[200px]  bg-red-300 text-[14px]">Employee ID:</th>
                    <td>  {teacherData.employeeId}</td>
                  </tr>
                </thead>
               
              </table> */}
            </div>
            <div className="flex justify-between gap-2 border-b-1  border-green-300 p-1 ">
              <h2 className="w-[130px]  text-[14px] ">Employee ID:</h2>
              <span className="w-[200px]font-semibold text-[#01a9ac]  text-[12px]">
                {" "}
                {teacherData.employeeId}
              </span>
            </div>
            <div className="flex justify-between gap-2 border-b-1  border-green-300 p-1 ">
              <h2 cclassName="w-[130px]  text-[14px] ">Email :</h2>
              <span className="w-[200px] font-semibold text-[#01a9ac] text-[12px]  ">
                {teacherData.email}
              </span>
            </div>
            <div className="flex justify-start gap-2 border-b-1  border-green-300 p-1 ">
              <h2 cclassName="w-[130px]  text-[14px] ">Gender :</h2>
              <span className="font-semibold text-[#01a9ac]  text-[12px]">
                {" "}
                {teacherData.gender}
              </span>
            </div>

            {/* <div className="flex justify-start gap-2 ">
              <h2 cclassName="w-[130px]  text-[14px] ">Status :</h2>
              <span className="font-semibold text-[#01a9ac]  text-[12px]">   {teacherData.status}</span>
            </div> */}
            <div className="flex justify-start gap-2 border-b-1  border-green-300 p-1 ">
              <h2 cclassName="w-[130px]  text-[14px] "> Qualification:</h2>
              <span className="font-semibold text-[#01a9ac]  text-[12px]">
                {" "}
                {teacherData.qualification}
              </span>
            </div>
            <div className="flex justify-start gap-2 border-b-1  border-green-300 p-1 ">
              <h2 cclassName="w-[130px]  text-[14px] "> Salary :</h2>
              <span className="font-semibold text-[#01a9ac]  text-[12px]">
                {" "}
                {teacherData.salary} / month
              </span>
            </div>
            <div className="flex justify-start gap-2 border-b-1  border-green-300 p-1 ">
              <h2 cclassName="w-[130px]  text-[14px] ">Subject :</h2>
              <span className="font-semibold text-[#01a9ac]  text-[12px]">
                {" "}
                {teacherData.subject}
              </span>
            </div>
            <div className="flex justify-start gap-2 border-b-1  border-green-300 p-1 ">
              <h2 cclassName="w-[130px]  text-[14px] ">Section :</h2>
              <span className="font-semibold text-[#01a9ac]  text-[12px]">
                {" "}
                {teacherData.section}
              </span>
            </div>
            <div className="flex justify-start gap-2 border-b-1  border-green-300 p-1 ">
              <h2 cclassName="w-[130px]  text-[14px] ">DOB :</h2>
              <span className="font-semibold text-[#01a9ac]  text-[12px]">
                {" "}
                {teacherData.dateOfBirth}
              </span>
            </div>
            <div className="flex justify-start gap-2 border-b-1  border-green-300 p-1 ">
              <h2 className="w-[110px] ">Joining Date :</h2>
              <span className="font-semibold text-[#01a9ac]  text-[12px]">
                {" "}
                {teacherData.joiningDate}
              </span>
            </div>
            <div className="flex justify-start gap-2 border-b-1  border-green-300 p-1 ">
              <h2 className="w-[110px] ">Experience :</h2>
              <span className="font-semibold text-[#01a9ac]  text-[12px]">
                {" "}
                {teacherData.experience} yrs
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewSeconday;
