const router = require('express').Router();

const controller = require('./controller.js');
const auth = require.main.require('./helpers/auth.js');

router.delete(`/:id`, auth, controller.deleteComment);

module.exports = router;
