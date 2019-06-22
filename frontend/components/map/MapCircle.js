import React, { Fragment, useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Circle, InfoWindow, useGoogleMap } from '@react-google-maps/api';

import Thread from '../Thread';

const styles = () => ({

});

const MapCircle = (props) => {
  const [isThreadOpen, setThreadOpen] = useState(false);

  const {
    classes, postComment, threadJoin, threadLeave, comments, location, currentLocation
  } = props;

  const isMe = currentLocation.id === location.id;

  const onClickThread = () => {
    threadJoin(location.user.id);
    setThreadOpen(true);
  };

  const onCloseThread = () => {
    threadLeave(location.user.id);
    setThreadOpen(false);
  };

  const map = useGoogleMap();

  useEffect(() => {
    console.log(map);

    if (map) {
      map.panTo({
        lat: currentLocation.latitude,
        lng: currentLocation.longitude
      });
    }
  }, [map]);

  return (
    <Fragment>
      <Thread isOpen={isThreadOpen} onClose={onCloseThread} onSubmit={postComment} comments={comments} location={location} />
      <InfoWindow
      onLoad={(infoWindow) => {
        console.log('infoWindow: ', infoWindow);
      }}
      position={{ lat: location.latitude, lng: location.longitude }}
    >
      <Button color={isMe ? 'primary' : 'secondary'} variant={isMe ? 'contained' : 'outlined'} onClick={onClickThread}>
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

export default withStyles(styles)(MapCircle);
