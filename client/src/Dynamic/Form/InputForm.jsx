import React, { useState } from "react";

const InputForm = ({ fields, handleChange, handleImageChange }) => {
  const [emptyFields, setEmptyFields] = useState([]);

  const isFieldEmpty = (name) => {
    return emptyFields.includes(name);
  };

  // const handleInputChange = (name, value) => {
  //   if (value === "") {
  //     setEmptyFields((prevEmptyFields) => [...prevEmptyFields, name]);
  //   } else {
  //     setEmptyFields((prevEmptyFields) =>
  //       prevEmptyFields.filter((fieldName) => fieldName !== name)
  //     );
  //   }

  //   handleChange(name, value);
  // };
  const [fieldErrors, setFieldErrors] = useState({});

  const handleInputChange = (name, value) => {
    // Validate the field and update the errors state
    const errors = { ...fieldErrors };
    const field = fields.find((field) => field.name === name);
    if (field.required && value.trim() === "") {
      errors[name] = "This field is required.";
    } else {
      delete errors[name];
    }

    setFieldErrors(errors);

    handleChange(name, value);
  };

  const useGrid = fields.length > 5;

  return (
    <div className=" p-1 h-[390px] bg-slate-400 sm:h-[350px]  overflow-y-auto">
      <form
        className={` p-1 rounded-md mt-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4  
        ${
          // useGrid ? "grid  grid-cols-3 gap-4 " : ""
          useGrid ? "grid  gap-2 " : ""
        }`}
        encType="multipart/form-data"
      >
        {fields.map((field, index) => (
          <div key={index} className={`mb-4 ${useGrid ? "" : "col-span-2"}`}>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor={field.name}
            >
              {field.label}
            </label>

            {/* Check if the field has an error and display the error message */}
            {field.required && fieldErrors[field.name] && (
              <p className="text-red-500 text-xs mt-1">
                {fieldErrors[field.name]}
              </p>
            )}

            {field.type === "file" ? (
              <input
                type="file"
                accept={field.accept}
                onChange={handleImageChange}
                required={field.required}
                name={field.name}
              />
            ) : field.type === "select" ? (
              <select
                className="rounded-md w-full py-2 px-3 outline-none"
                id={field.name}
                name={field.name}
                value={field.value}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                required={field.required}
              >
                {field.selectOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <>
                <input
                  className={`${
                    field.required && isFieldEmpty(field.name)
                      ? "bg-red-200"
                      : ""
                  } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  value={field.value}
                  onChange={(e) =>
                    handleInputChange(field.name, e.target.value)
                  }
                />
                {field.required && fieldErrors[field.name] && (
                  <p className="text-red-500 text-xs mt-1">
                    {fieldErrors[field.name]}
                  </p>
                )}
              </>
            )}
          </div>
        ))}
      </form>
    </div>
  );
};

export default InputForm;
