import React from 'react';

const Screenshot = () => {
  const screenshots = [
    {
      url: 'https://www.zohowebstatic.com/sites/zweb/images/creator/app-deck/school-management-system-software-ss2.png',
      heading: 'Admin',
      description: 'Allows administrators to create, manage, and control user accounts for staff, teachers, students, and parents. Streamlines the admissions process, manages student enrollment, and tracks applicant information.',
    },
    {
      url: 'https://www.zohowebstatic.com/sites/zweb/images/creator/app-deck/school-management-system-software-ss3.png',
      heading: 'Dashboards',
      description: 'Presents key performance indicators (KPIs) and data in visual formats like charts, graphs, and tables. Allows users to customize dashboards to display the metrics and data relevant to their roles.',
    },
    {
      url: 'https://edunexttechnologies.com/images/edunexttechnologies_noida-school-management-dashboard.png',
      heading: 'eLearning',
      description: ' Offers tools to create, manage, and deliver online courses and educational content. Stores and organizes educational materials, such as lectures, documents, videos, and assignments.',
    },
    {
      url: 'https://edunexttechnologies.com/images/edunexttechnologies_noida-what-is-School-Management-Software.png',
      heading: 'Notice Board',
      description: 'Enables school administrators to post important announcements, news, and events for students, parents, and staff. Allows for the sharing of documents, forms, and policies for easy access by the school community.',
    },
    {
      url: 'https://www.edulabs.com.sg/wp-content/uploads/2022/02/a3.png',
      heading: 'Sales Report',
      description: 'Generates reports and analytics on sales performance, including revenue, trends, and customer behavior. Provides financial reports, including profit and loss statements, balance sheets, and sales tax reports.',
    },
    {
      url: 'https://www.edulabs.com.sg/wp-content/uploads/2022/01/new1.png',
      heading: 'Student Data',
      description: 'Maintains detailed records of each student, including personal information, academic history, attendance, and discipline records. Allows educators to monitor student progress, set goals, and identify areas for improvement.',
    },
  ];

  return (
    <div className="bg-gray-100 py-20 ">
      <div className="container mx-auto">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8 text-center ">Our Management System</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {screenshots.map((screenshot, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ${
                index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'
              }`}
            >
              <div className="w-full p-4 flex flex-col justify-center">
                <h2 className="text-2xl font-semibold mb-2 text-center">{screenshot.heading}</h2>
                <p className="text-gray-600 text-center">{screenshot.description}</p>
              </div>
              <div className="w-full">
                <img src={screenshot.url} alt={screenshot.heading} className="w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Screenshot;
