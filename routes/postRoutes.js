const express = require('express')
const postController = require('../controllers/postController')
const router = express.Router()

// POST /posts - Create a new post
router.post('/', postController.createPost);

// GET /posts - Get all posts
router.get('/', postController.getPosts);

// GET /posts/:id - Get a specific post
router.get('/:id', postController.getPost);

// PUT /posts/:id - Update a specific post
router.put('/:id', postController.updatePost);

// DELETE /posts/:id - Delete a specific post
router.delete('/:id', postController.deletePost);

module.exports = router;
