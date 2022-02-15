const express = require("express");
const postRouter = require("./routes/post");
const app = express();

app.get("/", (req, res) => {
  res.send("helloasd");
});

app.use("/post", postRouter);

app.listen(8080, () => {
  console.log("running");
});
