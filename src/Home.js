import React, { useState } from "react";
import FormField from "./FormField";

function Home() {
  const [selectedFields, setSelectedFields] = useState([]);
  const [save, setSave] = useState(false);

  const availableFields = [
    { id: 1, type: "text", label: "Text Input" },
    { id: 2, type: "textarea", label: "Textarea" },
    { id: 3, type: "dropdown", label: "Dropdown", options: ["Yes", "No"] },
    { id: 4, type: "checkbox", label: "Checkbox", options: ["Yes", "No"] },
    { id: 6, type: "number", label: "Phone Number" },
    { id: 7, type: "email", label: "Email" },
  ];

  const handleAddField = (field) => {
    setSelectedFields([...selectedFields, field]);
  };

  const handleRemoveField = (field) => {
    setSelectedFields(selectedFields.filter((f) => f.id !== field.id));
  };

  const handleSave = () => {
    setSave(true);
  };

  return (
    <div>
      {!save && (
        <div>
          <h2>Form Configurator</h2>
          <div>
            <h3>Available Fields</h3>
            <ul>
              {availableFields.map((field) => (
                <li className="list" key={field.id}>
                  {field.label} - {field.type}
                  &nbsp;&nbsp;
                  <button
                    className="button"
                    onClick={() => handleAddField(field)}
                  >
                    Add
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Selected Fields</h3>
            <ul>
              {selectedFields.map((field) => (
                <li className="list" key={field.id}>
                  {field.label} - {field.type}
                  &nbsp;&nbsp;
                  <button
                    className="Removebutton"
                    onClick={() => handleRemoveField(field)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {selectedFields.length !== 0 && !save && (
        <div>
          <button className="button" onClick={handleSave}>
            Save
          </button>
        </div>
      )}
      {save && <FormField selectedFields={selectedFields} />}
    </div>
  );
}

export default Home;
