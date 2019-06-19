const socketIO = require('socket.io');
const Comment = require('../models').comment;

const io = socketIO();

const comments = io.of('/comments');
comments.on('connection', (socket) => {
  socket.on('thread_join', (data) => {
    console.log(data);

    socket.join(data.thread_id);
  });

  socket.on('add_comment', async (data) => {
    const { user_id, thread_id, comment } = data;

    let createdComment;
    try {
      createdComment = await Comment.create({
        user_id,
        thread_id,
        comment
      });
    }
    catch (error) {
      console.log(error);
      comments.to(data.thread_id).emit('add_comment_client', { error });
      return;
    }
    comments.to(data.thread_id).emit('add_comment_client', { comment: createdComment });
  });

  socket.on('to_thread_broadcast', (data) => {
    console.log(data);

    socket.broadcast.to(data.thread_id).emit('to_thread_client', { value: data.value });
  });
});

module.exports = {
  io
};
