// This line imports the Express.js module, which is a web application framework for Node.js.
const express = require('express');

//This line imports the Morgan module, which is a middleware that logs HTTP request details.
const morgan = require('morgan');

// This line imports the userRoutes module, which contains the routes and handlers for user-related functionality.
const userRoutes = require('./routes/userRoutes');

//This line imports the postRoutes module, which contains the routes and handlers for post-related functionality.
const postRoutes = require('./routes/postRoutes');

//This line creates an instance of the Express application, which will be used to define and handle routes.
const app = express();

//This line sets up middleware to parse incoming requests with JSON payloads, allowing the application to access request data in JSON format.
app.use(express.json());

//This line sets up the Morgan middleware to log HTTP request details, providing information about the incoming requests to the application's console.
app.use(morgan('combined'));

//This line sets up a route prefix '/users' and associates it with the userRoutes module. It means that any incoming requests with URLs starting with '/users' will be handled by the userRoutes module.
app.use('/users', userRoutes);

//This line sets up a route prefix '/posts' and associates it with the postRoutes module. It means that any incoming requests with URLs starting with '/posts' will be handled by the postRoutes module.
app.use('/posts', postRoutes);

//This line exports the Express application, making it available for other parts of the program to use. It allows the application to be started and run by executing this file.
module.exports = app;




