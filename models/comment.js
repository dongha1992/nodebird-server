moudule.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      content: { type: DataTypes.TEXT, allowNull: false },
    },
    {
      // mb4 -> 이모지 허용
      charset: "utf8mb4",
      collate: "utf8_general_ci",
    }
  );
  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post);
  };
  return Comment;
};
