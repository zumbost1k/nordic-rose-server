const Router = require('express');
const router = new Router();
const controller = require('../controllers/postController');

router.post('/', controller.create);
router.get('/', controller.getAll);
router.get('/:id', controller.getOne);

module.exports = router;
