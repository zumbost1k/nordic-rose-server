const { v4 } = require('uuid');
const { Post, Tag, PostTag } = require('../models/models');
const path = require('path');

class PostController {
  async create(req, res) {
    try {
      const { text, tags, header } = req.body;
      const { img } = req.files;

      let fileName = v4() + '.jpg';
      img.mv(path.resolve(__dirname, '..', 'static', fileName));
      const newPost = await Post.create({ text, header, img: fileName });

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
      //   //get all types from bd
      //   const types = await Type.findAll();
      //   //return types with the res
      return res.json({ message: 'hello world' });
    } catch (error) {
      return res.status(404).json({ message: 'get all posts error' });
    }
  }
}

module.exports = new PostController();
