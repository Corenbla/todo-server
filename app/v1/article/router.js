const router = require('express').Router();

const auth = require.main.require('./helpers/auth.js');
const controller = require('./controller.js');
const commentRouter = require('./comment/router');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', auth, controller.createArticle);
router.put('/:id', auth, controller.updateArticle);
router.delete('/:id', auth, controller.deleteArticle);
router.use(commentRouter);

module.exports = router;
