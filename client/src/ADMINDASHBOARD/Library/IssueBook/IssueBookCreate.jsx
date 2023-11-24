import React, { useState, useEffect } from "react";

import axios from "axios";
import "../../../Dynamic/Form/FormStyle.css";
import DynamicDataTable from "./DataTable";

function IssueBookCreate() {

  const [submittedData, setSubmittedData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/adminRoute/getAllBooks", {
        withCredentials: true,
      })
      .then((response) => {

        console.log("response message", response.data.message);
        if (Array.isArray(response.data.listOfAllBooks)) {
          setSubmittedData(response.data.listOfAllBooks);
        } else {
          console.error("Data format is not as expected:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message);
      });
  }, [ ]);
  
  return (
    <div className=" mt-12  mx-auto p-3">
      <h1 className="text-2xl font-bold mb-4"> Book Issue</h1>
     

      <DynamicDataTable data={submittedData} />
    </div>
  );
}

export default IssueBookCreate;
