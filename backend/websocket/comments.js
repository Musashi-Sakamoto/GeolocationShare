const Comment = require('../models').comment;
const User = require('../models').user;

module.exports = (io) => {
  const comments = io.of('/comments');
  comments.on('connection', (socket) => {
    socket.on('thread_join', (data, callback) => {
      console.log('join');
      socket.join(data.to_user_id);
      callback();
    });

    socket.on('thread_leave', (data) => {
      console.log('leave');
      socket.leave(data.to_user_id);
    });

    socket.on('get_comments', async (data) => {
      const { to_user_id } = data;

      let retrievedComments;
      try {
        retrievedComments = await Comment.findAll({
          where: {
            to_user_id
          },
          order: [
            ['createdAt', 'DESC']
          ],
          limit: 10,
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
      console.log(retrievedComments);

      socket.emit('get_comments_client', { comments: retrievedComments });
    });


    socket.on('add_comment', async (data) => {
      console.log(`login user id: ${socket.request.user.id}`);

      const { to_user_id, comment } = data;

      let createdComment;
      try {
        createdComment = await Comment.create({
          user_id: socket.request.user.id,
          to_user_id,
          comment
        });
      }
      catch (error) {
        console.log(error);
        comments.to(to_user_id).emit('add_comment_client_error', { error });
        return;
      }
      console.log(`createdComment: ${createdComment.to_user_id}`);

      comments.to(createdComment.to_user_id).emit('add_comment_client', { comment: createdComment });
    });
  });
};
