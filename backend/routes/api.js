const passport = require('passport');
const router = require('express-promise-router')();

const authController = require('../controllers/authController');

const locationsController = require('../controllers/locationsController');
const commentsController = require('../controllers/commentsController');

router.get('/comments/:to_user_id', passport.authenticate('jwt', { session: false }), commentsController.list);

router.get('/locations', passport.authenticate('jwt', { session: false }), locationsController.list);

router.post('/login', authController.login);
router.get('/logout', passport.authenticate('jwt', { session: false }), authController.logout);
router.get('/verification', authController.verify);

module.exports = router;
