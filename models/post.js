moudule.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      // mb4 -> 이모지 허용
      charset: "utf8mb4",
      collate: "utf8_general_ci",
    }
  );
  Post.associate = (db) => {
    db.Post.belongsTo(db.User);
    db.Post.belongsToMany(db.Hashtag);
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image);
    db.Post.belongsToMany(db.User, { through: "Like", as: "Liked " });
    db.Post.belongsTo(db.Post, { as: "Retweet" });
  };
  return Post;
};
