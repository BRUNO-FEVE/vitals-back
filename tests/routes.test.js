const request = require('supertest');
const app = require('../src/server');
const dbHandler = require('./setup');
const UserRepository = require('../src/repositories/userRepository');
const UserEntity = require('../src/entities/userEntity');

const userRepo = new UserRepository();

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => {
  await dbHandler.connect();
});

/**
 * Clear all test data after every test.
 */
afterEach(async () => {
  await dbHandler.clearDatabase();
});

/**
 * Remove and close the db and server.
 */
afterAll(async () => {
  await dbHandler.closeDatabase();
});

/**
 * User API endpoint tests
 */
describe('User API', () => {
  /**
   * Test for GET /api/users
   */
  it('should get all users', async () => {
    // Create test users
    const user1 = new UserEntity({
      name: 'Test User 1',
      email: 'test1@example.com'
    });
    const user2 = new UserEntity({
      name: 'Test User 2',
      email: 'test2@example.com'
    });
    
    await userRepo.createUser(user1);
    await userRepo.createUser(user2);
    
    // Make request
    const res = await request(app).get('/api/users');
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toEqual(2);
  });

  /**
   * Test for POST /api/users
   */
  it('should create a new user', async () => {
    const userData = {
      name: 'New User',
      email: 'newuser@example.com',
      role: 'user'
    };
    
    // Make request
    const res = await request(app)
      .post('/api/users')
      .send(userData);
    
    expect(res.statusCode).toEqual(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.name).toEqual(userData.name);
    expect(res.body.data.email).toEqual(userData.email);
  });

  /**
   * Test for GET /api/users/:id
   */
  it('should get a user by id', async () => {
    // Create test user
    const user = new UserEntity({
      name: 'Test User',
      email: 'test@example.com'
    });
    
    const createdUser = await userRepo.createUser(user);
    
    // Make request
    const res = await request(app).get(`/api/users/${createdUser.id}`);
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.id).toEqual(createdUser.id.toString());
    expect(res.body.data.name).toEqual(createdUser.name);
  });

  /**
   * Test for PUT /api/users/:id
   */
  it('should update a user', async () => {
    // Create test user
    const user = new UserEntity({
      name: 'Test User',
      email: 'test@example.com'
    });
    
    const createdUser = await userRepo.createUser(user);
    
    const updateData = {
      name: 'Updated Name'
    };
    
    // Make request
    const res = await request(app)
      .put(`/api/users/${createdUser.id}`)
      .send(updateData);
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.name).toEqual(updateData.name);
    expect(res.body.data.email).toEqual(createdUser.email);
  });

  /**
   * Test for DELETE /api/users/:id
   */
  it('should delete a user', async () => {
    // Create test user
    const user = new UserEntity({
      name: 'Test User',
      email: 'test@example.com'
    });
    
    const createdUser = await userRepo.createUser(user);
    
    // Make request
    const res = await request(app).delete(`/api/users/${createdUser.id}`);
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    
    // Verify user was deleted
    const foundUser = await userRepo.findById(createdUser.id);
    expect(foundUser).toBeNull();
  });
});