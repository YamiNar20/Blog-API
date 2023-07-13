const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');
const Post = require('../models/post');

let mongoServer;
let Server;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
  Server = app.listen(8080, () => {
    console.log('Testing on PORT 8080');
  });
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
  Server.close();
});

describe('Test the post endpoints', () => {
  test('It should create a new post', async () => {
    const postData = {
      title: 'Test Post',
      content: 'This is a test post',
    };

    const response = await request(app)
      .post('/posts')
      .send(postData)
      .expect(201);

    const createdPost = await Post.findById(response.body._id);
    expect(createdPost.title).toBe(postData.title);
    expect(createdPost.content).toBe(postData.content);
  });
});
test('Get request to get all posts', async () => {
  const postData = {
    title: 'Test Post',
    content: 'This is a test post',
  };

  const response = await request(app)
    .post('/posts')
    .send(postData)
    .expect(201);

  const createdPost = await Post.findById(response.body._id);
  expect(createdPost.title).toBe(postData.title);
  expect(createdPost.content).toBe(postData.content);
});

test('PUT request to update a specific post', async () => {
  // Create a new post
  const newPostData = {
    title: 'Test Post',
    content: 'This is a test post',
  };

  const createResponse = await request(app)
    .post('/posts')
    .send(newPostData)
    .expect(201);

  const postId = createResponse.body._id;
// Update the post
const updateData = {
  title: 'Updated Post',
  content: 'This post has been updated',
};

const updateResponse = await request(app)
  .put(`/posts/${postId}`)
  .send(updateData)
  .expect(200);


const updatedPost = await Post.findById(postId);

expect(updatedPost.title).toBe(updateData.title);
expect(updatedPost.content).toBe(updateData.content);
});

test('DELETE request to delete a specific post', async () => {
  // Create a new post
  const newPostData = {
    title: 'Test Post',
    content: 'This is a test post',
  };

  const createResponse = await request(app)
    .post('/posts')
    .send(newPostData)
    .expect(201);

  const postId = createResponse.body._id;

  // Delete the post
  await request(app)
    .delete(`/posts/${postId}`)
    .expect(200);

  // Verify the post is deleted
  const deletedPost = await Post.findById(postId);
  expect(deletedPost).toBeNull();
});


