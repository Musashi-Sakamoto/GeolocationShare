const socketIO = require('socket.io');

const io = socketIO();

const comments = io.of('/comments');
comments.on('connection', (socket) => {
  socket.on('thread_join', (data) => {
    console.log(data);

    socket.join(data.threadName);
  });

  socket.on('to_thread', (data) => {
    console.log(data);

    comments.to(data.threadName).emit('to_thread_client', { value: data.value });
  });

  socket.on('to_thread_broadcast', (data) => {
    console.log(data);

    socket.broadcast.to(data.threadName).emit('to_thread_client', { value: data.value });
  });
});

module.exports = {
  io
};
