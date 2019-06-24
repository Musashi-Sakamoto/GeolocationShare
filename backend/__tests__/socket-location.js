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


describe('locations', () => {
  let locations;
  let loggedinUser;
  beforeAll(async () => {
    jest.setTimeout(10000);
    try {
      const res = await loginUser('username1', 'password');
      loggedinUser = res.body.user;
      locations = io('http://localhost:3000/locations', { query: `auth_token=${res.body.token}` });
    }
    catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
      throw error;
    }
  });

  afterAll(() => {
    locations.close();
  });

  test('SUCCESS get_locations', (done) => {
    locations.emit('get_locations', (data) => {
      expect(data.locations.length).toBeGreaterThanOrEqual(0);
      expect(data.error).toBeUndefined();
      done();
    });
  });

  test('SUCCESS get_current_location', (done) => {
    locations.emit('get_current_location', (data) => {
      expect(data.current_location).toBeDefined();
      expect(data.error).toBeUndefined();
      done();
    });
  });

  test('SUCCESS upsert_location', (done) => {
    locations.emit('upsert_location', { latitude: 35.689483, longitude: 139.691709 }, (data) => {
      expect(data.location).toBeDefined();
      expect(data.error).toBeUndefined();
      done();
    });
  });

  test('ERROR upsert_location', (done) => {
    locations.emit('upsert_location', { latitude: 'a', longitude: 'b' }, (data) => {
      expect(data.error).toBeDefined();
      done();
    });
  });
});
