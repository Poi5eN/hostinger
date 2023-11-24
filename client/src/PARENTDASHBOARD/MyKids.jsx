import React,{useState,useEffect} from 'react'
import axios from 'axios';


const MyKids = () => {
  const [data, setData] = useState([]);

  // const fullName = localStorage.getItem("fullName");
  // const image = localStorage.getItem("image");
  // const email = localStorage.getItem("email");
 

      
  return (
    <div>
        <div className=" w-full  flex items-center justify-center">
            <div className="bg-white gap-2 rounded-lg mt-5 p-8 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 shadow-[rgba(0,0,_0,_0.25)_0px_25px_50px-12px]">
              <div className="w-[300px] border-1 rounded-md border-[#01a9ac] p-5   hover:shadow-[rgba(6,24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset]">
                <div className="flex justify-between">
                  <div>
                    <img
                      className="w-[80px] h-[80px] rounded-full"
                      src="https://cdn.pixabay.com/photo/2017/09/21/19/06/woman-2773007_1280.jpg"
                      alt="school logo"
                    />
                  </div>

                  <h2>IDENTITY CARD </h2>
                </div>

                <div>
                  <h1 className="text-center text-2xl font-bold text-[#01a9ac]">Model School</h1>
                </div>

                <div className="text-center rounded-sm bg-[#01a9acc2]">
                  <h3 className="text-white">Lorem ipsum dolor, sit amet consectetur adipisicing.</h3>
                </div>

                <div className="flex  mt-5">
                  <img
                    className="w-[110px] h-[140px] rounded-sm"
                    src="https://cdn.pixabay.com/photo/2017/09/21/19/06/woman-2773007_1280.jpg"
                  
                    // src={image}
                    alt=""
                  />
                  { }
                  <div className=" ml-3">
                    <div className="">
                      <h2 className="w-[100px] text-[13px] leading-3">Name :</h2>
                      <span className="font-semibold  text-[14px] my-0 text-[#01a9ac]">

                        {/* {fullName} */}
                        Anand
                      </span>
                    </div>
                    <div className="my-1">
                      <h2 className="w-[100px] text-[13px] leading-3 ">
                        F/Name :
                      </h2>
                      <span className="font-semibold text-[14px] text-[#01a9ac]">
                        {/* {data.fatherName} */}
                      </span>
                    </div>

                    <div className="my-1">
                      <h2 className="w-[100px] text-[13px] leading-3 ">
                        M/Name :
                      </h2>
                      <span className="font-semibold text-[14px] text-[#01a9ac]">{data.motherName}</span>
                    </div>

                    <div className="flex">
                      <h2 className="w-[60px]">Class. :</h2>
                      <span className="text-[#01a9ac] ">
                        {/* {data.studentClass}th - {data.studentSection} */}
                        </span>
                    </div>
                    <div className="flex ">
                      <h2 className="w-[60px] ">DOB. :</h2>
                      <span className="text-[#01a9ac]">
                      {/* {data.studentDateOfBirth ? data.studentDateOfBirth.split('T')[0] : ''} */}
                      </span>
                    </div>
                  </div>


                </div>

                <div className="p-2">
                  <h2>Address : </h2>
                  <span>
                    {/* {data.studentAddress} */}
                  </span>
                </div>

              </div>

              <div className="w-[300px] border-1 rounded-md border-[#01a9ac] p-5   hover:shadow-[rgba(6,24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset]">
                <h1 className="text-center mb-3">Contact Details</h1>
                <div className="flex justify-start gap-2 ">
                  <h2 className="w-[100px]">Email :</h2>
                  <span className="font-semibold text-[#01a9ac]   ">
                    {/* {email} */}
                  </span>
                </div>
                <div className="flex justify-start gap-2 ">
                  <h2 className="w-[100px]">Roll No. :</h2>
                  <span className="font-semibold text-[#01a9ac]">
                    {/* {data.studentRollNo} */}
                    </span>
                </div>


                <div className="flex justify-start gap-2 ">
                  <h2 className="w-[100px]">Subject :</h2>
                  <span className="font-semibold text-[#01a9ac]">
                    {/* {data.studentSubject} */}
                  </span>
                </div>

                <div className="flex justify-start gap-2 ">
                  <h2 className="w-[100px] ">Joining Date :</h2>
                  <span className="font-semibold text-[#01a9ac]">
                    {/* {data.studentJoiningDate ? data.studentJoiningDate.split('T')[0] : ''} */}
                    </span>
                  
                </div>

                <div className="flex justify-start gap-2 ">
                  <h2 className="w-[100px]">Gender :</h2>
                  <span className="font-semibold text-[#01a9ac]">
                    {/* {data.studentGender} */}
                    </span>
                </div>
                <div className="flex justify-start gap-2 ">
                  <h2 className="w-[100px]">Mobile :</h2>
                  <span className="font-semibold text-[#01a9ac]">+91
                  {/* {data.studentContact} */}
                  </span>
                </div>
                <div className="flex justify-start gap-4 ">
                  <h2 className="w-[100px]">ParentMobile: </h2>
                  <span className="font-semibold text-[#01a9ac]">
                    {/* +91{data.parentContact} */}
                    </span>
                </div>
              </div>
            </div>

          </div>

    </div>
  )
}

export default MyKids