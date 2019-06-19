const Thread = require('../models').thread;

module.exports = (io) => {
  const threads = io.of('/threads');
  threads.on('connection', (socket) => {
    socket.on('add_thread', async (data) => {
      const { title, user_id } = data;

      let createdThread;
      try {
        createdThread = await Thread.create({
          title,
          user_id
        });
      }
      catch (error) {
        console.log(error);
        threads.emit('add_thread_client', { error });
        return;
      }
      socket.broadcast.emit('add_thread_client', { thread: createdThread, user_id });
    });
  });
};
