const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");

const { User } = require("../models");

router.post("/signup", async (req, res, next) => {
  const { email, password, nickname } = req.body;

  try {
    const exUser = await User.findOne({
      where: {
        email,
      },
    });
    if (exUser) {
      return res.status(403).send("이미 사용중");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      email,
      nickname,
      password: hashedPassword,
    });
    res.status(200).send("ok");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).info(info.reason);
    }
    // server login success 후 passport 검사
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      return res.status(200).json();
    });
  })(req, res, next);
});

router.delete("/", (req, res) => {});

module.exports = router;
