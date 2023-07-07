//Setting up a web server using the Express.js framework

//We are importng a modlue called 'express' which provides tools to create a web serevr in Node.js
const express = require('express')

//We are importing a module that contains functions to handle user-related tasks.
const userController = require('../controllers/userController')

//We are creating a router object provided by Express.
const router = express.Router()

//Get request to get a user by ID
router.get('/:id', userController.getUser)

//Post request to create a user
router.post('/', userController.createUser)

//Post request to login a user
router.post('/login', userController.loginUser)

//Put request to update user by ID
router.put('/:id', userController.updateUser)

//Delete request to delete user by ID
router.delete('/:id', userController.auth, userController.deleteUser)

module.exports = router
//Summary : This code sets up the foundation for building a webserver , provides a router to handle diffrenet web requests, 
//and imports a module that specifies certain functions for handling user-related tasks.