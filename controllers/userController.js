//It suggests that there is a file named user.js in the models folder, and this module is used to define the structure and behavior of a post object in the program.
const User = require('../models/user');

//Bcrypt is a library used for password hashing, which means it takes a password and converts it into a secure, irreversible format
// This module is used for password security purposes.
const bcrypt = require('bcrypt');

//Jsonwebtoken is a library used for generating and verifying JSON Web Tokens (JWT). 
const jwt = require('jsonwebtoken');


//This function is responsible for authenticating a user. It checks if the user has a valid authorization token in their request header.
// If the token is valid, it decodes the token and finds the corresponding user in the database. If the user is found, it attaches the user object to the req object for future use and calls the next() function to pass the control to the next middleware. 
//If the token is invalid or the user is not found, it sends a response with a status code of 401, indicating that the user is not authorized.
exports.auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const data = jwt.verify(token, 'secret');
    const user = await User.findOne({ _id: data._id });
    if (!user) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send('Not authorized');
  }
};

//This function retrieves a specific user from the database based on the provided user ID. 
//It gets the user ID from the request parameters, finds the corresponding user in the database using the User.findById() method, and sends the user as a response in JSON format. 
//If the user is not found, it sends a response with the status code 404 and a message saying "User not found".


exports.getUser = async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };  

  // This function is responsible for creating a new user.It takes the user data from the request body, creates a new User object using the data,
  // saves it in the database, generates an authentication token for the user, and sends a response with the newly created user object and the authentication token.
exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

////This function handles the login process for a user. It takes the user's email and password from the request body, finds the user with the matching email in the database using the User.findOne() method,
// and compares the provided password with the stored password (after hashing). If the email or password is invalid, it sends a response with the status code 400 and a message saying "Invalid login credentials". 
//If the login is successful, it generates an authentication token for the user and sends a response with the user object and the authentication token.

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      res.status(400).send('Invalid login credentials');
    } else {
      const token = await user.generateAuthToken();
      res.json({ user, token });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//This function is responsible for updating a user's information. It gets the updated user data from the request body, finds the user with the provided user ID using the User.findOne() method, 
//updates the user's information, saves the updated user in the database, and sends a response with the updated user object.

exports.updateUser = async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const user = await User.findOne({ _id: req.params.id });
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//This function deletes a specific user from the database. It uses the deleteOne() method on the user object attached to the request (req.user) to delete the user from the database.
//If it's successful it sends a response with a message saying "User deleted". If its not successful it sends a response with an error message.
exports.deleteUser = async (req, res) => {
  try {
    await req.user.deleteOne();
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

