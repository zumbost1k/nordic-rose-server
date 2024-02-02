const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Post = sequelize.define('post', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  text: { type: DataTypes.STRING(9999), allowNull: false },
  img: { type: DataTypes.STRING, allowNull: false },
  header: { type: DataTypes.STRING, unique: true, allowNull: false },
  createdAt: { type: DataTypes.STRING },
});

const Tag = sequelize.define('tag', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  text: { type: DataTypes.STRING, allowNull: false },
});

const Email = sequelize.define('email', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  text: { type: DataTypes.STRING, allowNull: false, unique: true },
});

const PostTag = sequelize.define('post_tag', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  postId: {
    type: DataTypes.INTEGER,
    references: {
      model: Post,
      key: 'id',
    },
  },
  tagId: {
    type: DataTypes.INTEGER,
    references: {
      model: Tag,
      key: 'id',
    },
  },
});

Post.belongsToMany(Tag, { through: PostTag, foreignKey: 'postId' });
Tag.belongsToMany(Post, { through: PostTag, foreignKey: 'tagId' });

module.exports = {
  Post,
  Tag,
  PostTag,
  Email,
};
