import React, { useEffect } from 'react';
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
    classes, locations, currentLocation
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
              lat: currentLocation.latitude,
              lng: currentLocation.longitude
            }}>
              {locations.map((location, i) => (
                <MapCircle key={i} location={location} {...props} />
              ))}
        </GoogleMap>
    </LoadScriptNext>

  );
};

export default withStyles(styles)(Map);
