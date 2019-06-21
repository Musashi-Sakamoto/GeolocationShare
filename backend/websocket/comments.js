const Comment = require('../models').comment;
const User = require('../models').user;

module.exports = (io) => {
  const comments = io.of('/comments');
  comments.on('connection', (socket) => {
    socket.on('thread_join', (data) => {
      socket.join(data.thread_id);
    });

    socket.on('thread_leave', (data) => {
      console.log('leave');
      socket.leave(data.thread_id);
    });

    socket.on('get_comments', async (data) => {
      const { thread_id } = data;

      let retrievedComments;
      try {
        retrievedComments = await Comment.findAll({
          where: {
            thread_id
          },
          order: [
            ['createdAt', 'DESC']
          ],
          include: [{
            model: User
          }]
        });
      }
      catch (error) {
        console.log(error);
        socket.emit('get_comments_client_error', { error });
        return;
      }
      socket.emit('get_comments_client', { comments: retrievedComments });
    });


    socket.on('add_comment', async (data) => {
      const { thread_id, comment } = data;

      let createdComment;
      try {
        createdComment = await Comment.create({
          user_id: socket.request.user.id,
          thread_id,
          comment
        });
      }
      catch (error) {
        console.log(error);
        comments.to(data.thread_id).emit('add_comment_client_error', { error });
        return;
      }
      console.log(`createdComment: ${createdComment}`);

      comments.to(data.thread_id).emit('add_comment_client', { comment: createdComment });
    });
  });
};
