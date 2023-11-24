import React, { useEffect, useState } from "react";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { dropdownData } from "../data/dummy";
import PieChart from "../pages/Charts/PieChart";
import { FcConferenceCall, FcBusinesswoman, FcCurrencyExchange } from 'react-icons/fc';
import { BiMaleFemale, BiSolidStoreAlt } from 'react-icons/bi';
// import EarningBarChart from "../pages/Charts/EarningBarChart";
// import ExpensesBar from "../pages/Charts/ExpensesBar";
import { useLocation, useNavigate } from "react-router-dom";

import Calendar from "../pages/Calendar";
import axios from 'axios';
import ActivePieChart from "../pages/Charts/ActivePieChart";
import EarningChart from "../CHART/EarningChart";
import CreateCurriculum from "./CreateCurriculum";
import CreateNotice from "../CreateNotice";

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
)
const DashboardHome = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [teacherCount, setTeacherCount] = useState([]);
  const [studentCount, setStudentCount] = useState([]);
  const [parentCount, setParentCount] = useState([]);
  const [earningData, setEarningData] = useState([]);

  // Fetch teacher count
  useEffect(() => {
    axios.get('/api/v1/adminRoute/getTeachers', {
      withCredentials: true,
    })
    .then((response) => {
      if (Array.isArray(response.data.data)) {
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
    axios.get('/api/v1/adminRoute/getAllStudents', {
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
    // Fetch data from the server when the component mounts
    axios.get('/api/v1/adminRoute/getAllParents', 
    {
      withCredentials: true, // Set withCredentials to true
    })
      .then((response) => {
        setParentCount(response.data.allParent.length)
        console.log("P2 parent", response.data.allParent)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Generate earning data based on teacher and student count
  useEffect(() => {
    const newEarningData = [
      {
        icon: <FcConferenceCall />,
        amount: `${studentCount}`,
        percentage: '-4%',
        title: 'Students',
        iconColor: '#03C9D7',
        iconBg: '#E5FAFB',
        pcColor: 'red-600',
      },
      {
        icon: <FcBusinesswoman />,
        amount: `${teacherCount}`,
        percentage: '+23%',
        title: 'Teachers',
        iconColor: 'rgb(255, 244, 229)',
        iconBg: 'rgb(254, 201, 15)',
        pcColor: 'green-600',
      },
      {
        icon: <FcCurrencyExchange />,
        amount: '423,39',
        percentage: '+38%',
        title: 'Earning',
        iconColor: 'rgb(228, 106, 118)',
        iconBg: 'rgb(255, 244, 229)',
        pcColor: 'green-600',
      },
      {
        icon: <BiMaleFemale />,
        amount: `${parentCount}`,
        percentage: '-12%',
        title: 'Parents',
        iconColor: 'rgb(0, 194, 146)',
        iconBg: 'rgb(235, 250, 242)',
        pcColor: 'red-600',
      },
    ];
    setEarningData(newEarningData);
  }, [teacherCount, studentCount, parentCount]);

// Prevent navigation using arrow keys and back button
useEffect(() => {
  window.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
    }
  });

  // Disable the back button in the browser's address bar
  navigate(location.href, { replace: true });
  window.addEventListener('popstate', function (event) {
    navigate(location.href, { replace: true });
  });
}, [navigate]);

  return (
    <div className="mt-12">
      <div className="flex flex-wrap lg:flex-nowrap justify-center ">
        <div className="flex m-1 flex-wrap justify-center gap-3 ">
          {earningData.map((item) => (
            <div
              key={item.title}
              className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl "
            >
              <button
                type="button"
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                {item.icon}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">{item.amount}</span>
                <span className={`text-sm text-${item.pcColor} ml-2`}>
                  {item.percentage}
                </span>
              </p>
              <p className="text-sm text-gray-400  mt-1">{item.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-2 p-3">
        <div className="bg-white  dark:text-gray-200 dark:bg-secondary-dark-bg  rounded-2xl p-3">
          <EarningChart/>
        </div>
        <div className="bg-white  dark:text-gray-200 dark:bg-secondary-dark-bg   rounded-2xl p-3">
          <CreateNotice />

        </div>
        <div className="bg-white  dark:text-gray-200 dark:bg-secondary-dark-bg   rounded-2xl p-3 ">
       <div className="p-2  h-[400px] overflow-scroll ">
       <PieChart />
          <ActivePieChart />
       </div>
        </div>
      
        <div className="bg-white  dark:text-gray-200 dark:bg-secondary-dark-bg  rounded-2xl p-3">
          {/* <ExpensesBar /> */}
          <div className="p-2 bg-gradient-to-r from-yellow-400 to-green-500  h-[400px] overflow-scroll ">
          <CreateCurriculum/>
       </div>
        
        </div>
        {/* <div className="bg-white  dark:text-gray-200 dark:bg-secondary-dark-bg   rounded-2xl p-3 h-[60vh]">
          <ActivePieChart />
        </div> */}
        <div className="bg-white  dark:text-gray-200 dark:bg-secondary-dark-bg   rounded-2xl p-3">
        <Calendar />
        </div>
        {/* <div className="bg-white  dark:text-gray-200 dark:bg-secondary-dark-bg  rounded-2xl p-3 w-[75vw]">
          <Calendar />
        </div> */}
      </div>
    </div>
  );
};

export default DashboardHome;
