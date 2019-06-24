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

describe('POST: /api/v1/login', () => {
  test('success', async () => {
    jest.setTimeout(10000);

    try {
      const res = await loginUser('username1', 'password');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('user');
      expect(res.body).toHaveProperty('token');
    }
    catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
      throw error;
    }
  });

  test('failure: wrong password', async () => {
    jest.setTimeout(10000);

    try {
      const res = await loginUser('username1', 'password-w');
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    }
    catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
      throw error;
    }
  });

  test('failure: user not verified', async () => {
    jest.setTimeout(10000);

    try {
      const res = await loginUser('username2', 'password');
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    }
    catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
      throw error;
    }
  });

  test('failure: user not exists', async () => {
    jest.setTimeout(10000);

    try {
      const res = await loginUser('username-dummy', 'password');
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    }
    catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
      throw error;
    }
  });
});
