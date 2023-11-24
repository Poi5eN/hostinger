import React, { useEffect, useState } from "react";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { dropdownData } from "../../data/dummy";
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../ShikshMitraWebsite/assets/logo/download-removebg-preview.png'
import {
  FcConferenceCall,
  FcBusinesswoman,
  FcCurrencyExchange,
} from "react-icons/fc";
import { BiMaleFemale, BiSolidStoreAlt } from "react-icons/bi";
import axios from "axios";
import IncomeChart from "./IncomeChart";
import FeeChart from "./FeeChart";
import AllIncomeChart from "./Income/AllIncomeChart";

const DropDown = ({ currentMode }) => (
  <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
    <DropDownListComponent
      id="time"
      fields={{ text: "Time", value: "Id" }}
      style={{ border: "none", color: currentMode === "Dark" && "white" }}
      value="1"
      dataSource={dropdownData}
      popupHeight="220px"
      popupWidth="120px"
    />
  </div>
);
const Create_Income = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [teacherCount, setTeacherCount] = useState([]);
  const [studentCount, setStudentCount] = useState([]);
  const [parentCount, setParentCount] = useState([]);
  const [earningData, setEarningData] = useState([]);

  // Fetch teacher count
  useEffect(() => {
    axios
      .get("/api/v1/adminRoute/getTeachers", {
        withCredentials: true,
      })
      .then((response) => {
        if (Array.isArray(response.data.data)) {
          console.log(response.data.data[0])
          setTeacherCount(response.data.data.length);
        } else {
          console.error("Data format is not as expected:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching teacher count:", error);
      });
  }, []);

  // Fetch student count
  useEffect(() => {
    axios
      .get("/api/v1/adminRoute/getAllStudents", {
        withCredentials: true,
      })
      .then((response) => {
        if (Array.isArray(response.data.allStudent)) {
          setStudentCount(response.data.allStudent.length);
        } else {
          console.error("Data format is not as expected:", response.allStudent);
        }
      })
      .catch((error) => {
        console.error("Error fetching student count:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/api/v1/adminRoute/getAllParents", {
        withCredentials: true, // Set withCredentials to true
      })
      .then((response) => {
        setParentCount(response.data.allParent.length);
        console.log(response.data.allParent);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    const newEarningData = [
      {
        icon: <FcConferenceCall />,
        amount: `${studentCount}`,
        percentage: "-4%",
        title: "Students",
        iconColor: "#03C9D7",
        iconBg: "#E5FAFB",
        pcColor: "red-600",
      },
      {
        icon: <FcBusinesswoman />,
        amount: `${teacherCount}`,
        percentage: "+23%",
        title: "Teachers",
        iconColor: "rgb(255, 244, 229)",
        iconBg: "rgb(254, 201, 15)",
        pcColor: "green-600",
      },
      {
        icon: <FcCurrencyExchange />,
        amount: "423,39",
        percentage: "+38%",
        title: "Earning",
        iconColor: "rgb(228, 106, 118)",
        iconBg: "rgb(255, 244, 229)",
        pcColor: "green-600",
      },
      {
        icon: <BiMaleFemale />,
        amount: `${parentCount}`,
        percentage: "-12%",
        title: "Parents",
        iconColor: "rgb(0, 194, 146)",
        iconBg: "rgb(235, 250, 242)",
        pcColor: "red-600",
      },
    ];
    setEarningData(newEarningData);
  }, [teacherCount, studentCount, parentCount]);

  // useEffect(() => {
  //   window.addEventListener("keydown", function (event) {
  //     if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
  //       event.preventDefault();
  //     }
  //   });

  //   history.pushState(null, null, location.href);
  //   window.addEventListener("popstate", function (event) {
  //     history.pushState(null, null, location.href);
  //   });
  // }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
      }
    };

    const handlePopState = () => {
      navigate(location.href);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);

  return (
    <div className="mt-12">
      <div className="grid gap-3 xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1  p-3">
      
        <div className={`p-2 rounded-md  bg-white w-full flex flex-col justify-center`} >
         <div className="flex justify-center items-center  w-full h-[150px]">
          <div className="w-[150px] h-[150px]  border-4 border-cyan-700 rounded-full">
            <img src={logo} alt="no img" />
           
          </div>
          
         </div>
         <h2 className="text-center border-b-4 border-cyan-700 text-2xl font-bold text-sky-800">Corplyx Tech</h2>
         
        </div>
        <div className=" p-2  rounded-md sm:w-full text-center bg-white col-span-2" >
         <IncomeChart/>
        </div>
        <div className=" p-2  rounded-md sm:w-full  bg-white ">
          <h2>Notice Board</h2>
          <div className="h-[200px] overflow-scroll p-2 rounded-md">
            <span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatibus, sit! Aspernatur accusamus atque adipisci
              voluptatibus deserunt suscipit nulla molestias nesciunt repellat
              dicta soluta ullam deleniti corporis hic modi ipsa architecto
              harum consequatur minima, aliquid incidunt quos, amet dolorum?
              Unde culpa officiis nobis itaque, quibusdam ad quisquam doloribus?
              Mollitia dolore similique culpa temporibus aspernatur enim placeat
              magnam, sequi id delectus atque earum praesentium libero
              repudiandae veritatis hic officia quis ea fugit, blanditiis, est
              laboriosam tempore fugiat? Aliquam, in voluptates. Placeat,
              maiores voluptatibus. Fugit dolorum minima similique quod, tempora
              aperiam quaerat perferendis quasi sint explicabo quis consequatur,
              a excepturi totam placeat hic itaque magnam debitis fuga minus
              voluptatem suscipit obcaecati. Blanditiis, aspernatur eveniet
              totam saepe molestiae cum. Officiis ducimus, alias adipisci
              voluptatum dolor neque accusantium hic. Vel enim quasi accusantium
              modi est? Incidunt cumque optio libero recusandae distinctio
              voluptas repudiandae saepe praesentium dignissimos dicta nisi
              accusantium ducimus accusamus adipisci eius facilis, expedita, ea
              animi laudantium inventore cum vel! Numquam assumenda eos labore,
              laboriosam mollitia animi nostrum, corporis ad soluta
              exercitationem laborum, magni sunt optio quibusdam quidem. Modi
              dolore ut voluptatibus cupiditate nulla, ipsum suscipit assumenda
              nostrum ab laborum veniam incidunt voluptate nobis. Molestias
              maxime nemo natus! Nesciunt repellendus a iste. Tenetur, ipsam?
            </span>
          </div>
        </div>
      </div>

      

      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-2 p-3">
        <div className="bg-white  dark:text-gray-200 dark:bg-secondary-dark-bg  rounded-2xl p-3">
<AllIncomeChart/>
        </div>
        <div className="bg-white  dark:text-gray-200 dark:bg-secondary-dark-bg   rounded-2xl p-3">
         
          <FeeChart/>
        </div>
          {/* <Calendar /> */}
       
        {/* <div className="bg-white  dark:text-gray-200 dark:bg-secondary-dark-bg   rounded-2xl p-3">
        </div> */}
      </div>
    </div>
  );
};

export default Create_Income;
