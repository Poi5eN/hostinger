import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";

const StudentApexChart = () => {
  // Initialize state variables at the top of the component
  const [data, setData] = useState({
    boys: null,
    girls: null
  });
  const [loading, setLoading] = useState(true);
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({
    chart: {
      width: 280,
      type: "pie",
    

    },
    labels: ["Boys", "Girls"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 400
          },
          legend: {
            position: "bottom"
          }
        }
      }
    ]
  });

  // Use useEffect for side effects like data fetching
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/adminRoute/getAllStudents",
          {
            withCredentials: true
          }
        );

        if (Array.isArray(response.data.allStudent)) {
          const boysCount = response.data.allStudent.filter(
            student => student.studentGender === "Male"
          ).length;
          const girlsCount = response.data.allStudent.length - boysCount;

          setData({
            boys: boysCount,
            girls: girlsCount,
          });

          setSeries([boysCount+3 , girlsCount+5]);
          setLoading(false);
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
    <div id="chart">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
        <h1 className="text-[#4f6583]">All Student :{series[1]+series[0]} </h1>
        <ReactApexChart options={options} series={series} type="pie" 
        width={220} 
        />
        </>
      )}
    </div>
  );
};

export default StudentApexChart;




// import React, { useState, useEffect } from "react";
// import ReactApexChart from 'react-apexcharts';
// import axios from "axios";
// const StudentApexChart = () => {
//     const [data, setData] = useState({
//         boys:null,
//         girls:null
//     });
//     // const [arr, setArr] = useState([]);
//     const [loading, setLoading] = useState(true);
//     // const boys = arr[0];
//     // const girls = arr[1];
//     console.log("boysData", data.boys);
//     console.log("girlsData", data.girls);

//     useEffect(() => {
//         const fetchData = async () => {
//           try {
//             const response = await axios.get(
//               "http://localhost:4000/api/v1/adminRoute/getAllStudents",
//               {
//                 withCredentials: true,
//               }
//             );
    
//             if (Array.isArray(response.data.allStudent)) {
//               // Filter students by gender
//               const boysCount = response.data.allStudent.filter(
//                 (student) => student.studentGender === "Male"
//               ).length;
//               const girlsCount = response.data.allStudent.length - boysCount;
    
//             //   setArr([boysCount, girlsCount]);
//             //   setData(boysCount, girlsCount);

//               setData({
//                 boys: boysCount,
//                 girls: girlsCount,
//               });
//             } else {
//               console.error("Data format is not as expected:", response.data);
//             }
//           } catch (error) {
//             console.error("Error fetching student data:", error);
//           }
//           finally {
//             setLoading(false); // Set loading to false after data is fetched
//           }
//         };
//         fetchData();
//       }, []);

//       if (loading) {
//         return <div>Loading...</div>; // Display a loading message or spinner while data is being fetched
//       }

// //   const [series] = useState([44, 55, 13, 43, 22]);
// const [series] = useState([data.boys+2, data.girls+2]);
// //   const [series] = useState([boys, girls]);
//   const [options] = useState({
//     chart: {
//       width: 380,
//       type: 'pie',
//     },
//     // labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
//     labels: ['Boys', 'Girls'],
//     // labels: ['Boys', 'Girls'],
//     responsive: [
//       {
//         breakpoint: 480,
//         options: {
//           chart: {
//             width: 200,
//           },
//           legend: {
//             position: 'bottom',
//           },
//         },
//       },
//     ],
//   });

//   return (
//     <div id="chart">
//       <ReactApexChart options={options} series={series} type="pie" width={380} />
//     </div>
//   );
// };

// export default StudentApexChart;
