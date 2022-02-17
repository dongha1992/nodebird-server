const express = require("express");
const postRouter = require("./routes/post");
const app = express();
const db = require("./models");

db.sequelize
  .sync()
  .then(() => console.log("db 연결 성공"))
  .catch((err) => console.error(err));
app.get("/", (req, res) => {
  res.send("helloasd");
});

app.use("/post", postRouter);

app.listen(8080, () => {
  console.log("running");
});
