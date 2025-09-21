import { useState } from "react";
import SearchBar from "./components/SearchBar";

function App() {
  const [user, setUser] = useState(null);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>GitHub User Search</h1>
      <SearchBar setUser={setUser} />
      {user && (
        <div style={{ marginTop: "2rem" }}>
          <img src={user.avatar_url} alt={user.login} width={100} />
          <h2>{user.login}</h2>
          <a href={user.html_url} target="_blank" rel="noreferrer">
            View Profile
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
