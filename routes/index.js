const Router = require('express');
const router = new Router();
const postRouter = require('./postRouter');
const emailRouter = require('./emailRouter');

router.use('/post', postRouter);
router.use('/email', emailRouter);

module.exports = router;
