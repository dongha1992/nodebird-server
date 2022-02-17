moudule.exports = (sequelize, DataTypes) => {
  const Hashtag = sequelize.define(
    "Hashtag",
    {
      name: { type: DataTypes.STRING(20), allowNull: false },
    },
    {
      // mb4 -> 이모지 허용
      charset: "utf8mb4",
      collate: "utf8_general_ci",
    }
  );
  Hashtag.associate = (db) => {
    db.Hashtag.belongsToMany(db.Post);
  };
  return Hashtag;
};
