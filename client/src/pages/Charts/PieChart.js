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


const PieChart = () => {
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
        const response = await axios.get('http://localhost:4000/api/v1/adminRoute/getAllStudents', {
          withCredentials: true,
        });
  
        if (Array.isArray(response.data.allStudent)) {
          // Filter students by gender
          const boysCount = response.data.allStudent.filter(student => student.studentGender === 'Male').length;
          const girlsCount = response.data.allStudent.length - boysCount;
          
          setData({
            datasets: [
              {
                data: [boysCount, girlsCount],
                backgroundColor: ["#1e4db7", "#03c9d7"],
              },
            ],
            labels: [`Boys : ${boysCount}` , `Girls : ${girlsCount}`],
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
      <h1 className="text-center text-2xl font-bold">All Students</h1>
      <div className=" rounded-sm flex justify-center items-center ">
        <div className=" ">
          <Pie data={data}  />
        </div>
      </div>
    </>
  );
};

export default PieChart;
