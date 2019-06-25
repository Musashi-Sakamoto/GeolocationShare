import React, { useEffect, useContext, useRef } from 'react';
import Router from 'next/router';
import io from 'socket.io-client';
import cookies from 'next-cookies';
import { withSnackbar } from 'notistack';
import { withStyles } from '@material-ui/core/styles';

import { Store } from '../utils/Store';
import Map from '../components/map/Map';
import Navbar from '../components/Navbar';

import LocationsSocketAPI from '../utils/sockets/locations';
import CommentSocketAPI from '../utils/sockets/comments';

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
  const comments = useRef(CommentSocketAPI(token, dispatch));
  const locations = useRef(LocationsSocketAPI(token, dispatch));

  const postComment = (comment, to_user_id) => {
    comments.current.emit('add_comment', {
      comment, to_user_id
    }, () => {});
  };

  const threadJoin = (to_user_id) => {
    console.log(`to_user_id: ${to_user_id}`);
    comments.current.emit('thread_join', { to_user_id }, () => {
      comments.current.emit('get_comments', {
        to_user_id
      }, (data) => {
        console.log(`get_comments comments: ${data.comments}`);
      });
    });
  };

  const threadLeave = (to_user_id) => {
    comments.current.emit('thread_leave', { to_user_id }, (data) => {
      console.log(`thread_leave to_user_id: ${to_user_id}`);
    });
  };

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition((position) => {
      locations.current.emit('upsert_location', {
        latitude: position.coords.latitude, longitude: position.coords.longitude
      }, (data) => {});
    });

    locations.current.emit('get_current_location', (data) => {});
    locations.current.emit('get_locations', (data) => {});
    return () => {
      locations.current.close();
      comments.current.close();
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
