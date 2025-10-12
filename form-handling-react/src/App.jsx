// src/App.jsx
import React from "react";
import RegistrationForm from "./components/RegistrationForm";
import FormikForm from "./components/formikForm";

function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Form Handling Exercises</h1>

      <div style={{ border: "1px solid #ddd", padding: 12, marginBottom: 20 }}>
        <RegistrationForm />
      </div>

      <div style={{ border: "1px solid #ddd", padding: 12 }}>
        <FormikForm />
      </div>
    </div>
  );
}

export default App;
