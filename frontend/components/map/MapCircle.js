import React, { Fragment, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Circle, InfoWindow } from '@react-google-maps/api';

import Thread from '../Thread';

const styles = () => ({

});

const MapCircle = (props) => {
  const [isThreadOpen, setThreadOpen] = useState(false);

  const {
    classes, postComment, threadJoin, threadLeave, comments
  } = props;

  const onClickThread = () => {
    threadJoin(4);
    setThreadOpen(true);
  };

  const onCloseThread = () => {
    threadLeave(4);
    setThreadOpen(false);
  };

  return (
    <Fragment>
      <Thread isOpen={isThreadOpen} onClose={onCloseThread} onSubmit={postComment} comments={comments} />
      <InfoWindow
      onLoad={(infoWindow) => {
        console.log('infoWindow: ', infoWindow);
      }}
      position={{ lat: 35.689487, lng: 139.691711 }}
    >
      <button onClick={onClickThread}>
        Thread
      </button>
    </InfoWindow>
      <Circle
        center={{
          lat: 35.689487,
          lng: 139.691711
        }}
        options={{
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
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
