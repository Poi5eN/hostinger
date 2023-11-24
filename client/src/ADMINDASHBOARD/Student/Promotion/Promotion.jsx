import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useStateContext } from "../../../contexts/ContextProvider.js";
import { toast } from "react-toastify";


const Promotion = () => {
  // Fetch data from global context
  const { allstudentdata } = useStateContext();

  const [selectionModel, setSelectionModel] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState([]);
  const [classAnchorEl, setClassAnchorEl] = useState(null);
  const [sectionAnchorEl, setSectionAnchorEl] = useState(null);

  const [promoteClass, setPromoteClass] = useState("");
  const [promoteSection, setPromoteSection] = useState("");
  const [promoteClassAnchorEl, setPromoteClassAnchorEl] = useState(null);
  const [promoteSectionAnchorEl, setPromoteSectionAnchorEl] = useState(null);
  const [error, setError] = useState(null);

  // const [class, setClass] = useState([]);
  const [apiclass, setApiclass] = useState([]);
  const [apisection, setApisection] = useState([]);
  const [shouldFetchData, setShouldFetchData] = useState(false);

  // Created for testing
  const [meta, setMeta] = useState();
  const [apiData, setApiData] = useState([]);
  // set the studentdata
  const [studentData, setStudentData] = useState([
    { id: 1, name: "Student 1", rollNumber: "001", class: "1A" },
    { id: 2, name: "Student 2", rollNumber: "002", class: "1A" },
    { id: 3, name: "Student 3", rollNumber: "003", class: "1B" },
    { id: 4, name: "Student 4", rollNumber: "004", class: "2A" },
  ]);

  useEffect(() => {
    // Fetch data from the server when the component mounts
    axios
      .get("http://localhost:4000/api/v1/adminRoute/getAllClass", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        if (Array.isArray(response.data.classList)) {
          //   // Extract class names from the response
          const classNames = response.data.classList.map(
            (classData) => classData.className
          );
          // const classNames = response.data.classList;
          const classSection = response.data.classList.map(
            (classData) => classData.section
          );

          //   // Sort the class names in increasing order
          //   classNames.sort((a, b) =>
          //     a.localeCompare(b, undefined, { numeric: true })
          //   );
          //   // classSection.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
          // For checking the class lists
          setApiData(response.data.classList);

          setApiclass(classNames);
          setApisection(classSection);
          console.log(response);
        } else {
          setError("Data format is not as expected.");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error fetching data.");
      });
  }, [shouldFetchData]);

  // Extra console in useEffects
  console.log("All student data created by admin ", allstudentdata);
  console.log("Api data that for selecting class and sectio ", apiData);
  console.log("To set api class dynamically ", apiclass);
  console.log("To set api class section  dynamically ", apisection);

  const classSections = [
    { class: "1", sections: ["A", "B", "C"] },
    { class: "2", sections: ["A", "B", "C"] },
    { class: "3", sections: ["A", "B", "C"] },
    // Add more classes and sections as needed
  ];

  // Static columns
  const columns = [
    { field: "id", headerName: "Select All", type: "checkbox", flex: 0.5 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "rollNumber", headerName: "Roll Number", flex: 1 },
    { field: "class", headerName: "Class", flex: 1 },
  ];

  const handleClassChange = (event, classData) => {
    // set the section if it the classdata match with apidata and the section in the api data related to the classs other wise set it to null
    const selectedSection = getSelectedSection(classData);
    console.log("Selected sections ", selectedSection);
    console.log("Class data ", classData);
    setApisection(selectedSection);
    // setSelectedSection()
    setSelectedClass(classData);
    setSectionAnchorEl(event.currentTarget);
  };

  function getSelectedSection(classData) {
    const matchingData = apiData.find((data) => data.className === classData);
    if (matchingData) {
      // If a matching class is found, return its section
      const filteredStudentData = allstudentdata.filter(
        (student) => student.className === classData
      );
      setStudentData(filteredStudentData);
      return matchingData.section; // Assuming there is only one section in the array
    }
    // If no matching class is found, return null or a default value
    return null;
  }

  const handleSectionChange = (section, selectedClass) => {
    // Filter student data based on the selected class and section
    // const filteredData = allstudentdata.filter((student) => {
    //   return student.studentClass === "2" && student.studentSection == "B";
    // });

    console.log("Handle Section Change ki selected Class", selectedClass);
    console.log("Handle Section Change ki selected section ", section);

    const matchingData = allstudentdata.filter((object) => {
      return object.class === selectedClass && object.section === section;
    });

    console.log("matched data ", matchingData);
    const formattedData = matchingData.map((object) => ({
      id: object._id,
      name: object.studentFullName,
      rollNumber: object.studentRollNo,
      class: object.studentClass,
    }));

    setStudentData(formattedData);
    // for (let i = 0; i < allstudentdata.length; i++) {
    //   const object = allstudentdata[i];
    //   // console.log("print the data ", object);

    //   if (
    //     object.studentClass === selectedClass &&
    //     object.studentSection === section
    //   ) {
    //     console.log("matched data ", object);
    //     // setStudentData(object);
    //     setStudentData([
    //       {
    //         id: object._id,
    //         name: object.studentFullName,
    //         rollNumber: object.studentRollNo,
    //         class: object.studentClass,
    //       },
    //     ]);
    //   }
    //   // Do something with 'object'
    // }
    console.log("Working on data ", section);
    // i;

    // console.log("Data required ", filteredData);
    // Update the studentData state with the filtered data

    // Update the selected section
    setSelectedSection(section);
    // Close the section anchor element (if you're using a dropdown or popover)
    setSectionAnchorEl(null);
  };

  const handlePromoteClassChange = (event, classData) => {
    setPromoteClass(classData.class);
    setPromoteSectionAnchorEl(event.currentTarget);
  };

  const handlePromoteSectionChange = (section) => {
    setPromoteSection(section);
    setPromoteSectionAnchorEl(null);
  };

  const handleMenuClose = () => {
    setClassAnchorEl(null);
    setSectionAnchorEl(null);
    setPromoteClassAnchorEl(null);
    setPromoteSectionAnchorEl(null);
  };

  const handleSelectionModelChange = (newSelection) => {
    setSelectionModel(newSelection);
    console.log("Checked elements: in ", newSelection);
  };

  // const handlePromoteClick = () => {
  //   // To Promote a student we require the student id and the promoted section and class
  //   // The student id fetched form the checked student and id is fetched from the selectd promted class and id
  //   // selectionModel give the student id , promoteSection , promoteClass give the class and section now
  //   // Make a put request to the http://localhost:4000/api/v1/adminRoute/promotionOfStudent url and console the request sucess
  // };

  const handlePromoteClick = async () => {
    // Get the selected student's ID, promoted section, and promoted class
    const studentId = selectionModel; // Replace this with the actual way you obtain the selected student's ID
    const promotedSection = promoteSection; // Replace with your logic to get the promoted section
    const promotedClass = promoteClass; // Replace with your logic to get the promoted class

    if (studentId.length === 0) {
      console.error("No students selected for promotion");
      return;
    }
    // Prepare the data to send in the PUT request
    const dataToUpdate = {
      students: studentId,
      promotedClass: promotedClass,
      promotedSection: promotedSection,
    };

    // Make the PUT request
    await axios
      .put(
        "http://localhost:4000/api/v1/adminRoute/promotionOfStudent",
        dataToUpdate,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
        // {
        //   headers: {
        //     "Content-Type": "application/json",
        //     // You may need to include authentication headers if required
        //     // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
        //     Authorization: `Bearer ${token}`,
        //   },
        // }
      )
      .then((response) => {
        // Handle the response from the server
        toast.success("Student promotion successfully");

        // to promote student we pass only checked student id suppose an id is unchecked then update the setStudentData to that unchecked id otherwise if all student are updated then set it to empty

        // const unMatchingData = studentData.filter((object) => {
        //   return (
        //     object._id != dataToUpdate.students
        //   );
        // });

        const unMatchingData = studentData.filter((object) => {
          return !dataToUpdate.students.includes(object.id);
        });

        setStudentData(unMatchingData);

        console.log(
          "Promotion Successful:",
          response.data,
          "Promoted class",
          promoteClass,
          "Promoted Section ",
          promotedSection
        );
      })
      .catch((error) => {
        // Handle errorscd c
        toast.error("Student promotion  failed");
        console.error("Promotion Failed:", error);
      });
  };
  // const getSectionsForSelectedClass = () => {
  //   if (selectedClass) {
  //     const selectedClassData = apisection.find(
  //       (classData) => classData.class === selectedClass
  //     );
  //     if (selectedClassData) {
  //       return selectedClassData.sections || [];
  //     }
  //   }
  //   return [];
  // };

  console.log("selectionModel : ", selectionModel);
  console.log("Promoted Class : ", promoteClass);
  console.log("Promoted Section  : ", promoteSection);
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-semibold text-blue-600">
        Student Promotion
      </h2>

      <div className="flex space-x-4">
        <div className="w-1/2">
          <h3 className="text-lg font-semibold">Class</h3>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={(event) => {
              setClassAnchorEl(event.currentTarget);
              setSectionAnchorEl(null);
            }}
          >
            {selectedClass
              ? `${selectedClass} - ${selectedSection}`
              : "Select Class and Section"}
          </Button>
          <Popover
            anchorEl={classAnchorEl}
            open={Boolean(classAnchorEl)}
            onClose={handleMenuClose}
          >
            <List>
              {apiclass.map((classData) => (
                <ListItem
                  key={classData}
                  onClick={(event) => handleClassChange(event, classData)}
                >
                  <ListItemText primary={classData} />
                </ListItem>
              ))}
            </List>
          </Popover>
          <Popover
            anchorEl={sectionAnchorEl}
            open={Boolean(sectionAnchorEl)}
            onClose={handleMenuClose}
          >
            <List>
              {/* {apiData.className === "1" &&
                apiData.section.map((section) => (
                  <ListItem
                    button
                    // key={section}
                    onClick={() => handleSectionChange(section)}
                  >
                    <ListItemText primary={section} />
                  </ListItem>
                ))} */}
              {apisection.map((section) => (
                <ListItem
                  key={section}
                  onClick={() => handleSectionChange(section, selectedClass)}
                >
                  <ListItemText primary={section} />
                </ListItem>
              ))}
            </List>
          </Popover>
        </div>
        <div className="w-1/2">
          <h3 className="text-lg font-semibold">Promote</h3>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={(event) => {
              setPromoteClassAnchorEl(event.currentTarget);
              setPromoteSectionAnchorEl(null);
            }}
          >
            {promoteClass
              ? `${promoteClass} - ${promoteSection}`
              : "Select Promote Class and Section"}
          </Button>
          <Popover
            anchorEl={promoteClassAnchorEl}
            open={Boolean(promoteClassAnchorEl)}
            onClose={handleMenuClose}
          >
            <List>
              {classSections.map((classData) => (
                <ListItem
                  button
                  key={classData.class}
                  onClick={(event) =>
                    handlePromoteClassChange(event, classData)
                  }
                >
                  <ListItemText primary={classData.class} />
                </ListItem>
              ))}
            </List>
          </Popover>
          <Popover
            anchorEl={promoteSectionAnchorEl}
            open={Boolean(promoteSectionAnchorEl)}
            onClose={handleMenuClose}
          >
            <List>
              {classSections
                .find((classData) => classData.class === promoteClass)
                ?.sections.map((section) => (
                  <ListItem
                    button
                    key={section}
                    onClick={() => handlePromoteSectionChange(section)}
                  >
                    <ListItemText primary={section} />
                  </ListItem>
                ))}
            </List>
          </Popover>
        </div>
      </div>

      <div
        style={{
          height: 400,
          width: "100%",
          backgroundColor: "white",
          borderRadius: "10px",
        }}
      >
        {/* <DataGrid rows={studentData} columns={columns} checkboxSelection /> */}
        <DataGrid
          rows={studentData}
          columns={columns}
          checkboxSelection
          selectionModel={selectionModel}
          onRowSelectionModelChange={handleSelectionModelChange}
          // getRowId={(row) => row._id} // Specify a custom ID field
        />
      </div>

      <div className="w-1/2">
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handlePromoteClick}
        >
          Update Session
        </Button>
      </div>
    </div>
  );
};

export default Promotion;
