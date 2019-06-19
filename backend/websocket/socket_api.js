const socketIO = require('socket.io');

const io = socketIO();

require('./comments')(io);
require('./locations')(io);
require('./threads')(io);

module.exports = {
  io
};
