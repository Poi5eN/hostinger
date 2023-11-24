import React, { useEffect, useState } from "react";
import axios from 'axios';
import {
  Chart as ChartsJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Pie } from "react-chartjs-2";
ChartsJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);


const ActivePieChart = () => {
  const [data, setData] = useState({
    datasets: [
      {
        data: [],
        backgroundColor: ["#1e4db7", "#03c9d7"],
      },
    ],
    labels: ["Boys", "Girls"],
  });



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/adminRoute/getAllStudentStatus', {
          withCredentials: true,
        });
  
        if (Array.isArray(response.data.allStudent)) {
          // Filter students by gender
          const Active = response.data.allStudent.filter(student => student.studentStatus === 'active').length;
          const InActive = response.data.allStudent.length - Active;
          setData({
            datasets: [
              {
                data: [Active, InActive],
                backgroundColor: ["#FCD34D", "#000000"],
              },
            ],
            labels: [`Active : ${Active}` , `InActive : ${InActive}`],
          });
        } else {
          console.error("Data format is not as expected:", response.data);
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h1 className="text-center text-2xl font-bold">Active Students</h1>

      <div className=" rounded-sm flex justify-center items-center ">
        <div className=" ">
          <Pie data={data}  />
        </div>
      </div>
    </>
  );
};

export default ActivePieChart;
