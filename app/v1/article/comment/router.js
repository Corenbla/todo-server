const router = require('express').Router();

const controller = require('./controller.js');
const auth = require.main.require('./helpers/auth.js');

// Express does not resolve params with use so we have to explicitly tell the full route here
const baseRoute = '/:articleId/comment';

router.get(`${baseRoute}/`, controller.getAll);
router.post(`${baseRoute}/`, auth, controller.createComment);

module.exports = router;
