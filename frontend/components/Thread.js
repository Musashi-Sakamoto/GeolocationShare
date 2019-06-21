import React, { useState, useEffect, Fragment } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
import Button from '@material-ui/core/Button';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import {
  List, ListItem, ListItemText, TextField, Divider
} from '@material-ui/core';

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
            classes={{
              paper: classes.paper
            }}
            open={isOpen}
            onClose={onClose}
            aria-labelledby="form-dialog-title"
            >
            <DialogTitle id="form-dialog-title">Thread 1</DialogTitle>
            <DialogContent>
                <List >
                    {comments.map((data, i) => (
                        <Fragment key={i}>
                            <ListItem>
                                <ListItemText primary={data.comment}/>
                            </ListItem>
                            <Divider variant="fullWidth" component="li" />
                        </Fragment>
                    ))}
                </List>
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
    </div>
  );
};

export default withSnackbar(withStyles(styles)(withWidth()(Thread)));
