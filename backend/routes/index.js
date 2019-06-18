var express = require('express');

var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  const { io } = res;
  io.emit('socketToMe', 'socket!!');
});

module.exports = router;
