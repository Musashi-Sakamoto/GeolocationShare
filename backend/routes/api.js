const passport = require('passport');
const router = require('express-promise-router')();

const authController = require('../controllers/authController');

const threadsController = require('../controllers/threadsController');
const locationsController = require('../controllers/locationsController');
const commentsController = require('../controllers/commentsController');

router.get('/threads', threadsController.list);

router.get('/comments/:thread_id', commentsController.list);

router.get('/locations', locationsController.list);

router.post('/login', authController.login);
router.get('/logout', passport.authenticate('jwt', { session: false }), authController.logout);
router.get('/verification', authController.verify);

module.exports = router;
