//Allows us to define data models and interact with the MongoDB database using JavaScript.
//These modules provide functionalities for working with MongoDB, encrypting passwords, and generating JSON Web Tokens (JWTs).


const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//We create a schema for the User model using mongoose.Schema. The schema defines the structure and properties of a user document in the MongoDB collection.
// It specifies that a user should have properties like name, email, password, and createdAt.

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

//This code adds a pre-save middleware to the user schema. The middleware is put into effect before saving a user document. 
//It checks if the user's password has been modified and, if so, hashes the password using bcrypt.hash to securely store it.

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

//We add a method called generateAuthToken to the user schema's methods object. This method generates a JWT (JSON Web Token) using jsonwebtoken.sign. 
//The token contains the user's ID (_id) as payload, and a secret key ('secret') is used to sign the token.
userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id }, 'secret');
  return token;
};

//We create the User model using mongoose.model. It binds the User model to the user schema we defined earlier.
const User = mongoose.model('User', userSchema);

module.exports = User;

//Summary: This code sets up a user model using Mongoose, defines the user schema with required properties, adds middleware to hash passwords before saving, 
//adds a method to generate authentication tokens, creates the User model, and exports it for use in other modules. 

