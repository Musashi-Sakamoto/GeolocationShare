const socketIO = require('socket.io');
const Comment = require('../models').comment;
const Location = require('../models').location;
const Thread = require('../models').thread;

const io = socketIO();

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

const locations = io.of('/locations');
locations.on('connection', (socket) => {
  socket.on('thread_join', (data) => {
    socket.join(data.thread_id);
  });

  socket.on('upsert_location', async (data) => {
    const {
      user_id, thread_id, longitude, latitude
    } = data;

    try {
      await Location.upsert({
        user_id,
        thread_id,
        longitude,
        latitude
      });
    }
    catch (error) {
      console.log(error);
      locations.to(data.thread_id).emit('upsert_location_client', { error });
      return;
    }
    locations.to(data.thread_id).emit('upsert_location_client', {
      location: {
        user_id,
        thread_id,
        longitude,
        latitude
      }
    });
  });
});


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

module.exports = {
  io
};
