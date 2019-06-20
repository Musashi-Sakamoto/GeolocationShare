import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { GoogleMap, LoadScriptNext } from '@react-google-maps/api';

import MapCircle from './MapCircle';

const styles = () => ({
  map: {
    marginTop: 100,
    margin: 'auto'
  }
});

const Map = (props) => {
  const {
    classes
  } = props;

  return (
    <LoadScriptNext
        id="script-loader"
        googleMapsApiKey="AIzaSyBINH50APdvfKgr45-beNiIJyOJngeAuSY"
        googleMapsClientId
        >
        <GoogleMap
            id="google-map"
            mapContainerClassName={classes.map}
            mapContainerStyle={{
              height: 800,
              width: 1200
            }}
            zoom={20}
            center={{
              lat: 35.689487,
              lng: 139.691711
            }}>
          <MapCircle />
        </GoogleMap>
    </LoadScriptNext>

  );
};

export default withStyles(styles)(Map);
