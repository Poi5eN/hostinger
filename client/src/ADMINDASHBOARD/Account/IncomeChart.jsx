import React from "react";
import ReactApexChart from "react-apexcharts";

const IncomeChart = () => {
  const options = {
    // series: [44, 55, 41, 17, 15],
    chart: {
      width: 380,
      type: "donut",
    },
    labels: ["stationery", "stationery","stationery","stationery","other"],
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270,
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "gradient",
    },
    legend: {
      formatter: function (val, opts) {
        return val + " - " + opts.w.globals.series[opts.seriesIndex];
      },
    },
    title: {
        text: "Income",
        className: "text-2xl font-bold text-sky-800", // Tailwind CSS classes
      },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };
  options.series = [44, 55, 41, 17, 35];
  return (
    <div id="chart">
      <ReactApexChart options={options} series={options.series} type="donut" width={380} />
    </div>
  );
};

export default IncomeChart;
