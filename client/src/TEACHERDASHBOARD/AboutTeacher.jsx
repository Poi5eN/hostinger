import axios from 'axios';
import React,{useEffect,useState} from 'react'
import { FcLeft } from 'react-icons/fc';
import { Link } from 'react-router-dom';

const AboutTeacher = () => {
    const [teacherDetails,setTeacherDetails]=useState([])
    const email = localStorage.getItem("email");
    console.log("email",email )


    useEffect(()=>{
 
        axios.get(`http://localhost:4000/api/v1/adminRoute/getTeachers?email=${email}`, {
          withCredentials: true,
        }).then((res) => {
        if(Array.isArray(res.data.data)){
            // console.log("teacher",res.data.data)
            setTeacherDetails(res.data.data[0])
            // console.log("teacherDet",res.data.data[0])  
        }else{
          console.error("Data formate is not as expected : ",res.data);
        }
      }).catch((error)=>{
          console.error("Error fetch teacher count: ",error)
      })
    },[])
    
    console.log("detail",teacherDetails)
  return (
    <div className=" w-full h-screen  flex items-center justify-center pt-10 modal-blur">
        <div className="bg-white  h-screen md:h-[85vh] sm:h-[70vh] gap-2 sm:p-4 md:p-4 lg:p-4 p-2 pt-16 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 shadow-[rgba(0,0,_0,_0.25)_0px_25px_50px-12px]   overflow-y-auto">
          <div className="w-[330px]  bg-[#385b5c]  p-5   hover:shadow-[rgba(6,24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset]">
            <div className="absolute bg-white w-[50px] h-[50px] rounded-full flex justify-center items-center shadow-2xl">
              <Link to="/teacher" className=" text-blue-500 text-3xl">
                <FcLeft />
              </Link>
            </div>
            <div className=" flex justify-center mt-4">
              {teacherDetails.image && teacherDetails.image.url ? (
                <img
                  className="w-[150px] h-[150px] rounded-full"
                  src={teacherDetails.image.url}
                  alt="Image"
                />
              ) : (
                <p>No image available</p>
              )}
            </div>
            <div className="p-8">
              <h2 className="text-center text-lg text-white font-bold  ">
                {" "}
                {teacherDetails.fullName}
              </h2>
              <h2 className="text-center text-lg text-white font-bold">
                {" Status: "}
                {teacherDetails.status}
              </h2>
              <h2 className="text-center text-white font-bold">
                {"  "}
                +91{teacherDetails.contact}
              </h2>
              <hr />
              <div className="h-14 ">
                <p className=" p-2 text-white text-center font-bold">{`Address : ${teacherDetails.address}`}</p>
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
          <div className="w-[330px] border-1 rounded-md border-[#01a9ac] p-5   hover:shadow-[rgba(6,24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset]">
            <h1 className="text-center mb-3 font-extrabold">
              {" "}
              {teacherDetails.fullName}'s Details
            </h1>
            <div className="flex gap-2 border-b-1  border-green-300 p-1 ">
              <h2 className="w-[100px]  text-[14px] ">Employee ID:</h2>
              <span className="w-[200px]font-semibold text-[#01a9ac]  text-[12px]">
                {" "}
                {teacherDetails.employeeId}
              </span>
            </div>
            <div className="flex gap-2 border-b-1  border-green-300 p-1 ">
              <h2 className="w-[100px]  text-[14px] ">Email :</h2>
              <span className="w-[200px]font-semibold text-[#01a9ac]  text-[12px]">
                {" "}
                {teacherDetails.email}
              </span>
            </div>
            <div className="flex gap-2 border-b-1  border-green-300 p-1 ">
              <h2 className="w-[100px]  text-[14px] ">Gender :</h2>
              <span className="w-[200px]font-semibold text-[#01a9ac]  text-[12px]">
                {" "}
                {teacherDetails.gender}
              </span>
            </div>
            <div className="flex gap-2 border-b-1  border-green-300 p-1 ">
              <h2 className="w-[100px]  text-[14px] ">Qualification :</h2>
              <span className="w-[200px]font-semibold text-[#01a9ac]  text-[12px]">
                {" "}
                {teacherDetails.qualification}
              </span>
            </div>
            <div className="flex gap-2 border-b-1  border-green-300 p-1 ">
              <h2 className="w-[100px]  text-[14px] "> Salary :</h2>
              <span className="w-[200px]font-semibold text-[#01a9ac]  text-[12px]">
                {" "}
                {teacherDetails.salary} / month
              </span>
            </div>
            <div className="flex gap-2 border-b-1  border-green-300 p-1 ">
              <h2 className="w-[100px]  text-[14px] ">Subject :</h2>
              <span className="w-[200px]font-semibold text-[#01a9ac]  text-[12px]">
                {" "}
                {teacherDetails.subject}
              </span>
            </div>
            <div className="flex gap-2 border-b-1  border-green-300 p-1 ">
              <h2 className="w-[100px]  text-[14px] ">ClassTeacher :</h2>
              <span className="w-[200px]font-semibold text-[#01a9ac]  text-[12px]">
                {" "}
                {teacherDetails.classTeacher}
              </span>
            </div>
            <div className="flex gap-2 border-b-1  border-green-300 p-1 ">
              <h2 className="w-[100px]  text-[14px] ">Section :</h2>
              <span className="w-[200px]font-semibold text-[#01a9ac]  text-[12px]">
                {" "}
                {teacherDetails.section}
              </span>
            </div>
            <div className="flex gap-2 border-b-1  border-green-300 p-1 ">
              <h2 className="w-[100px]  text-[14px] ">DOB :</h2>
              <span className="w-[200px]font-semibold text-[#01a9ac]  text-[12px]">
                {" "}
                {teacherDetails.dateOfBirth}
              </span>
            </div>
            <div className="flex gap-2 border-b-1  border-green-300 p-1 ">
              <h2 className="w-[100px]  text-[14px] ">Joining Date :</h2>
              <span className="w-[200px]font-semibold text-[#01a9ac]  text-[12px]">
                {" "}
                {teacherDetails.joiningDate}
              </span>
            </div>
            <div className="flex gap-2 border-b-1  border-green-300 p-1 ">
              <h2 className="w-[100px]  text-[14px] ">Experience :</h2>
              <span className="w-[200px]font-semibold text-[#01a9ac]  text-[12px]">
                {" "}
                {teacherDetails.experience} yrs
              </span>
            </div>
            {/* <div className="flex justify-between gap-2 border-b-1  border-green-300 p-1 ">
              <h2 cclassName="w-[130px]  text-[14px] ">Email :</h2>
              <span className="w-[200px] font-semibold text-[#01a9ac] text-[12px]  ">
                {teacherDetails.email}
              </span>
            </div>
            <div className="flex justify-start gap-2 border-b-1  border-green-300 p-1 ">
              <h2 cclassName="w-[130px]  text-[14px] ">Section :</h2>
              <span className="font-semibold text-[#01a9ac]  text-[12px]">
                {" "}
                {teacherDetails.section}
              </span>
            </div>

            <div className="flex justify-start gap-2 ">
              <h2 cclassName="w-[130px]  text-[14px] ">Status :</h2>
              <span className="font-semibold text-[#01a9ac]  text-[12px]">   {teacherDetails.status}</span>
            </div>
            <div className="flex justify-start gap-2 border-b-1  border-green-300 p-1 ">
              <h2 cclassName="w-[130px]  text-[14px] "> Qualification:</h2>
              <span className="font-semibold text-[#01a9ac]  text-[12px]">
                {" "}
                {teacherDetails.qualification}
              </span>
            </div>
            <div className="flex justify-start gap-2 border-b-1  border-green-300 p-1 ">
              <h2 cclassName="w-[130px]  text-[14px] "> Salary :</h2>
              <span className="font-semibold text-[#01a9ac]  text-[12px]">
                {" "}
                {teacherDetails.salary} / month
              </span>
            </div>
            <div className="flex justify-start gap-2 border-b-1  border-green-300 p-1 ">
              <h2 cclassName="w-[130px]  text-[14px] ">Subject :</h2>
              <span className="font-semibold text-[#01a9ac]  text-[12px]">
                {" "}
                {teacherDetails.subject}
              </span>
            </div>
            <div className="flex justify-start gap-2 border-b-1  border-green-300 p-1 ">
              <h2 cclassName="w-[130px]  text-[14px] ">Class :</h2>
              <span className="font-semibold text-[#01a9ac]  text-[12px]">
                {" "}
                {teacherDetails.classOfStudent}
              </span>
            </div>
            <div className="flex justify-start gap-2 border-b-1  border-green-300 p-1 ">
              <h2 cclassName="w-[130px]  text-[14px] ">Section :</h2>
              <span className="font-semibold text-[#01a9ac]  text-[12px]">
                {" "}
                {teacherDetails.section}
              </span>
            </div>
            <div className="flex justify-start gap-2 border-b-1  border-green-300 p-1 ">
              <h2 cclassName="w-[130px]  text-[14px] ">DOB :</h2>
              <span className="font-semibold text-[#01a9ac]  text-[12px]">
                {" "}
                {teacherDetails.dateOfBirth}
              </span>
            </div>
            <div className="flex justify-start gap-2 border-b-1  border-green-300 p-1 ">
              <h2 className="w-[110px] ">Joining Date :</h2>
              <span className="font-semibold text-[#01a9ac]  text-[12px]">
                {" "}
                {teacherDetails.joiningDate}
              </span>
            </div>
            <div className="flex justify-start gap-2 border-b-1  border-green-300 p-1 ">
              <h2 className="w-[110px] ">Experience :</h2>
              <span className="font-semibold text-[#01a9ac]  text-[12px]">
                {" "}
                {teacherDetails.experience} yrs
              </span>
            </div> */}
          </div>
        </div>
      </div>
  )
}

export default AboutTeacher;