const request = require('supertest')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const app  = require('../../app')
const server = app.listen(8080, () => console.log('Testing on PORT 8080'))
const Post = require('../models/post')

let mongoServer

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create()
  await mongoose.connect(mongoServer.getUri(), { useNewUrlParser: true, useUnifiedTopology: true })
})

afterAll(async () => {
  await mongoose.connection.close()
  mongoServer.stop()
  server.close()
})

afterAll((done) => done())


  beforeEach(async () => {
    // Clear the posts collection before each test
    await Post.deleteMany({});
  });

  describe('POST /posts', () => {
    it('should create a new post', async () => {
      const postData = {
        user: 'user_id',
        title: 'Test Post',
        description: 'This is a test post'
      };

      const response = await request(app)
        .post('/posts')
        .send(postData)
        .expect(201);

      expect(response.body.title).toBe(postData.title);
      expect(response.body.description).toBe(postData.description);
    });

    it('should return an error if required fields are missing', async () => {
      const postData = {
        // Missing required fields: user, title, description
      };

      const response = await request(app)
        .post('/posts')
        .send(postData)
        .expect(400);

      expect(response.body.error).toBe('Missing required fields');
    });
  });

  describe('GET /posts/:postId', () => {
    it('should get a post by ID', async () => {
      const testPost = new Post({
        user: 'user_id',
        title: 'Test Post',
        description: 'This is a test post'
      });

      await testPost.save();

      const response = await request(app)
        .get(`/posts/${testPost._id}`)
        .expect(200);

      expect(response.body._id).toBe(testPost._id.toString());
      expect(response.body.title).toBe(testPost.title);
      expect(response.body.description).toBe(testPost.description);
    });

    it('should return an error if post not found', async () => {
      const nonExistingPostId = 'non_existing_id';

      const response = await request(app)
        .get(`/posts/${nonExistingPostId}`)
        .expect(404);

      expect(response.body.error).toBe('Post not found');
    });
  });

 
  test('DELETE /posts/:postId', () => {
    it('should delete a post by ID', async () => {
      // Create a test post
      const testPost = new Post({
        user: 'user_id',
        title: 'Test Post',
        description: 'This is a test post'
      });
      await testPost.save();

      // Send a delete request to delete the post
      const response = await request(app)
        .delete(`/posts/${testPost._id}`)
        .expect(200);

      expect(response.body.message).toBe('Post deleted successfully');

      // Check if the post was deleted from the database
      const deletedPost = await Post.findById(testPost._id);
      expect(deletedPost).toBeNull();
    });

    it('should return an error if post not found', async () => {
      const nonExistingPostId = 'non_existing_id';

      const response = await request(app)
        .delete(`/posts/${nonExistingPostId}`)
        .expect(404);

      expect(response.body.error).toBe('Post not found');
    });
  });
