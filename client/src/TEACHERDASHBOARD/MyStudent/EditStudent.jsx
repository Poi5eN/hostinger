import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Select, MenuItem } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditStudent = () => {
  const navigate = useNavigate();
  const { email } = useParams();
  const [studentData, setStudentData] = useState({});
  const [loading,setLoading]=useState(false)
  const [formData, setFormData] = useState({
    studentFullName: "",
    // studentEmail: "",
    // studentPassword: "",
    studentDateOfBirth: "",
    studentRollNo: "",
    studentGender: "",
    studentJoiningDate: "",
    studentAddress: "",
    studentContact: "",
    studentClass: "",
    studentSection: "",
    studentCountry: "",
    studentSubject: "",
    // fatherName: "",
    // motherName: "",
    // parentEmail: "",
    // parentPassword: "",
    // parentContact: "",
    studentImage:null,
    // parentImage: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log("File:", file); // Check if 'file' is not undefined
    if (file) {
      console.log("Updating studentImage with file:", file);
      setFormData({
        ...formData,
        studentImage: file,
      });
      console.log(formData)
    }
  };

  useEffect(() => {
    axios
    .get(
      `http://localhost:4000/api/v1/adminRoute/getAllStudents?email=${email}`,
      {
        withCredentials:true
      }
    )
      .then((response) => {
        const  data  = response.data.allStudent[0];
        console.log(data)
        setStudentData(data);
        setFormData((prevFormData) => ({
          ...prevFormData,
          ...data,
        }));
      })
      .catch((error) => {
        console.error("Error fetching teacher data:", error);
      });
  }, [email]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
  
    const data = new FormData();
  console.log(formData);
  if (formData.studentImage instanceof File) {
    data.append('image', formData.studentImage);
     // Use 'image' as the key
     console.log(data)
  }

  // Append the rest of the form data to the FormData
  for (const key in formData) {
    if (key !== 'studentImage' && formData.hasOwnProperty(key)) {
      data.append(key, formData[key]);
    }
  }
  // data.append('studentEmail', email);
    
    axios.put(`http://localhost:4000/api/v1/adminRoute/updateStudent`, data, {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        console.log("Student data updated successfully", response);
        navigate("/allstudent");
      })
      .catch((error) => {
        console.error("Error updating student data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (

    <div style={{textAlign: "center", padding: "20px", }}>
      <h1 style={{ fontSize: "30px", fontWeight: "900" }}>Edit Student Profile</h1>
      <form onSubmit={handleFormSubmit} encType="multipart/form-data">
        <Box className="py-5 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-4 bg-white rounded-md shadow-lg">
          <TextField
            label="FullName"
            name="studentFullName"
            type="text"
            value={formData.studentFullName}
            onChange={handleOnChange}
            required
            style={{ width: "70%", paddingBottom:"20px" }}
          />
          <TextField
            label="Roll No"
            name="studentRollNo"
            type="text"
            value={formData.studentRollNo}
            onChange={handleOnChange}
            required
            style={{ width: "70%", paddingBottom:"20px" }}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleOnChange}
            required
            readOnly  // Ensure 'readOnly' is set here
            style={{ width: "70%", paddingBottom: "20px" }}
          />
          <TextField
            label="DateOfBirth"
            name="studentDateOfBirth"
            type="date"
            onChange={handleOnChange}
            required
            style={{ width: "70%", paddingBottom:"20px" }}
          />
          <TextField
            label="Gender"
            name="studentGender"
            value={formData.studentGender}
            onChange={handleOnChange}
            required
            style={{ width: "70%", paddingBottom:"20px" }}
          />
          <TextField
            label="Subject"
            name="studentSubject"
            value={formData.studentSubject}
            onChange={handleOnChange}
            required
            style={{ width: "70%", paddingBottom:"20px" }}
          />
          <TextField
            label="Joining Date"
            name="studentJoiningDate"
            value={formData.studentJoiningDate}
            onChange={handleOnChange}
            required
            style={{ width: "70%", paddingBottom:"20px" }}
          />
          <TextField
            label="Address"
            name="studentAddress"
            value={formData.studentAddress}
            onChange={handleOnChange}
            required
            style={{ width: "70%", paddingBottom:"20px" }}
          />
          <TextField
            label="Country"
            name="studentCountry"
            value={formData.studentCountry}
            onChange={handleOnChange}
            required
            style={{ width: "70%", paddingBottom:"20px" }}
          />
          <TextField
            label="Contact"
            name="studentContact"
            value={formData.studentContact}
            onChange={handleOnChange}
            required
            style={{ width: "70%", paddingBottom:"20px" }}
          />
          <TextField
            label="Class"
            name="studentClass"
            value={formData.studentClass}
            onChange={handleOnChange}
            required
            style={{ width: "70%", paddingBottom:"20px" }}
          />
          <TextField
            label="Section"
            name="studentSection"
            value={formData.studentSection}
            onChange={handleOnChange}
            required
            style={{ width: "70%", paddingBottom:"20px" }}
          />
          <TextField
            label="Student Image"
            name="studentImage"
            type="file"
            accept="image/*"
            required
            onChange={handleImageChange}
            style={{ width: "70%", paddingBottom:"20px" }}
         />
        </Box>
          <Link to="/allstudent">
          <div className="button flex w-full" style={{ marginTop: '10px' }}>
  <Button variant="contained" onClick={handleFormSubmit} style={{ width: '50%', marginRight: '10px' }}>
    Update
  </Button>
  <Button variant="contained" style={{ width: '50%' }}>
    Cancel
  </Button>
</div>
          </Link>
      </form>
    </div>
  );
};

export default EditStudent;
