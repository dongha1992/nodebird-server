moudule.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "Image",
    {
      src: { type: DataTypes.STRING(200), allowNull: false },
    },
    {
      // mb4 -> 이모지 허용
      charset: "utf8m",
      collate: "utf8_general_ci",
    }
  );
  Image.associate = (db) => {
    db.Image.belongsTo(db.Post);
  };
  return Image;
};
