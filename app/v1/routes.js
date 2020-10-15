const router = require('express').Router();

const article = require('./article/router.js');
const comment = require('./comment/router.js');
const user = require('./user/router.js');

router.use('/article', article);
router.use('/comment', comment);
router.use('/user', user);

module.exports = router;
