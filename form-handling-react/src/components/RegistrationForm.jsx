// src/components/RegistrationForm.jsx
import React, { useState } from "react";

export default function RegistrationForm() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  function validate(values) {
    const errs = {};
    if (!values.username.trim()) errs.username = "Username is required";
    if (!values.email.trim()) {
      errs.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      errs.email = "Email is invalid";
    }
    if (!values.password) {
      errs.password = "Password is required";
    } else if (values.password.length < 6) {
      errs.password = "Password must be at least 6 characters";
    }
    return errs;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // clear related error as user types
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors({});
    setMessage(null);

    try {
      // mock API endpoint — jsonplaceholder accepts POST and returns created resource
      const res = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password, // note: never send plaintext in real apps
        }),
      });

      if (!res.ok) throw new Error(`Server responded ${res.status}`);

      const data = await res.json();
      setMessage({
        type: "success",
        text: `User registered (id: ${data.id || "mocked"})`,
      });
      setForm({ username: "", email: "", password: "" });
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Registration failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 440, margin: "0 auto", padding: 20 }}>
      <h2>Registration (Controlled Components)</h2>

      <form onSubmit={handleSubmit} noValidate>
        <label style={{ display: "block", marginBottom: 8 }}>
          Username
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            style={{
              display: "block",
              width: "100%",
              padding: 8,
              marginTop: 6,
            }}
          />
          {errors.username && (
            <div style={{ color: "red", marginTop: 6 }}>{errors.username}</div>
          )}
        </label>

        <label style={{ display: "block", marginBottom: 8 }}>
          Email
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            style={{
              display: "block",
              width: "100%",
              padding: 8,
              marginTop: 6,
            }}
          />
          {errors.email && (
            <div style={{ color: "red", marginTop: 6 }}>{errors.email}</div>
          )}
        </label>

        <label style={{ display: "block", marginBottom: 8 }}>
          Password
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            type="password"
            style={{
              display: "block",
              width: "100%",
              padding: 8,
              marginTop: 6,
            }}
          />
          {errors.password && (
            <div style={{ color: "red", marginTop: 6 }}>{errors.password}</div>
          )}
        </label>

        <button
          type="submit"
          disabled={loading}
          style={{ padding: "8px 16px", marginTop: 12 }}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      {message && (
        <div
          style={{
            marginTop: 12,
            color: message.type === "error" ? "red" : "green",
          }}
        >
          {message.text}
        </div>
      )}
    </div>
  );
}
