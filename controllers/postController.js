const Post = require('../models/post');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  // Create a new post
  createPost: async (req, res) => {
    try {
      const { title, content } = req.body;
      const post = new Post({ title, content });
      await post.save();
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create a new post' });
    }
  },
  
  // Get all posts
  getPosts: async (req, res) => {
    try {
      const posts = await Post.find();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve posts' });
    }
  },
  
  // Get a specific post
  getPost: async (req, res) => {
    try {
      const postId = req.params.id;
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve the post' });
    }
  },
  
  // Update a specific post
  updatePost: async (req, res) => {
    try {
      const postId = req.params.id;
      const { title, content } = req.body;
      const post = await Post.findByIdAndUpdate(
        postId,
        { title, content },
        { new: true }
      );
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update the post' });
    }
  },
  
  // Delete a specific post
  deletePost: async (req, res) => {
    try {
      const postId = req.params.id;
      const post = await Post.findByIdAndDelete(postId);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.json({ message: 'Post deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete the post' });
    }
  }
};
