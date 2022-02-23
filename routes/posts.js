const express = require("express");
const { Op } = require("sequelize");

const { Post, Image, User, Comment } = require("../models");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const where = {};

    // 인피니티 스크롤 할 때 lastId로 해야 함
    if ((parseInt(req.query.lastId), 10)) {
      where.id = {};
    }

    const posts = await Post.findAll({
      limit: 10,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
        },
        { model: Image },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["id", "nickname"],
            },
          ],
        },
      ],
    });

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
