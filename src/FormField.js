import React, { useState } from "react";

function FormField({ selectedFields = {} }) {
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [value, setValue] = useState("");

  // to handle form input value change
  const handleChange = (id, value) => {
    setFormData({ ...formData, [id]: value });
  };

  // to handle form number input value change
  const handleNumberChange = (id, value) => {
    if (/^\d{0,9}$/.test(value)) {
      setValue(value);
    }
    setFormData({ ...formData, [id]: value });
  };

  // handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};
    selectedFields.forEach((field) => {
      if (!formData[field.id]) {
        errors[field.id] = "Field is required";
      }
    });
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      console.log("Form submitted:", formData);
    }
  };

  // handle field render according to type
  const renderField = (field) => {
    switch (field.type) {
      case "text":
      case "textarea":
        return (
          <div key={field.id}>
            <label>{field.label}</label>
            {field.type === "textarea" ? (
              <textarea
                onChange={(e) => handleChange(field.id, e.target.value)}
              />
            ) : (
              <input
                type="text"
                onChange={(e) => handleChange(field.id, e.target.value)}
              />
            )}
            {formErrors[field.id] && (
              <span style={{ color: "red" }}>{formErrors[field.id]}</span>
            )}
          </div>
        );
      case "number":
        return (
          <div key={field.id}>
            <label>Enter PhoneNumber:</label>
            <input
              type="text"
              pattern="[0-9]*" // Pattern to allow only digits
              maxLength="10" // Maximum length of 9 digits
              value={value}
              onChange={(e) => handleNumberChange(field.id, e.target.value)}
            />
            {formErrors[field.id] && (
              <span style={{ color: "red" }}>{formErrors[field.id]}</span>
            )}
          </div>
        );
      case "dropdown":
        return (
          <div key={field.id}>
            <label>{field.label}</label>
            <select onChange={(e) => handleChange(field.id, e.target.value)}>
              <option value="">Select</option>
              {field.options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {formErrors[field.id] && (
              <span style={{ color: "red" }}>{formErrors[field.id]}</span>
            )}
          </div>
        );
      case "email":
        return (
          <div key={field.id}>
            <label>{field.label}</label>
            <input
              type="email"
              onChange={(e) => handleChange(field.id, e.target.value)}
            />
            {formErrors[field.id] && (
              <span style={{ color: "red" }}>{formErrors[field.id]}</span>
            )}
          </div>
        );
      case "checkbox":
        return (
          <div key={field.id}>
            <label>{field.label}</label>
            {field.options.map((option, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  id={`${field.id}-${index}`}
                  value={option}
                  onChange={(e) => handleChange(field.id, e.target.checked)}
                />
                <label htmlFor={`${field.id}-${index}`}>{option}</label>
              </div>
            ))}
            {formErrors[field.id] && (
              <span style={{ color: "red" }}>{formErrors[field.id]}</span>
            )}
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <>
      <h1>Form Fields</h1>
      <form onSubmit={handleSubmit}>
        {selectedFields.map((field) => renderField(field))}
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default FormField;
