const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');
const User = require('../models/user');


let mongoServer;
let Server;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe('Test the users endpoints', () => {
  test('It should create a new user', async () => {
    const response = await request(app)
      .post('/users')
      .send({ name: 'Barbara Millicent Roberts', email: 'Barbie123@example.com', password: 'password123' });

    expect(response.statusCode).toBe(200);
    expect(response.body.user.name).toEqual('Barbara Millicent Roberts');
    expect(response.body.user.email).toEqual('Barbie123@example.com');
    expect(response.body).toHaveProperty('token');
  });

  test('It should login a user', async () => {
    const user = new User({ name: 'Barbara Millicent Roberts', email: 'Barbie123@example.com', password: 'password123' });
    await user.save();

    const response = await request(app)
      .post('/users/login')
      .send({ email: 'Barbie123@example.com', password: 'password123' });

    expect(response.statusCode).toBe(200);
    expect(response.body.user.name).toEqual('Barbara Millicent Roberts');
    expect(response.body.user.email).toEqual('Barbie123@example.com');
    expect(response.body).toHaveProperty('token');
  });

  test('It should update a user', async () => {
    const user = new User({ name: 'Barbara Millicent Roberts', email: 'Barbie123@example.com', password: 'password123' });
    await user.save();
    const token = await user.generateAuthToken();

    const response = await request(app)
      .put(`/users/${user._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Updated Name', email: 'updated@example.com' });

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toEqual('Updated Name');
    expect(response.body.email).toEqual('updated@example.com');
  });

  test('GET request for a specific user by Id', async () => {
    const user = new User({ name: 'Barbara Millicent Roberts', email: 'Barbie123@example.com', password: 'password123' });
    await user.save();

    const response = await request(app)
      .get(`/users/${user._id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toEqual('Barbara Millicent Roberts');
    expect(response.body.email).toEqual('Barbie123@example.com');
  });

  test('It should delete a user', async () => {
    const user = new User({ name: 'Barbara Millicent Roberts', email: 'Barbie123@example.com', password: 'password123' });
    await user.save();
    const token = await user.generateAuthToken();

    const response = await request(app)
      .delete(`/users/${user._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toEqual('User deleted');
  });
});
