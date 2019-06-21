const Location = require('../models').location;
const User = require('../models').user;

module.exports = (io) => {
  const locations = io.of('/locations');
  locations.on('connection', (socket) => {
    socket.on('get_current_location', async () => {
      let currentLocation;
      try {
        currentLocation = await Location.findOne({
          where: {
            user_id: socket.request.user.id
          },
          include: [{
            model: User
          }]
        });
      }
      catch (error) {
        socket.emit('get_current_location_client_error', { error });
        return;
      }
      socket.emit('get_current_location_client', {
        current_location: currentLocation
      });
    });

    socket.on('get_locations', async () => {
      let retrievedLocations;
      try {
        retrievedLocations = await Location.findAll({
          include: [{
            model: User
          }]
        });
      }
      catch (error) {
        socket.emit('get_locations_client_error', { error });
        return;
      }
      socket.emit('get_locations_client', {
        locations: retrievedLocations
      });
    });

    socket.on('upsert_location', async (data) => {
      const {
        longitude, latitude
      } = data;

      try {
        await Location.upsert({
          user_id: socket.request.user.id,
          longitude,
          latitude
        });
      }
      catch (error) {
        console.log(error);
        locations.emit('upsert_location_client_error', { error });
        return;
      }
      locations.emit('upsert_location_client', {
        location: {
          user_id: socket.request.user.id,
          longitude,
          latitude
        }
      });
    });
  });
};
