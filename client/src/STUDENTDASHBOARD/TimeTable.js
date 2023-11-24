// import React from 'react';

// const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
// const periods = ['1', '2', '3', '4', '5'];

// const subjects = [
//   ['', 'Math', 'Science', 'English', 'History', 'PE'],
//   ['Math', 'Science', 'English', 'History', 'PE', ''],
//   ['Science', 'English', 'History', 'PE', '', 'Math'],
//   ['English', 'History', 'PE', '', 'Math', 'Science'],
//   ['History', 'PE', '', 'Math', 'Science', 'English'],
// ];

// function TimeTable() {
//   return (
//     <div className="p-4">
//       <table className="table-fixed border border-collapse">
//         <thead>
//           <tr>
//             <th className="w-1/6"></th>
//             {daysOfWeek.map((day) => (
//               <th className="w-1/6" key={day}>
//                 {day}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {periods.map((period) => (
//             <tr key={period}>
//               <td className="w-1/6">{period}</td>
//               {subjects[parseInt(period) - 1].map((subject, index) => (
//                 <td className="w-1/6" key={index}>
//                   {subject}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default TimeTable;


// import React from 'react';

// const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
// const periods = ['1st', '2nd', '3rd', '4th', '5th', '6th'];

// const subjects = {
//   Monday: {
//     '1st': 'Math',
//     '3rd': 'History',
//     '4th': 'Science',
//   },
//   Tuesday: {
//     '2nd': 'English',
//     '5th': 'Physics',
//   },
//   Wednesday: {
//     '1st': 'Geography',
//     '2nd': 'Art',
//     '6th': 'PE',
//   },
//   Thursday: {
//     '3rd': 'Chemistry',
//   },
//   Friday: {
//     '4th': 'Biology',
//     '5th': 'Music',
//   },
// };

// const Timetable = () => {
//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">Weekly Timetable</h2>
//       <table className="w-full border-collapse shadow-md p-2">
//         <thead>
//           <tr>
//             <th className="w-1/6"></th>
//             {days.map((day, index) => (
//               <th key={index} className="w-1/6 border border-gray-500 text-center py-2">
//                 {day}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {periods.map((period, index) => (
//             <tr key={index}>
//               <td className="w-1/6 border border-gray-500 text-center py-2">{period}</td>
//               {days.map((day, dayIndex) => (
//                 <td key={dayIndex} className="w-1/6 border border-gray-500 text-center py-2">
//                   {subjects[day][period] || ''}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Timetable;



import React from 'react';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const periods = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];

const subjects = {
  Monday: {
    '1st': 'Math',
    '3rd': 'History',
    '4th': 'Science',
  },
  Tuesday: {
    '2nd': 'English',
    '5th': 'Physics',
  },
  Wednesday: {
    '1st': 'Geography',
    '2nd': 'Art',
    '6th': 'PE',
  },
  Thursday: {
    '3rd': 'Chemistry',
  },
  Friday: {
    '4th': 'Biology',
    '5th': 'Music',
  },
  Saturday: {
    '1st': 'Extra Class',
    '8th': 'Lab',
  },
};

const Timetable = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Weekly Timetable</h2>
      <table className="w-full border-collapse shadow-md p-2">
        <thead>
          <tr>
            <th className="w-1/8"></th>
            {days.map((day, index) => (
              <th key={index} className="w-1/8 border border-gray-500 text-center py-2">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {periods.map((period, index) => (
            <tr key={index}>
              <td className="w-1/8 border border-gray-500 text-center py-2">{period}</td>
              {days.map((day, dayIndex) => (
                <td key={dayIndex} className="w-1/8 border border-gray-500 text-center py-2">
                  {subjects[day][period] || ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Timetable;
