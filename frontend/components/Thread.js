import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import withWidth from '@material-ui/core/withWidth';
import {
  TextField
} from '@material-ui/core';

import CommentList from './CommentList';

const styles = theme => ({
  paper: {
    height: 500,
    width: 600
  },
  textField: {
    width: '80%'
  }
});

const Thread = ({
  classes, isOpen, onClose, enqueueSnackbar, comments, location, postComment
}) => {
  const [title, setTitle] = useState('');

  const onSubmitClicked = () => {
    if (title.trim().length === 0) {
      enqueueSnackbar('title or description should not be blank', { variant: 'error' });
      return;
    }
    postComment(title, location.user.id);
    setTitle('');
  };

  return (
    <Dialog
        classes={{
          paper: classes.paper
        }}
        open={isOpen}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
        >
        <DialogTitle id="form-dialog-title">{location.user.username}</DialogTitle>
        <DialogContent>
            <CommentList comments={comments} />
        </DialogContent>
        <DialogActions>
        <TextField
            value={title}
            onChange={e => setTitle(e.target.value)}
            autoFocus
            margin="dense"
            id="title"
            label="title"
            type="text"
            fullWidth
            classes={{
              root: classes.textField
            }}
            />
            <Button onClick={onSubmitClicked} color="primary">
                Submit
            </Button>
        </DialogActions>
    </Dialog>
  );
};

export default withStyles(styles)(withWidth()(Thread));
