const Location = require('../models').location;

module.exports = (io) => {
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
};