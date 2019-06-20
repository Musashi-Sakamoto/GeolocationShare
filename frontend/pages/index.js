import React, { useEffect } from 'react';
import Router from 'next/router';
import io from 'socket.io-client';
import cookies from 'next-cookies';
import { withSnackbar } from 'notistack';
import { withStyles } from '@material-ui/core/styles';

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
  const { token, classes } = props;

  useEffect(() => {
    const comments = io('http://localhost:3000/comments', { query: `auth_token=${token}` });
    const locations = io('http://localhost:3000/locations', { query: `auth_token=${token}` });
    const threads = io('http://localhost:3000/threads', { query: `auth_token=${token}` });
    threads.emit('add_thread', { title: 'threaddddd', user_id: 4 });
    threads.on('add_thread_client', (data) => {
      console.log(data);
    });
    locations.emit('thread_join', { thread_id: 1 });
    locations.emit('upsert_location', {
      user_id: 4, thread_id: 1, latitude: 35.689487, longitude: 139.691711
    });
    locations.on('upsert_location_client', (data) => {
      console.log(data.location);
    });
    comments.emit('thread_join', { thread_id: 1 });
    comments.emit('add_comment', {
      comment: 'commmmmennnnnnnnt!', user_id: 4, thread_id: 1
    });
    comments.on('add_comment_client', (data) => {
      console.log(data.comment);
    });
  }, []);

  return (
    <div className={classes.root}>
      <Navbar isLoggedIn token={token} />
      <div className={classes.container}>Hello Next.js</div>
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
