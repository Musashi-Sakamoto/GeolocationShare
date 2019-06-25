const io = require('socket.io-client');
const supertest = require('supertest');

const request = supertest('http://localhost:3000');

const loginUser = async (username, password) => {
  try {
    const res = await request
      .post('/api/v1/login')
      .send({
        username,
        password
      });
    return res;
  }
  catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
    throw error;
  }
};


describe('comments', () => {
  let comments;
  let loggedinUser;
  beforeAll(async () => {
    jest.setTimeout(10000);
    try {
      const res = await loginUser('username1', 'password');
      loggedinUser = res.body.user;
      comments = io('http://localhost:3000/comments', { query: `auth_token=${res.body.token}` });
    }
    catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
      throw error;
    }
  });

  afterAll(() => {
    comments.close();
  });

  test('SUCCESS thread_join', (done) => {
    comments.emit('thread_join', { to_user_id: loggedinUser.id }, (to_user_id) => {
      expect(to_user_id).toBe(loggedinUser.id);
      done();
    });
  });

  test('SUCCESS get_comments', (done) => {
    comments.emit('get_comments', { to_user_id: loggedinUser.id }, (data) => {
      expect(data.comments.length).toBeGreaterThanOrEqual(0);
      expect(data.error).toBeUndefined();
    });
    comments.on('get_comments_client', (data) => {
      expect(data.comments.length).toBeGreaterThanOrEqual(0);
      done();
    });
  });

  test('SUCCESS add_comment', (done) => {
    const createdComment = 'Comment Created!';
    comments.emit('add_comment', { comment: createdComment, to_user_id: loggedinUser.id }, (data) => {
      expect(data.comment.comment).toBe(createdComment);
      expect(data.error).toBeUndefined();
    });
    comments.on('add_comment_client', (data) => {
      expect(data.comment).toBeDefined();
      done();
    });
  });

  test('ERROR get_comments', (done) => {
    comments.emit('get_comments', {}, (data) => {
      expect(data.error).toBeDefined();
      done();
    });
  });

  test('ERROR add_comment', (done) => {
    comments.emit('add_comment', {}, (data) => {
      expect(data.error).toBeDefined();
      done();
    });
  });

  test('SUCCESS success thread_leave', (done) => {
    comments.emit('thread_leave', { to_user_id: loggedinUser.id }, (to_user_id) => {
      expect(to_user_id).toBe(loggedinUser.id);
      done();
    });
  });
});
