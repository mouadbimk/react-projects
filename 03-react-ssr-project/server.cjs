import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import { fetchPosts } from "./src/api";
import App from "./src/App";
const app = express();
app.use(express.static("public"));
app.get("*", async (req, res) => {
  try {
    const posts = await fetchPosts();
    const appHtml = renderToString(<App posts={posts} />);

    const html = `<!DOCTYPE html><html lang="en">
     <head>
     <title>SSR React Example</title>
        </head>
        <body>
          <div id="root">${appHtml}</div>
          <script>
            window.__INITIAL_DATA__ = ${JSON.stringify(posts)};
          </script>
          <script src="/client.js" defer></script>
        </body></html>`;
    res.status(200).send(html);
  } catch (e) {
    console.log(e);
    res.send(500).send(e);
  }
});
app.listen(3300, () => console.log("Running on http://localhost:3300"));
