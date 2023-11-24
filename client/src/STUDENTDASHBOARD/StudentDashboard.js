import React, { useState,useEffect } from "react";
import { Routes, Route, Outlet ,useNavigate,useLocation} from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { Navbar, Footer, Sidebar, ThemeSettings } from "../components";
// import { DashboardHome, Employees } from "./pages";
import ".././App.css";

import { useStateContext } from "../contexts/ContextProvider";
// import DashBoard from "./STUDENT/DashBoard/DashBoard";

// import Subjects from "./STUDENT/Subjects";
// import Assigments from "./STUDENT/Assigments";
// import Lectures from "./STUDENT/Lectures";
// import Results from "./STUDENT/Results";
// import Syllabus from "./STUDENT/Syllabus";
// import TimeTable from "./STUDENT/TimeTable";



const StudentDashboard = () => {
  const location = useLocation()
const navigate = useNavigate()
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
    isLoggedIn,
    setisLoggedIn
  } = useStateContext();

  const [singleLog,setSingleLog] = useState(sessionStorage.getItem('userRole'));

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
    
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', function(event) {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
      }
    });

    // Disable the back button in the browser's address bar
    navigate.pushState(null, null, location.href);
    window.addEventListener('popstate', function(event) {
      navigate.pushState(null, null, location.href);
    });
  }, []);


  console.log(singleLog)
  if( singleLog ){
    setisLoggedIn(singleLog)
  }
  console.log(isLoggedIn)

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      {/* (isLoggedIn || singleLog ) && */}
      {/* {  (isLoggedIn == 'student')   && ( */}
      { (( isLoggedIn == 'student' && (singleLog=='student'))  ) && ( 
        <>
          <div className="flex relative dark:bg-main-dark-bg">
            <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
              <TooltipComponent content="Settings" position="Top">
                <button
                  type="button"
                  onClick={() => setThemeSettings(true)}
                  style={{ background: currentColor, borderRadius: "50%" }}
                  className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                >
                  <FiSettings />
                </button>
              </TooltipComponent>
            </div>
            {activeMenu ? (
              <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
                <Sidebar />
              </div>
            ) : (
              <div className="w-0 dark:bg-secondary-dark-bg">
                <Sidebar />
              </div>
            )}
            <div
              className={
                activeMenu
                  ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
                  : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
              }
            >
              <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                <Navbar />
              </div>
              <div>
                {themeSettings && <ThemeSettings />}
<Outlet/>
                {/* <Routes>
                  <Route path="/Student" element={<DashBoard/>}/>
                 <Route path="/subjects" element={<Subjects/>} />
                 <Route path="/assigments" element={<Assigments/>} />
                 <Route path="/lectures" element={<Lectures/>} />
                 <Route path="/results" element={<Results/>} />
                 <Route path="/syllabus" element={<Syllabus/>} />
                 <Route path="/timetable" element={<TimeTable/>} />

                
                </Routes> */}
              </div>
              <Footer />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StudentDashboard;
