
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import LandingPage from './ShikshMitraWebsite/LandingPage';
import AdminDashboard from './ADMINDASHBOARD/AdminDashboard';
import Login from './ShikshMitraWebsite/component/LoginPage/Login';
import Services from './ShikshMitraWebsite/component/Pages/Services/Services';
import About from './ShikshMitraWebsite/component/Pages/About/About';
import Contact from './ShikshMitraWebsite/component/Pages/Contact/Contact';
import Home from './ShikshMitraWebsite/component/Pages/Home';
import ScreenShorts from './ShikshMitraWebsite/component/Pages/Screenshots/Screenshot';

import DashboardHome from './ADMINDASHBOARD/DashboardHome'

import AllTeachers from './ADMINDASHBOARD/Teacher/AllTeachers';
import ViewTeacher from './ADMINDASHBOARD/Teacher/ViewTeacher'
import EditTeacher from './ADMINDASHBOARD/Teacher/EditTeacher'
import Payment from './ADMINDASHBOARD/Payment/Payment';

import AdditionalFee from './ADMINDASHBOARD/Fees/Additional/AdditionalFee';
import ClasswiseFee from './ADMINDASHBOARD/Fees/ClassWise/ClasswiseFee';
import Edit_Classwise_Fees from './ADMINDASHBOARD/Fees/ClassWise/EditClassWise';
import EditAdditional from './ADMINDASHBOARD/Fees/Additional/EditAdditional';

import Allstudent from './ADMINDASHBOARD/Student/AllStudent/Allstudent';
import ViewStudent from './ADMINDASHBOARD/Student/AllStudent/ViewStudent';
import EditStudent from './ADMINDASHBOARD/Student/AllStudent/EditStudent';
import Promotion from './ADMINDASHBOARD/Student/Promotion/Promotion';

import CreateParents from './ADMINDASHBOARD/Parents/AllParent/CreateParents';
import FeeStatus from './ADMINDASHBOARD/Parents/FeesStatus/FeeStatus';
import Income from './ADMINDASHBOARD/Account/Income';
import Expenditure from './ADMINDASHBOARD/Account/Expenditure/Expenditure';
import Stocks from './ADMINDASHBOARD/Inventory/Stocks';
import Edit_Stocks from './ADMINDASHBOARD/Inventory/Edit_Stocks';
import Sales from './ADMINDASHBOARD/Inventory/Sales/Sales';
import AllBooks from './ADMINDASHBOARD/Library/AllBooks';
import EditBook from './ADMINDASHBOARD/Library/EditBook';
import ViewBooks from './ADMINDASHBOARD/Library/ViewBooks';
import IssuedBook from './ADMINDASHBOARD/Library/IssuedBook';
import Registration from './ADMINDASHBOARD/Admission/Registration';
import AdmissionStatus from './ADMINDASHBOARD/Admission/AdmissionStatus';
import Primary from './ADMINDASHBOARD/Classes/Primary';
import Secondary from './ADMINDASHBOARD/Classes/Secondary';
import Staff from './ADMINDASHBOARD/Employees/Staff';
import Exams from './ADMINDASHBOARD/Exams/AllExams';
import ViewExams from './ADMINDASHBOARD/Exams/AllExams/ViewExams';
import EditExams from './ADMINDASHBOARD/Exams/AllExams/EditExams';
import Wages from './ADMINDASHBOARD/Employees/Wages';
import ViewAdmission from './ADMINDASHBOARD/Admission/ViewAdmission';
import EditAdmission from './ADMINDASHBOARD/Admission/EditAdmission';
import ViewPrimary from './ADMINDASHBOARD/Classes/Primary/ViewPrimary';
import EditPrimary from './ADMINDASHBOARD/Classes/Primary/EditPrimary';
import ViewStaff from './ADMINDASHBOARD/Employees/Staff/ViewStaff';
import EditStaff from './ADMINDASHBOARD/Employees/Staff/EditStaff';

import TeacherDashboard from './TEACHERDASHBOARD/TeacherDashboard';
import TeacherHome from './TEACHERDASHBOARD/TeacherHome';
import MyStudent from './TEACHERDASHBOARD/MyStudent/MyStudent';
import Assignments from './TEACHERDASHBOARD/Assignments';
import Attendance from './TEACHERDASHBOARD/Attendance';
import Curriculum from './TEACHERDASHBOARD/Curriculum';
import Lectures from './TEACHERDASHBOARD/Lectures';
import Study from './TEACHERDASHBOARD/Study';
import Results from './TEACHERDASHBOARD/Results';
import AboutTeacher from './TEACHERDASHBOARD/AboutTeacher';


import StudentDashboard from './STUDENTDASHBOARD/StudentDashboard';
import ParentDashboard from './ParentDashboard';
import Subjects from './STUDENTDASHBOARD/Subjects';
import StudentResults from './STUDENTDASHBOARD/StudentResults';
import StudentStudyMaterial from './STUDENTDASHBOARD/StudentStudyMaterial';
import TimeTable from './STUDENTDASHBOARD/TimeTable';
import StudentAssigments from './STUDENTDASHBOARD/StudentAssigments';

import Syllabus from './STUDENTDASHBOARD/Syllabus';
import MyKids from './PARENTDASHBOARD/MyKids';
import Events from './PARENTDASHBOARD/Events';
import ParentResults from './PARENTDASHBOARD/ParentResults';
import ParentCurriculum from './PARENTDASHBOARD/ParentCurriculum';
import ParentNotification from './PARENTDASHBOARD/ParentNotification';
import Expenses from './PARENTDASHBOARD/Expenses';
import Queries from './PARENTDASHBOARD/Queries';

import StudentHome from './STUDENTDASHBOARD/StudentHome';
import AdmitCard from './ADMINDASHBOARD/Exams/AdmitCard';
import CreateExams from './TEACHERDASHBOARD/CreateExams';
import ParentHome from './PARENTDASHBOARD/ParentHome';
import StudentFeeStatus from './ADMINDASHBOARD/Student/AllStudent/StudentFeeStatus';
import Issue from './ADMINDASHBOARD/Library/IssueBook/Issue';
import ReturnBook from './ADMINDASHBOARD/Library/ReturnBook/ReturnBook';

function App() {
  const location = useLocation(); // Get the current location

  return (
    <>
    <Routes>
      <Route path='/' element={<LandingPage/>}>
           <Route index element={<Home/>} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/services' element={<Services/>} />
          <Route path='/screenshorts' element={<ScreenShorts/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/about' element={<About/>} />
      </Route>
    <Route path='/admin' element={<AdminDashboard/>}>
       <Route index element={<DashboardHome/>}/>
       {/* Teachers Route */}
       <Route path='allteachers' element={<AllTeachers/>}/>
       <Route path='payment' element={<Payment/>}/>
       <Route path='/admin/allteachers/view-profile/:email' element={<ViewTeacher/>}/>
       <Route path='/admin/allteachers/edit-profile/:email' element={<EditTeacher/>}/>
       {/* Fees Routing  */}
       <Route path='additional' element={<AdditionalFee/>}/>
       <Route path='classwise' element={<ClasswiseFee/>}/>
       <Route path='/admin/classwise/edit-fees/:_id' element={<Edit_Classwise_Fees/>}/>
       <Route path='/admin/additional/edit-fees/:_id' element={<EditAdditional/>}/>
       <Route path='allstudent' element={<Allstudent/>}/>
       <Route path='/admin/allstudent/viewstudent/view-profile/:email' element={<ViewStudent/>}/>
       <Route path='/admin/allstudent/editstudent/edit-profile/:email' element={<EditStudent/>}/>
       <Route path='/admin/allstudent/StudentFeeStatus/:email' element={<StudentFeeStatus/>}/>     
       <Route path='promotion' element={<Promotion/>}/>
       <Route path='allparents' element={<CreateParents/>}/>
       <Route path='feestatus' element={<FeeStatus/>}/>
       <Route path='income' element={<Income/>}/>
       <Route path='expenditure' element={<Expenditure/>}/>
       <Route path='stocks' element={<Stocks/>}/>
       <Route path='/admin/stocks/editstock/:_id' element={<Edit_Stocks/>}/>
       <Route path='sales' element={<Sales/>}/>
       <Route path='books' element={<AllBooks/>}/>
       <Route path='/admin/books/edit-book/:_id' element={<EditBook/>}/>
       <Route path='/admin/books/view-book/:_id' element={<ViewBooks/>}/>

<Route path='books' element={<AllBooks/>}/>
       <Route path='/admin/books/edit-book/:_id' element={<EditBook/>}/>
       <Route path='/admin/books/view-book/:_id' element={<ViewBooks/>}/>
       <Route path='issued' element={<IssuedBook/>}/>
       <Route path='/admin/books/issue-book/:_id' element={<Issue/>}/>
       <Route path='/admin/books/return-book/:_id' element={<ReturnBook/>}/>

       <Route path='registration' element={<Registration/>}/>
       <Route path='/admin/registration/view-admission/:email' element={<ViewAdmission/>}/>
       <Route path='/admin/registration/edit-admission/:email' element={<EditAdmission/>}/>

       <Route path='status' element={<AdmissionStatus/>}/>

       <Route path='primary' element={<Primary/>}/>
       <Route path='/admin/primary/view-primary/:className' element={<ViewPrimary/>}/>
       <Route path='/admin/primary/edit-primary/:className' element={<EditPrimary/>}/>

       <Route path='secondary' element={<Secondary/>}/>
       <Route path='/admin/secondary/view-secondary/:className' element={<ViewPrimary/>}/>
       <Route path='/admin/secondary/edit-secondary/:className' element={<EditPrimary/>}/>

       <Route path='staff' element={<Staff/>}/>
       <Route path='/admin/staff/view-profile/:email' element={<ViewStaff/>}/>
       <Route path='/admin/staff/edit-profile/:email' element={<EditStaff/>}/>

       <Route path='wages' element={<Wages/>}/>

       <Route path='allexams' element={<Exams/>}/>
       <Route path='/admin/exams/view-profile/:email' element={<ViewExams/>}/>
       <Route path='/admin/exams/edit-profile/:email' element={<EditExams/>}/>
       <Route path='admitcard' element={<AdmitCard/>} />

    </Route>

    <Route path='/teacher' element={<TeacherDashboard/>}>
      <Route index element={<TeacherHome/>}/>
      <Route path='mystudents' element={<MyStudent/>} />
      <Route path='assignments' element={<Assignments/>} />
      <Route path='attendance' element={<Attendance/>} />
      <Route path='curriculum' element={<Curriculum/>} />
      <Route path='lectures' element={<Lectures/>} />
      <Route path='study' element={<Study/>} />
      <Route path='results' element={<Results/>} />    
      <Route path="createExam" element={<CreateExams/>}/>
      <Route path="aboutTeacher" element={<AboutTeacher/>}/>
    </Route>


    <Route path='/student' element={<StudentDashboard/>}>
      <Route index element={<StudentHome/>}/>
    <Route path='subjects'  element={<Subjects/>} />
    <Route path='results'  element={<StudentResults/>} />
    <Route path='StudyMaterial'  element={<StudentStudyMaterial/>} />
    <Route path='timetable'  element={<TimeTable/>} />
    <Route path='assigments'  element={<StudentAssigments/>} />
    <Route path='syllabus'  element={<Syllabus/>} />
    </Route>
    <Route path='/parent' element={<ParentDashboard/>}>
    <Route index element={<ParentHome/>}/>
    <Route path='mykids' element={<MyKids/>}/>
    <Route path='events' element={<Events/>}/>
    <Route path='results' element={<ParentResults/>}/>
    <Route path='curriculum' element={<ParentCurriculum/>}/>
    <Route path='notification' element={<ParentNotification/>}/>
    <Route path='expenses' element={<Expenses/>}/>
    <Route path='queries' element={<Queries/>}/>
    </Route>
    </Routes>
      
      </>
  );
}

export default App;
