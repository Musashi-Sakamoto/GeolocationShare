import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
import Button from '@material-ui/core/Button';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import {
  List, ListItem, ListItemText, TextField
} from '@material-ui/core';

const styles = theme => ({
  container: {
    display: 'flex',
    marginTop: 64,
    paddingTop: 100
  },
  formContainer: {
    margin: 'auto'
  },
  TextField: {
    display: 'block'
  },
  button: {
    marginTop: 20
  },
  input: {
    display: 'none'
  },
  previewImage: {
    maxWidth: 552,
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  }
});

const Thread = ({
  classes, onSubmit, isOpen, onClose, enqueueSnackbar, comments
}) => {
  const [title, setTitle] = useState('');

  const onSubmitClicked = () => {
    if (title.trim().length === 0) {
      enqueueSnackbar('title or description should not be blank', { variant: 'error' });
      return;
    }
    onSubmit(title, 1);
    setTitle('');
  };

  return (
    <div>
        <Dialog
            open={isOpen}
            onClose={onClose}
            aria-labelledby="form-dialog-title"
            >
            <DialogTitle id="form-dialog-title">Thread 1</DialogTitle>
            <DialogContent>
                <List>
                    {comments.map((data, i) => (
                        <ListItem key={i}>
                        <ListItemText primary={data.comment}/>
                    </ListItem>
                    ))}
                </List>
                <TextField
                value={title}
                onChange={e => setTitle(e.target.value)}
                autoFocus
                margin="dense"
                id="title"
                label="title"
                type="text"
                fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onSubmitClicked} color="primary">
                    Submit
                </Button>
          </DialogActions>
        </Dialog>
    </div>
  );
};

export default withSnackbar(withStyles(styles)(withWidth()(Thread)));
