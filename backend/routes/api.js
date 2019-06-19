const router = require('express-promise-router')();

const threadsController = require('../controllers/threadsController');
const locationsController = require('../controllers/locationsController');
const commentsController = require('../controllers/commentsController');

router.get('/threads', threadsController.list);

router.get('/comments/:thread_id', commentsController.list);

router.get('/locations', locationsController.list);

module.exports = router;
