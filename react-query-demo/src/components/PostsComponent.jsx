// src/components/PostsComponent.jsx
import React from "react";
import { useQuery } from "react-query";

function PostsComponent() {
  // Function to fetch posts
  const fetchPosts = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!res.ok) throw new Error("Network response was not ok");
    return res.json();
  };

  // useQuery with configuration options for caching and refetching
  const {
    data: posts,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery("posts", fetchPosts, {
    cacheTime: 1000 * 60 * 5, // 5 minutes cache
    staleTime: 1000 * 60 * 1, // 1 minute before refetching
    refetchOnWindowFocus: false, // Don't refetch when window refocuses
    keepPreviousData: true, // Keep old data while fetching new
  });

  if (isLoading) return <p>Loading posts...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Posts</h2>
      <button onClick={() => refetch()}>Refetch Posts</button>
      <ul>
        {posts.slice(0, 10).map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostsComponent;
