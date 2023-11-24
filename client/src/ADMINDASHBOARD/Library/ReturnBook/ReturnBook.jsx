import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import axios from "axios";
import "../../../Dynamic/Form/FormStyle.css";
import DynamicDataTable from "./DataTable";

function ReturnBook() {

  const { _id } = useParams();
  const [loading, setLoading] = useState(false);

  const [submittedData, setSubmittedData] = useState([]);
  const [shouldFetchData, setShouldFetchData] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/adminRoute/getAllIssuedBookStudent?bookId=${_id}`, {
        withCredentials: true,
      })
      .then((response) => {
        if (Array.isArray(response.data.allStudent)) {
          setSubmittedData(response.data.allStudent);
          console.log(response.data.message);
        } else {
          console.error("Data format is not as expected:", response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message);
      });
  }, [shouldFetchData]);

  const handleReturnButtonClick = () => {
    setShouldFetchData(!shouldFetchData);
  };

  return (
    <div className=" mt-12  mx-auto p-3">
      <h1 className="text-2xl font-bold mb-4">Return Books</h1>
     

      <DynamicDataTable data={submittedData} updateFetchData={handleReturnButtonClick}  />
    </div>
  );
}

export default ReturnBook;
