const { v4 } = require('uuid');
const { Post, Tag, PostTag } = require('../models/models');
const path = require('path');
const { Op } = require('sequelize');

class PostController {
  async create(req, res) {
    try {
      const { text, tags, header } = req.body;
      const { img } = req.files;

      let fileName = v4() + '.jpg';
      img.mv(path.resolve(__dirname, '..', 'static', fileName));
      const newPost = await Post.create({
        text,
        header,
        img: fileName,
        tag: [],
      });

      if (tags) {
        for (const currentTagText of tags) {
          let candidateTag = await Tag.findOne({
            where: { text: currentTagText },
          });
          if (!candidateTag) {
            candidateTag = await Tag.create({ text: currentTagText });
          }
          await PostTag.create({
            postId: newPost.id,
            tagId: candidateTag.id,
          });
        }
      }

      //return in
      return res.json(newPost);
    } catch (error) {
      return res.status(404).json({ message: 'post create error' });
    }
  }
  async getAll(req, res) {
    try {
      let { tag } = req.query;
      let posts = [];

      if (!tag) {
        posts = await Post.findAll();
      }

      for (const currentPost of posts) {
        const tagIdsFromPostTag = await PostTag.findAll({
          where: { postId: currentPost.id },
        });

        const tagsIds = tagIdsFromPostTag.map(
          (currentTagId) => currentTagId.tagId
        );

        const tagsFoCurrentPost = await Tag.findAll({
          where: {
            id: {
              [Op.in]: tagsIds,
            },
          },
        });
        const tagsText = tagsFoCurrentPost.map(
          (currentTagId) => currentTagId.text
        );
        currentPost.dataValues.tags = tagsText;
      }
      return res.json(posts);
    } catch (error) {
      return res.status(404).json({ message: 'get all posts error' });
    }
  }
}

module.exports = new PostController();
