import React, { useState } from 'react';
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
    classes, isLogin, isLoggedIn, onLogoutClick
  } = props;

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
            <Button color="inherit" onClick={onLogoutClick}>
                Logout
            </Button>)}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withStyles(styles)(Navbar);
