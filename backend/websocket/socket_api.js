const socketIO = require('socket.io');

const io = socketIO();

const comments = io.of('/comments');
comments.on('connection', (socket) => {
  var threadName = '';

  socket.on('thread_join', (data) => {
    console.log(data);

    threadName = data.value;
    socket.join(threadName);
  });

  socket.on('to_thread', (data) => {
    console.log(data);

    comments.to(threadName).emit('to_thread_client', { value: data.value });
  });

  socket.on('to_thread_broadcast', (data) => {
    console.log(data);

    socket.broadcast.to(threadName).emit('to_thread_client', { value: data.value });
  });
});

module.exports = {
  io
};
