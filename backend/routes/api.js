const router = require('express-promise-router')();

const threadController = require('../controllers/threadsController');

router.get('/threads', threadController.list);

module.exports = router;
