import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import {
  List, ListItem, ListItemText, Divider
} from '@material-ui/core';

const CommentList = (props) => {
  const {
    comments
  } = props;

  return (
    <List >
        {comments.map((data, i) => (
            <Fragment key={i}>
                <ListItem>
                    <ListItemText primary={data.comment} secondary={
                        <Fragment>
                            <Typography component="span" variant="body2" color="textPrimary">
                                {data.user.username}
                            </Typography>
                            {' '}{data.createdAt}
                        </Fragment>
                    }/>
                </ListItem>
                <Divider variant="fullWidth" component="li" />
            </Fragment>
        ))}
    </List>
  );
};

export default CommentList;
