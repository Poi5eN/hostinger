import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { Button } from '.';
// import { userProfileData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
// import avatar from '../data/avatar.jpeg';
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { currentColor } = useStateContext();
  const fullName = localStorage.getItem("fullName");
  const image = localStorage.getItem("image");
  const email = localStorage.getItem("email");
  const userRole = sessionStorage.getItem("userRole");
  const navigate = useNavigate();

  const handleLogout = () => {

    // You can make an Axios request to your server to log the user out
    axios.get("http://localhost:4000/api/v1/logout")
      .then((response) => {
        // Handle successful logout, such as clearing user data and redirecting to the login page
        localStorage.removeItem("fullName"); // Clear user data from localStorage
        localStorage.removeItem("image");
        localStorage.removeItem("email");
        sessionStorage.removeItem("userRole");
        // You can also remove the user's token or other relevant data
  
        // Redirect the user to the login page or wherever is appropriate
       navigate('/');
        
        // Log a success message (optional)
        console.log("Logout Success", response);
  
      })
      .catch((error) => {
        // Handle any errors that occur during the logout process
        console.error("Logout error", error);
      });
  };
  

  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <img
          className="rounded-full h-24 w-24"
          src={image}
          alt="user-profile"
        />
        <div>
        <p className="font-semibold text-xl dark:text-gray-200"> {fullName}</p>
<p className="text-gray-500 text-sm dark:text-gray-400">
  {userRole ? userRole.toUpperCase() : ""}
</p>
<p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
  {email}
</p>
        </div>
      </div>
      {/* <div>
        {userProfileData.map((item, index) => (
          <div key={index} className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]">
            <button
              type="button"
              style={{ color: item.iconColor, backgroundColor: item.iconBg }}
              className=" text-xl rounded-lg p-3 hover:bg-light-gray"
            >
              {item.icon}
            </button>

            <div>
              <p className="font-semibold dark:text-gray-200 ">{item.title}</p>
              <p className="text-gray-500 text-sm dark:text-gray-400"> {item.desc} </p>
            </div>
          </div>
        ))}
      </div> */}
      <div className="mt-5">
        <input
         type="button" 
         value="Logout" 
         onClick={handleLogout}  
         style={{
            width: "100%",
            color: "white",
            backgroundColor: "blue",
            borderRadius: "10px",
            cursor:"pointer",
            padding:"10px"
          }}
   />
      </div>
    </div>

  );
};

export default UserProfile;
