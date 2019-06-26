import React, { useState, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import { GoogleMap, LoadScriptNext, useGoogleMap } from '@react-google-maps/api';

import MapCircle from './MapCircle';
import Thread from '../Thread';

const styles = () => ({
  map: {
    marginTop: 100,
    margin: 'auto'
  }
});

const Map = (props) => {
  const {
    classes, locations, currentLocation, threadJoin, threadLeave
  } = props;

  const [isThreadOpen, setThreadOpen] = useState(false);
  const [chosenLocation, setChosenLocation] = useState(null);

  const onClickThread = user_id => () => {
    threadJoin(user_id);
    setChosenLocation(_.find(locations, ['user_id', user_id]));
    setThreadOpen(true);
  };

  const onCloseThread = user_id => () => {
    threadLeave(user_id);
    setChosenLocation(null);
    setThreadOpen(false);
  };

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
            {isThreadOpen && (<Thread isOpen={isThreadOpen} onClose={onCloseThread} location={chosenLocation} {...props} />)}
            {locations.map((location, i) => (
              <MapCircle useGoogleMap={useGoogleMap} key={i} location={location} onClickThread={onClickThread} isThreadOpen={isThreadOpen} {...props} />
            ))}
        </GoogleMap>
    </LoadScriptNext>

  );
};

export default withStyles(styles)(Map);
