import io from 'socket.io-client';

const LocationsSocketAPI = (token, dispatch) => {
  const locations = io('http://localhost:3000/locations', { query: `auth_token=${token}` });

  locations.on('get_current_location_client', (data) => {
    console.log(`current_location: ${data.current_location.user.id}`);
    dispatch({
      type: 'FETCH_CURRENT_LOCATION',
      payload: data
    });
  });

  locations.on('get_locations_client', (data) => {
    console.log(`locations: ${data.locations}`);

    dispatch({
      type: 'FETCH_LOCATIONS',
      payload: data
    });
  });

  locations.on('upsert_location_client', (data) => {
    locations.emit('get_current_location');
    locations.emit('get_locations');
  });

  return locations;
};

export default LocationsSocketAPI;
