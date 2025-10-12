import React, { useState } from "react";

export default function RegistrationForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!username.trim()) newErrors.username = "Username is required";
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors({});
    setMessage(null);

    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      if (!res.ok) throw new Error(`Server responded ${res.status}`);

      const data = await res.json();
      setMessage({
        type: "success",
        text: `User registered (id: ${data.id || "mocked"})`,
      });

      // clear form
      setUsername("");
      setEmail("");
      setPassword("");
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
            type="text"
            name="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setErrors((prev) => ({ ...prev, username: undefined }));
            }}
            style={{
              display: "block",
              width: "100%",
              padding: 8,
              marginTop: 6,
            }}
          />
          {errors.username && (
            <div style={{ color: "red" }}>{errors.username}</div>
          )}
        </label>

        <label style={{ display: "block", marginBottom: 8 }}>
          Email
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            style={{
              display: "block",
              width: "100%",
              padding: 8,
              marginTop: 6,
            }}
          />
          {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
        </label>

        <label style={{ display: "block", marginBottom: 8 }}>
          Password
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((prev) => ({ ...prev, password: undefined }));
            }}
            style={{
              display: "block",
              width: "100%",
              padding: 8,
              marginTop: 6,
            }}
          />
          {errors.password && (
            <div style={{ color: "red" }}>{errors.password}</div>
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
