const express = require("express");
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const app = express();
const passportConfig = require("./passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");

const db = require("./models");
const cors = require("cors");
db.sequelize
  .sync()
  .then(() => console.log("db 연결 성공"))
  .catch((err) => console.error(err));

// app.get("/", (req, res) => {
//   res.send("helloasd");
// });

passportConfig();

app.use(
  cors({
    origin: "http://localhost:3060",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/post", postRouter);
app.use("/user", userRouter);

app.listen(3065, () => {
  console.log("running");
});
