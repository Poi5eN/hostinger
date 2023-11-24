import React from "react";
import commone from "../../assets/image/comm.png";
import commtwo from "../../assets/image/comm2.png";
import commthree from "../../assets/image/comm3.png";
import student from "../../assets/student.png";
import arrow from "../../assets/image/arrow4.png";
import arrow2 from "../../assets/image/arrow5.png";
import arrow3 from "../../assets/image/arrow6.png";

function Community() {
  return (
    <div className=" mt-20 p-7">
      <div className="grid md:grid-cols-2 sm:grid-cols-1 ">
        <div>
          <img src={commone} alt=""></img>
        </div>
        <div className="flex justify-center items-center p-12 flex-col">
          <h1 className="inline-block text-3xl">
            Learning made easy
          </h1>
          <p>
            Our management system will make learning more accessible by streamlining administrative tasks, allowing educators to focus on teaching. It will enhance communication between teachers, students, and parents, fostering a supportive learning environment. With user-friendly interfaces and robust data tracking, it ensures personalized learning paths, making education a seamless and enjoyable experience for all.
          </p>
        </div>
      </div>
      <div className=" flex justify-center h-[200px] relative -z-10">
        <img src={arrow} alt="" className=" absolute top-0"></img>
      </div>
      <div className="grid md:grid-cols-2 sm:grid-cols-1 ">
        <div className="flex justify-center items-center p-12 flex-col">
          <h1 className="inline-block text-3xl">
            Stay hasslefree with Admin
          </h1>
          <p>
            Stay hassle-free with our management system: Simplifying administrative tasks and providing a user-friendly platform, so you can focus on what truly matters – effective teaching and student success.
          </p>
        </div>
        <div>
          <img src={commtwo} alt=""></img>
        </div>
      </div>
      <div className=" flex justify-center h-[200px] relative -z-10">
        <img src={arrow2} alt="" className=" absolute top-0"></img>
      </div>
      <div className="grid md:grid-cols-2 sm:grid-cols-1 ">
        <div>
          <img src={commthree} alt=""></img>
        </div>
        <div className="flex justify-center items-center p-12 flex-col">
          <h1 className="inline-block text-3xl">
            Submit your Assignments and Homework
          </h1>
          <p>
            With our system, students can easily upload assignments and homework, while teachers can efficiently manage, grade, and provide feedback, creating a seamless and productive learning experience. Say goodbye to paperwork and embrace a digital solution that enhances the educational journey.
          </p>
        </div>
      </div>
      <div className=" flex justify-center h-[200px] relative -z-10">
        <img src={arrow3} className=" absolute top-0"></img>
      </div>
      <div className="grid md:grid-cols-2 sm:grid-cols-1">
        <div className="flex justify-center items-center p-12 flex-col">
          <h1 className="inline-block text-3xl">
            Compatible and Reliable
          </h1>
          <p>
            Our system's regular updates and adaptability mean you can stay ahead in the ever-evolving field of education, providing your students with the best opportunities for growth and success. Trust in our commitment to keeping your school at the forefront of educational technology.
          </p>
        </div>
        <div>
          <img src={student} alt="" className="h-[500px]"></img>
        </div>
      </div>
    </div>
  );
}

export default Community;
