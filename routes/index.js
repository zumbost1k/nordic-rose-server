const Router = require('express');
const router = new Router();
const postRouter = require('./postRouter');

router.use('/post', postRouter);

module.exports = router;