import React, { useState } from "react";

function Dropdown( {formdata , setformdata} ) {
  const [selectedRole, setSelectedRole] = useState("admin");
  const roleOptions = ["admin", "student", "teacher", "parent"];

  const handleRoleChange = (event) => {
    // setSelectedRole(event.target.value);
    setformdata(
      (prevdata) => {
        return {
          ...prevdata,
          Role : event.target.value,
        }
      }
    )
  };

  return (
    <div className="dropdown py-2 my-2  rounded-md ">
  <label htmlFor="role" className="w-full text-white items-center outline-none rounded-md border-0 text-[16px]">
    Select Role
  </label>
  <select id="role" onChange={handleRoleChange} value={formdata.Role} 
  className="w-full text-center p-2 rounded-md"
  // style={{ width: '100%',textAlign: 'center' }}
  >
    {roleOptions.map((option) => (
      <option key={option} value={option}>
        {option.toUpperCase()}
      </option>
    ))}
  </select>
</div>

  );
}

export default Dropdown;
