// src/pages/Post.jsx
import React from "react";
import { useParams } from "react-router-dom";

function Post() {
  const { id } = useParams();
  return (
    <div>
      <h1>Viewing Post #{id}</h1>
      <p>This is the content for post {id}.</p>
    </div>
  );
}

export default Post;
