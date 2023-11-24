import React from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ContextProvider } from './contexts/ContextProvider';
// import AdminDashboard from './AdminDashboard';
// import StudentDashboard from './StudentDashboard';
// import ParentDashboard from './ParentDashboard';
// import TeacherDashboard from './TeacherDashboard';
// impo

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ContextProvider>
    <ToastContainer />
  </React.StrictMode>,
  document.getElementById('root'),
);
