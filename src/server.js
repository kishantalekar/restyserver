const app = require("./app");

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`PDF extract server running at http://localhost:${port}`);
});
