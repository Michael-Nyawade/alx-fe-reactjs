// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <nav>
        <Link to="/about">About</Link> | <Link to="/profile">Profile</Link> |{" "}
        <Link to="/posts/1">Post 1</Link>
      </nav>
    </div>
  );
}

export default Home;
