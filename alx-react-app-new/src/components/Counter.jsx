import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "20px",
        margin: "20px auto",
        maxWidth: "300px",
        textAlign: "center",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h2>Counter</h2>
      <p style={{ fontSize: "20px", fontWeight: "bold" }}>
        Current Count: {count}
      </p>

      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <button onClick={() => setCount(count - 1)}>Decrement</button>
        <button onClick={() => setCount(0)}>Reset</button>
      </div>
    </div>
  );
}

export default Counter;
