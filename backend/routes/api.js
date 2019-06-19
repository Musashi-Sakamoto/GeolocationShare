const router = require('express-promise-router')();

const threadsController = require('../controllers/threadsController');
const locationsController = require('../controllers/locationsController');

router.get('/threads', threadsController.list);

router.get('/locations', locationsController.list);

module.exports = router;
