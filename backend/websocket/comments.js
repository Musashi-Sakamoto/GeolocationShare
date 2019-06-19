const Comment = require('../models').comment;

module.exports = (io) => {
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
  });
};
