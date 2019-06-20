import React, { useState } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';
import Router from 'next/router';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from 'next/link';

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  }
};

const Navbar = (props) => {
  const {
    classes, isLogin, isLoggedIn, token
  } = props;

  const [err, setError] = useState('');

  const onLogoutClicked = async () => {
    cookie.remove('token');
    Router.push('/login');
    try {
      await axios.get(`${process.env.BACKEND_URL}/logout`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    catch (error) {
      setError(error.response.data.error.message);
      return;
    }

    setError('');
  };

  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            GeoShare
          </Typography>
            {!isLoggedIn ? (
            <Link href={isLogin ? '/signup' : '/login'}>
                <Button color="inherit">
                    {isLogin ? 'Signup' : 'Login'}
                </Button>
            </Link>) : (
            <Button color="inherit" onClick={onLogoutClicked}>
                Logout
            </Button>)}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withStyles(styles)(Navbar);
