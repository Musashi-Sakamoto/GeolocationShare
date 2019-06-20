const Location = require('../models').location;

module.exports = (io) => {
  const locations = io.of('/locations');
  locations.on('connection', (socket) => {
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
        locations.emit('upsert_location_client', { error });
        return;
      }
      locations.emit('upsert_location_client', {
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
