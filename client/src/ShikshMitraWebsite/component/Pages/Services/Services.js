
import React from "react";
import arrow from "../../../assets/image/arrow4.png";
import arrow2 from "../../../assets/image/arrow5.png";
import arrow3 from "../../../assets/image/arrow6.png";
import dashboard from '../../../assets/images/dashbord.jpg';
import digitalMarketing from '../../../assets/images/digitalMarketing.jpg';
// import studentAnimation from "../../../assets/images/studentAnimation.gif"
import socialMedia from "../../../assets/images/socialMedia.jpg"
import mobileApp from "../../../assets/images/mobileApp.jpg"
import eLearning from "../../../assets/images/eLearning.jpg"

import schoolimg from "../../../assets/images/schoolimg.jpg"
import parentimg from "../../../assets/images/parentimg.jpg"
import studentAnimation from "../../../assets/images/studentAnimation.gif"
import adminimg from "../../../assets/images/adminimg.jpg"



const Services = () => {

  // const cardsData = [
  //   { title: 'Admin', image: s3 },
  //   { title: 'Parent', image: studentAnimation },
  //   { title: 'Student', image: studentAnimation },
  //   { title: 'Teacher', image: studentAnimation },
  //   { title: 'Teacher', image: studentAnimation },

  // ];

  return (
    <>

      <div className="py-5">
        <div className="flex justify-center items-center py-3 flex-col">
        <h1 className="inline-block text-xl sm:text-2xl md:text-3xl font-semibold">
          School Management System</h1>

        </div>
       
     <div className = "grid md:grid-cols-2  sm:grid-cols-2  p-4 gap-1">
         
         
         
          <div className = "p-3">
            

<div className="grid grid-cols-1  lg:grid-cols-4 gap-4  sm:grid-cols-4 ">
  <div className="text-center shadow-lg rounded">
    <div className="overflow-hidden">
      <img src={adminimg} alt="Team Member 1" className="hover:scale-125 duration-1000"/>
      </div>
    <h3 className="py-2 text-xl">Admin</h3>
  </div>
  <div className="text-center shadow-lg rounded ">
    <div className="overflow-hidden">
      <img src={schoolimg} alt="Team Member 1" className="hover:scale-125 duration-1000"/>
      </div>
    <h3 className="py-2 text-xl">Teacher</h3>
  </div>
  <div className="text-center shadow-lg rounded">
    <div className="overflow-hidden">
      <img src={parentimg} alt="Team Member 1" className="hover:scale-125 duration-1000"/>
      </div>
    <h3 className="py-2 text-xl">Parent</h3>
  </div>
  <div className="text-center shadow-lg rounded">
    <div className="overflow-hidden">
      <img src={studentAnimation} alt="Team Member 1" className="hover:scale-125 duration-1000"/>
      </div>
    <h3 className="py-2 text-xl">Student</h3>
  </div>
</div>




            
             <div className="shadow-lg rounded">
              <img src={dashboard} alt="" className="p-2" />
            </div>

          </div>
         

         {/* here start Paragraph div */}
          <div className = "w-full p-4  border-1 rounded-xl">
            <h1 className="text-2xl text-center py-3 text-green-800 font-bold">Welcome to the Future of Education Management</h1>
            <p className="text-xl py-2 ">Unlock the power of seamless, intelligent, and future-ready education administration with our cutting-edge School Management System. We're not just a solution; we're a transformation that empowers educators, students, and parents to soar to new heights.

In a world where education is constantly evolving, we are your partner in staying ahead of the curve. Our School Management System is the cornerstone of efficient, tech-savvy schools and institutions. It's more than just a tool; it's a revolution in educational excellence.

            </p>
            <p className="text-xl">A School Management System is a comprehensive software solution designed to 
              manage various aspects of an educational institution's daily operations. It encompasses an array of functionalities, including student enrollment, attendance tracking, grade management, communication tools, and even financial management. This technology revolutionizes how schools operate and interact with their stakeholders.</p>
           
          </div>



        </div>

      </div>

      <div className=" mt-20 p-7">
        <div className="grid md:grid-cols-2 sm:grid-cols-1 ">
          <div>
            <img src={digitalMarketing} alt="" className="w-[80%]"></img>
          </div>
          <div className="flex justify-center items-center p-12 flex-col">
            <h1 className="inline-block text-3xl">
              Digital Marketing--- 
            </h1>
            <p>
            By creating engaging and informative digital marketing content, you can effectively promote your School Management System to schools and educational institutions looking to modernize their operations and improve the educational experience for students, teachers, and parents.
            </p>
          </div>
        </div>
        <div className=" flex justify-center h-[200px] relative -z-10">
          <img src={arrow} alt="" className=" absolute top-0"></img>
        </div>
        <div className="grid md:grid-cols-2 sm:grid-cols-1 ">
          <div className="flex justify-center items-center p-12 flex-col">
            <h1 className="inline-block text-3xl">
              E-Learning Software--- 
            </h1>
            <p>
            E-Learning Software is a critical component of a School Management System, 
            and by highlighting its benefits, you can effectively promote your platform 
            to schools and educational institutions looking to modernize their approach 
            to education.
            </p>
          </div>
          <div>
            <img src={eLearning} alt=""></img>
          </div>
        </div>
        <div className=" flex justify-center h-[200px] relative -z-10">
          <img src={arrow2} alt="" className=" absolute top-0"></img>
        </div>
        <div className="grid md:grid-cols-2 sm:grid-cols-1  ">
          <div>
            <img src={mobileApp} alt=""></img>
          </div>
          <div className="flex justify-center items-center p-12 flex-col">
            <h1 className="inline-block text-3xl">
              School Mobile App---
            </h1>
            <p>
            A School Mobile App is a crucial element of a School Management System, 
            and by showcasing its benefits, you can effectively promote your platform
             to schools and educational institutions looking for a more connected
             and accessible educational experience, nnovative education with our School Management System's Mobile App.
            </p>
          </div>
        </div>
        <div className=" flex justify-center h-[200px] relative -z-10">
          <img src={arrow3} className=" absolute top-0"></img>
        </div>
        <div className="grid md:grid-cols-2 sm:grid-cols-1">
          <div className="flex justify-center items-center p-12 flex-col">
            <h1 className="inline-block text-3xl">
              Social Media Optimization
            </h1>
            <p>
            Social Media Optimization is a vital component to enhance the online 
            presence and engagement of educational institutions using a School Management System. 
            By promoting its benefits, you can effectively communicate the advantages of your 
            platform to schools and educational organizations seeking to improve 
            their online presence and communication.
            </p> 
          </div>
          <div>
            <img src={socialMedia} alt="" className="w-[80%]" ></img>
          </div>
        </div>
      </div>


    </>
  );
}

export default Services;
