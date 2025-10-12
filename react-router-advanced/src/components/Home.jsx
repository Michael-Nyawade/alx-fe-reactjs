// src/components/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Home() {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <div>
      <h1>Home Page</h1>
      <nav>
        <Link to="/about">About</Link> | <Link to="/profile">Profile</Link> |{" "}
        <Link to="/blog/1">Blog Post 1</Link>
      </nav>
      <div style={{ marginTop: "10px" }}>
        {isAuthenticated ? (
          <>
            <p>You are logged in.</p>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <p>You are logged out.</p>
            <button onClick={login}>Login</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
