import fetch from "node-fetch";
export async function fetchPosts() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=3"
  );
  return await res.json();
}
