import { useState } from "react";
import { searchUser } from "../services/githubApi";

function SearchBar({ setUser }) {
  const [username, setUsername] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!username) return;

    try {
      const data = await searchUser(username);
      setUser(data);
    } catch (error) {
      alert("User not found!");
      setUser(null);
    }
  };

  return (
    <form onSubmit={handleSearch} style={{ marginTop: "1rem" }}>
      <input
        type="text"
        placeholder="Enter GitHub username..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ padding: "0.5rem", width: "250px" }}
      />
      <button
        type="submit"
        style={{ marginLeft: "0.5rem", padding: "0.5rem 1rem" }}
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
