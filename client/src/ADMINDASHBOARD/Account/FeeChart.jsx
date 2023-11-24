import React from "react";
import ReactApexChart from "react-apexcharts";

const FeeChart = () => {
  const options = {
    series: [
      {
        name: 'PRODUCT A',
        data: [44, 55, 41, 67, 22, 43]
      },
      {
        name: 'PRODUCT B',
        data: [13, 23, 20, 8, 13, 27]
      },
      {
        name: 'PRODUCT C',
        data: [11, 17, 15, 15, 21, 14]
      }
    ],
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
      stackType: '100%'
    },
    title: {
        text: "Fees",
        className: "text-2xl font-bold text-sky-800", // Tailwind CSS classes
      },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0
          }
        }
      }
    ],
    xaxis: {
      categories: ['may', 'june', 'july', 'august', 'september', 'october'],
    },
    fill: {
      opacity: 1
    },
    legend: {
      position: 'right',
      offsetX: 0,
      offsetY: 50
    },
  };

  return (
    <div id="chart">
      <ReactApexChart options={options} series={options.series} type="bar" height={350} />
    </div>
  );
};

export default FeeChart;
