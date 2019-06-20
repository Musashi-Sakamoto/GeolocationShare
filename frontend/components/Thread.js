import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
import Button from '@material-ui/core/Button';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';

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
  classes, onSubmit, isOpen, onClose, editedPost, width
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');


  useEffect(() => {
    setTitle(editedPost ? editedPost.title : '');
    setDescription(editedPost ? editedPost.description : '');
  }, [editedPost]);

  return (
    <div>
        <Dialog
            open={isOpen}
            onClose={onClose}
            aria-labelledby="form-dialog-title"
            >
            <DialogTitle id="form-dialog-title">{editedPost !== null ? 'Edit' : 'Post'}</DialogTitle>
            <DialogContent>
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
            <TextField
            value={description}
            onChange={e => setDescription(e.target.value)}
              autoFocus
              margin="dense"
              id="description"
              label="description"
              type="text"
              multiline={true}
              rows={isWidthDown('sm', width) ? 2 : 5}
              fullWidth
            />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
          </DialogActions>
        </Dialog>
    </div>
  );
};

export default withSnackbar(withStyles(styles)(withWidth()(Thread)));
