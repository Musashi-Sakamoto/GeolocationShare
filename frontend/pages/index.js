import React, { useEffect, useContext } from 'react';
import Router from 'next/router';
import io from 'socket.io-client';
import cookies from 'next-cookies';
import { withSnackbar } from 'notistack';
import { withStyles } from '@material-ui/core/styles';

import { Store } from '../utils/Store';
import Map from '../components/map/Map';
import Navbar from '../components/Navbar';

const styles = theme => ({
  root: {
    position: 'relative'
  },
  container: {
    marginTop: 64
  }
});


const Index = (props) => {
  const {
    token, classes
  } = props;

  const { state, dispatch } = useContext(Store);
  const comments = io('http://localhost:3000/comments', { query: `auth_token=${token}` });
  const locations = io('http://localhost:3000/locations', { query: `auth_token=${token}` });

  const postComment = (comment, to_user_id) => {
    comments.emit('add_comment', {
      comment, to_user_id
    });
    comments.on('add_comment_client', (data) => {
      comments.emit('get_comments', {
        to_user_id: data.comment.to_user_id
      });
    });
    comments.on('get_comments_client', (data) => {
      dispatch({
        type: 'FETCH_COMMENTS',
        payload: data
      });
    });
  };

  const threadJoin = (to_user_id) => {
    console.log(`to_user_id: ${to_user_id}`);
    comments.emit('thread_join', { to_user_id }, () => {
      comments.emit('get_comments', {
        to_user_id
      });
    });
    comments.on('get_comments_client', (data) => {
      dispatch({
        type: 'FETCH_COMMENTS',
        payload: data
      });
    });
  };

  const threadLeave = (to_user_id) => {
    comments.emit('thread_leave', { to_user_id });
  };

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition((position) => {
      locations.emit('upsert_location', {
        latitude: position.coords.latitude, longitude: position.coords.longitude
      });
    });
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(`position: ${JSON.stringify(position.coords.latitude)}`);
      locations.emit('upsert_location', {
        latitude: position.coords.latitude, longitude: position.coords.longitude
      });
    });

    locations.emit('get_current_location');
    locations.on('get_current_location_client', (data) => {
      console.log(`current_location: ${data.current_location.user.id}`);
      dispatch({
        type: 'FETCH_CURRENT_LOCATION',
        payload: data
      });
    });
    locations.emit('get_locations');
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
    return () => {
      locations.close();
      comments.close();
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return (
    <div className={classes.root}>
      <Navbar isLoggedIn token={token} />
      <div className={classes.container}>
        <Map postComment={postComment} threadJoin={threadJoin} threadLeave={threadLeave} comments={state.comments} locations={state.locations} currentLocation={state.currentLocation}/>
      </div>
    </div>
  );
};

Index.getInitialProps = (ctx) => {
  const { token } = cookies(ctx);
  if (ctx.req && !token) {
    ctx.res.writeHead(302, {
      Location: '/login'
    });
    ctx.res.end();
    return {};
  }
  if (!token) {
    Router.push('/login');
    return {};
  }
  return { token };
};

export default withSnackbar(withStyles(styles)(Index));
