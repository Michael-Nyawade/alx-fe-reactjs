import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const RegistrationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function FormikForm() {
  const initialValues = { username: "", email: "", password: "" };

  const handleSubmit = async (
    values,
    { setSubmitting, resetForm, setStatus }
  ) => {
    setStatus(null);
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        throw new Error(`Server error ${res.status}`);
      }
      const data = await res.json();
      setStatus({
        success: `Registered successfully (id: ${data.id || "mocked"})`,
      });
      resetForm();
    } catch (err) {
      setStatus({ error: err.message || "Registration failed" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: 440, margin: "0 auto", padding: 20 }}>
      <h2>Registration (Formik + Yup)</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={RegistrationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form noValidate>
            <label style={{ display: "block", marginBottom: 8 }}>
              Username
              <Field
                name="username"
                placeholder="Your username"
                style={{
                  display: "block",
                  width: "100%",
                  padding: 8,
                  marginTop: 6,
                }}
              />
              <ErrorMessage
                name="username"
                component="div"
                style={{ color: "red", marginTop: 6 }}
              />
            </label>

            <label style={{ display: "block", marginBottom: 8 }}>
              Email
              <Field
                name="email"
                type="email"
                placeholder="you@example.com"
                style={{
                  display: "block",
                  width: "100%",
                  padding: 8,
                  marginTop: 6,
                }}
              />
              <ErrorMessage
                name="email"
                component="div"
                style={{ color: "red", marginTop: 6 }}
              />
            </label>

            <label style={{ display: "block", marginBottom: 8 }}>
              Password
              <Field
                name="password"
                type="password"
                placeholder="Password"
                style={{
                  display: "block",
                  width: "100%",
                  padding: 8,
                  marginTop: 6,
                }}
              />
              <ErrorMessage
                name="password"
                component="div"
                style={{ color: "red", marginTop: 6 }}
              />
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{ padding: "8px 16px", marginTop: 12 }}
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>

            {status?.error && (
              <div style={{ marginTop: 12, color: "red" }}>{status.error}</div>
            )}
            {status?.success && (
              <div style={{ marginTop: 12, color: "green" }}>
                {status.success}
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}
