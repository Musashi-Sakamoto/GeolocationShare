import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Circle } from '@react-google-maps/api';

const styles = () => ({

});

const MapCircle = (props) => {
  const {
    classes
  } = props;

  return (
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
  );
};

export default withStyles(styles)(MapCircle);
