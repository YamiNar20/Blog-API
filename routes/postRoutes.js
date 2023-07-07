//Setting up a web server using the Express.js framework

//We are importng a modlue called 'express' which provides tools to create a web serevr in Node.js
const express = require('express')

//We are importing a module that contains functions to handle post-related tasks.
const postController = require('../controllers/postController')

//We are creating a router object provided by Express.
const router = express.Router()

// Post request to create a new post
router.post('/', postController.createPost);

// Get request to get all posts
router.get('/', postController.getPosts);

// Get request to get a specific post ..with an /:id 
router.get('/:id', postController.getPost);

// Put request to get an update on a  specific post.. with an /:id
router.put('/:id', postController.updatePost);

// Delete request to delete a specific post.. with an /:id
router.delete('/:id', postController.deletePost);

module.exports = router;

//Summary : This code sets up the foundation for building a webserver , provides a router to handle diffrenet web requests, 
//and imports a module that specifies certain functions for handling post-related tasks.