import React, { useState } from "react";
import Home from "./Home";
export default function App({ posts }) {
  const [counter, setCounter] = useState(0);
  return (
    <>
      <div>
        <button onClick={() => setCounter((counter) => counter + 1)}>+</button>
        <span>{counter}</span>
      </div>
      <main style={{ textAlign: "center", marginTop: "2rem" }}>
        <h1>SSR React Example</h1>
        <Home posts={posts} />
      </main>
    </>
  );
}
