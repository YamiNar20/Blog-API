//Allows us to define data models and interact with the MongoDB database using JavaScript.
const mongoose = require('mongoose')

// We have a postSchema and a schema is a blueprint that describes the structure and properties of a document in MongoDB collection.
// The postSchema specifies that apost document should have the following properties:
//title : a string property that is required .
//content: a string that is require
//author :an object id property that refrences the user collection. This creates a relationship between posts and users.
//createdAt: a date property that defaults to the current date and time when a post is created.


const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

const Post = mongoose.model('Post', postSchema);//We create a model named Post based on the postSchema.Which allows us to perform database operations
//related to posts, such as creating , updating and deleting post documents.

module.exports = Post;
//Summary: This code sets up a Mongoose model for posts, defines the schema for a post document, and exports the model to be used in other parts of the application.