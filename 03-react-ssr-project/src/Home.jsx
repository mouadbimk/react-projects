import React from "react";
export default function Home({ posts }) {
  if (!posts?.length) return <p>Loading posts...</p>;
  return (
    <section>
      <h2>Latest posts:</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {posts?.map((p) => (
          <li key={p.id}>
            <h3>{p.title}</h3>
            <p>{p.body}</p>
            <hr />
          </li>
        ))}
      </ul>
    </section>
  );
}
