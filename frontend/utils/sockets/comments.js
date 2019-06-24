import io from 'socket.io-client';

const CommentsSocketAPI = (token, dispatch) => {
  const comments = io('http://localhost:3000/comments', { query: `auth_token=${token}` });

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

  return comments;
};

export default CommentsSocketAPI;
