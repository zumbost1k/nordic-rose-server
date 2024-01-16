const { v4 } = require('uuid');
const { Post, Tag, PostTag } = require('../models/models');
const path = require('path');
const { Op } = require('sequelize');

class PostController {
  async create(req, res) {
    try {
      const { text, tags, header } = req.body;
      const { img } = req.files;

      const candidat = await Post.findOne({ where: { header } });

      if (candidat) {
        return res.status(409).json({ message: 'this header already sented' });
      }

      let fileName = v4() + '.jpg';
      img.mv(path.resolve(__dirname, '..', 'static', fileName));
      const newPost = await Post.create({
        text,
        header,
        img: fileName,
        tag: [],
      });

      if (tags) {
        const parsedTags = JSON.parse(tags);
        for (const currentTagText of parsedTags) {
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
      return res.status(404).json({ message: 'post create error', error });
    }
  }
  async getAll(req, res) {
    try {
      let { tag } = req.query;
      let posts = [];
      if (!tag) {
        posts = await Post.findAll();
      } else {
        const currentTag = await Tag.findOne({ where: { text: tag } });

        const postsByTag = await PostTag.findAll({
          where: { tagId: currentTag.id },
        });

        const postsIds = postsByTag.map(
          (currentPostId) => currentPostId.postId
        );

        posts = await Post.findAll({
          where: {
            id: {
              [Op.in]: postsIds,
            },
          },
        });
      }

      return res.json(posts);
    } catch (error) {
      return res.status(404).json({ message: 'get all posts error' });
    }
  }
  async getOne(req, res) {
    try {
      const { id } = req.params;
      const post = await Post.findOne({ where: { id } });
      const tagIdsFromPostTag = await PostTag.findAll({
        where: { postId: post.id },
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
      post.dataValues.tags = tagsText;
      return res.json(post);
    } catch (error) {
      return res.status(404).json({ message: 'get one post error' });
    }
  }
}

module.exports = new PostController();
