import React, { Fragment, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { Circle, InfoWindow } from '@react-google-maps/api';

const MapCircle = (props) => {
  const {
    location, currentLocation, onClickThread, useGoogleMap
  } = props;

  const isMe = currentLocation.id === location.id;
  const map = useGoogleMap();

  useEffect(() => {
    if (map) {
      map.panTo({
        lat: currentLocation.latitude,
        lng: currentLocation.longitude
      });
    }
  }, [map]);

  return (
    <Fragment>
      <InfoWindow
      onLoad={(infoWindow) => {
        console.log('infoWindow: ', infoWindow);
      }}
      position={{ lat: location.latitude, lng: location.longitude }}
    >
      <Button color={isMe ? 'primary' : 'secondary'} variant={isMe ? 'contained' : 'outlined'} onClick={onClickThread(location.user.id)}>
        {location.user.username}
      </Button>
    </InfoWindow>
      <Circle
        center={{
          lat: location.latitude,
          lng: location.longitude
        }}
        options={{
          strokeColor: isMe ? '#32CD32' : '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: isMe ? '#32CD32' : '#FF0000',
          fillOpacity: 0.35,
          clickable: false,
          draggable: false,
          editable: false,
          visible: true,
          radius: 3,
          zIndex: 1
        }}
    />
    </Fragment>
  );
};

export default MapCircle;
