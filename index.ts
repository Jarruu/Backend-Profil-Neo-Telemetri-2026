import app from "./src/app.js";

const port = parseInt(process.env.PORT || "3000");

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
  console.log(`Documentation on http://localhost:${port}/api-docs`);
});
