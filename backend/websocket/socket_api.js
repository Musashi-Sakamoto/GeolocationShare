const socketIO = require('socket.io');
const jwtAuth = require('socketio-jwt-auth');
const createError = require('http-errors');
const Redis = require('ioredis');

const User = require('../models').user;

const redis = new Redis(
  process.env.REDIS_ENDPOINT
);

const io = socketIO();

io.use(jwtAuth.authenticate({
  secret: 'secret'
}, async (jwtPayload, done) => {
  if (jwtPayload && jwtPayload.id) {
    console.log(jwtPayload);

    let user;
    try {
      user = await User.findOne({
        where: {
          id: jwtPayload.id,
          username: jwtPayload.username
        }
      });
    }
    catch (error) {
      return done(new createError.InternalServerError('DB Error'));
    }
    if (!user) {
      return done(null, false, { message: 'User not found' });
    }
    const token = await redis.get(user.id);
    if (!token) {
      return done(null, false, { message: 'You are logged out' });
    }
    return done(null, user);
  }
  return done();
}));

require('./comments')(io);
require('./locations')(io);
require('./threads')(io);

module.exports = {
  io
};
