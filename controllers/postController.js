//It suggests that there is a file named post.js in the models folder, and this module is used to define the structure and behavior of a post object in the program.
const Post = require('../models/post');

//Bcrypt is a library used for password hashing, which means it takes a password and converts it into a secure, irreversible format
// This module is used for password security purposes.
const bcrypt = require('bcrypt');

//Jsonwebtoken is a library used for generating and verifying JSON Web Tokens (JWT). 
const jwt = require('jsonwebtoken');

//module.exports line allows other parts of the program to access and use these functionalities
module.exports = {

  // Create a new post object using the Post model, and saves it in the database. 
  //If the post is saved successfully, it sends a response with the status code 201 (indicating successful creation) and the created post as a JSON object. 
  //If there is an error during the process, it sends a response with the status code 500 and an error message.

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
  
  // Get all posts retrieves all the posts from the database. It fetches all the posts using the Post.find() method and sends them as a response in JSON format.
  // If there is an error during the retrieval process, it sends a response with the status code 500 and an error message.
  getPosts: async (req, res) => {
    try {
      const posts = await Post.find();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve posts' });
    }
  },
  
  // Get a specific post from the database based on the provided post ID. It gets the post ID from the request parameters, looks for the corresponding post using the Post.findById() method, and if found, sends the post as a response in JSON format.
  // If the post is not found, it sends a response with the status code 404 (indicating the post was not found) and an error message. 
  //If there is an error during the retrieval process, it sends a response with the status code 500 and an error message.

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
  
  // Update a specific post in the database with new values. It gets the post ID from the request parameters and the updated title and content from the request body. 
  //It uses the Post.findByIdAndUpdate() method to find the post by its ID, updates its title and content, and returns the updated post. If the post is not found, it sends a response with the status code 404 and an error message.
  // If there is an error during the update process, it sends a response with the status code 500 and an error message.
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
  
  // Delete a specific post from the database. It gets the post ID from the request parameters, uses the Post.findByIdAndDelete() method to find and delete the post, and sends a response with a success message. 
  //If the post is not found, it sends a response with the status code 404 and an error message. If there is an error it sends a response with the status code 500 and an error message.
//These functions allow the server to handle different operations related to posts, such as creating, retrieving, updating, and deleting them in the database.
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
