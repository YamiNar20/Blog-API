# Blog-API

<h1>Project Overview</h1>

<h2>Required</2>

Node.js and MongoDB Atlas Database

<h2>How to start</h2>

Copy the repository to your computer.
Open the code in your editor and install all the necessary packages and dependencies.
You will need to install the following dependencies: bycrpt, dotenv, express, jsonwebtoken, mongoose, and morgan.
Run the command "npm install" to install all the dependencies listed in the package.json file.
Make sure you have the following entries under "devDependencies" in your package.json file: artillery, jest, mongodb-memory-server, and supertest.
Create a file called ".env" in the main folder and enter your MONGO_URI and SECRET in that file.
Create a file called ".gitignore" and add the MONGO_URI and SECRET KEY to it to keep them private and not tracked by Git.


<h2>Project Purpose</h2>

The provided code represents an api for managing users and posts. The purpose of this api is to provide a set of endpoints that allow clients to perform various operations related to user and post managment.

User Management:

createUser: Creates a new user by accepting user data in the request body and saves it to the database.
loginUser: Authenticates a user by comparing the provided login credentials with the stored user data.
updateUser: Updates an existing user's information based on the provided user ID.
deleteUser: Deletes an existing user based on the provided user ID.
getUser: Retrieves a specific user's information based on the provided user ID.

Post Management:

createPost: Creates a new post by accepting post data (title and content) in the request body and saves it to the database.
getPosts: Retrieves all posts from the database.
getPost: Retrieves a specific post's information based on the provided post ID.
updatePost: Updates an existing post's information based on the provided post ID.
deletePost: Deletes an existing post based on the provided post ID.

The API utilizes JSON Web Tokens (JWT) for user authentication and authorization. It also interacts with a MongoDB database using Mongoose as an Object Data Modeling (ODM) library.

Clients can interact with this API by making HTTP requests to the respective endpoints, passing the required data in the request bodies or as URL parameters, and receiving responses in JSON format.


<h2>server.js</h2>

To set up the domain connection, create a file named "server.js". In this file, we need to include the necessary dependencies, such as "mongoose", to connect our application to the MongoDB database where our user data will be stored.

To establish the connection with the database, we use "mongoose.connect" and pass the connection string as a parameter. This connection string is obtained from Node.js using dot notation.

Next, we need to define the port on which the server will listen for incoming requests. In this case, we will use port number 3000.

Since we have separated the application logic into a separate file named "app.js", we need to require the "app.js" file and apply its functionality to our server.

To confirm that the server successfully connects, we can use "console.log" to display a message.

<h2>app.js</h2>

First, it imports the required modules by using the require function. These modules are express, morgan, userRoutes, and postRoutes.

Then, it creates an instance of the Express application by calling express() and assigns it to the variable named app.

The next few lines configure the middleware for our application. Middleware functions are functions that have access to the request and response objects and can perform certain tasks before the request is handled by the final route handler.

app.use(express.json()) enables the application to parse JSON data that is sent in requests. This is useful when working with APIs that send and receive JSON.

app.use(morgan('combined')) sets up the logging of HTTP requests using the "combined" format provided by the morgan module. This will log information about each incoming request.

app.use('/users', userRoutes) and app.use('/posts', postRoutes) set up the routes for handling requests related to users and posts respectively. Here, /users and /posts are the base URLs for these routes. The userRoutes and postRoutes are modules that define the specific route handlers for these paths.

Finally, module.exports = app exports the app variable, which allows other files (like server.js) to import and use the configured Express application.


<h2>Post Routes</h2>

create a folder called routes and inside create a postRoutes.js
it requires the needed dependencies in the case that would just be express
create a variable called router that utilizes the express router method that calls the endpoints to the functions they will run and also the type of request they will send
since we utilize mvc architecture we created a file named userController.js and postController.js that holds each endpoints logic that will direct the flow of our routes
we then export router so it can be accessed by app.js



<h2>Create a new Post </h2>
Create a new post object using the Post model, and saves it in the database. If the post is saved successfully, it sends a response with the status code 201 (indicating successful creation) and the created post as a JSON object. If there is an error during the process, it sends a response with the status code 500 and an error message.


<h2>Get all Posts </h2>
Get all posts retrieves all the posts from the database. It fetches all the posts using the Post.find() method and sends them as a response in JSON format.If there is an error during the retrieval process, it sends a response with the status code 500 and an error message.
 
 <h2>Get a specific Post </h2>
Get a specific post from the database based on the provided post ID. It gets the post ID from the request parameters, looks for the corresponding post using the Post.findById() method, and if found, sends the post as a response in JSON format. If the post is not found, it sends a response with the status code 404 (indicating the post was not found) and an error message. If there is an error during the retrieval process, it sends a response with the status code 500 and an error message.

<h2>Update a specific Post </h2>
 
 Update a specific post in the database with new values. It gets the post ID from the request parameters and the updated title and content from the request body. It uses the Post.findByIdAndUpdate() method to find the post by its ID, updates its title and content, and returns the updated post. If the post is not found, it sends a response with the status code 404 and an error message. If there is an error during the update process, it sends a response with the status code 500 and an error message.
  
<h2>Delete a specific Post </h2>

Delete a specific post from the database. It gets the post ID from the request parameters, uses the Post.findByIdAndDelete() method to find and delete the post, and sends a response with a success message. If the post is not found, it sends a response with the status code 404 and an error message. If there is an error it sends a response with the status code 500 and an error message.These functions allow the server to handle different operations related to posts, such as creating, retrieving, updating, and deleting them in the database.
  






<h2>User Routes</h2>

create a folder called routes and inside create a userRoutes.js
it requires the needed dependencies in the case that would just be express
create a variable called router that utilizes the express router method that calls the endpoints to the functions they will run and also the type of request they will send
since we utilize mvc architecture we created a file named userController.js and postController.js that holds each endpoints logic that will direct the flow of our routes
we then export router so it can be accessed by app.js









<h3>Get User by ID</h3>
This function retrieves a specific user from the database based on the provided user ID. 
It gets the user ID from the request parameters, finds the corresponding user in the database using the User.findById() method, and sends the user as a response in JSON format. If the user is not found, it sends a response with the status code 404 and a message saying "User not found".




<h3>Create User</h3>

 This function is responsible for creating a new user.It takes the user data from the request body, creates a new User object using the data,
 saves it in the database, generates an authentication token for the user, and sends a response with the newly created user object and the authentication token. 


<h3>Log In User</h3>
This function handles the login process for a user. It takes the user's email and password from the request body, finds the user with the matching email in the database using the User.findOne() method, and compares the provided password with the stored password (after hashing). If the email or password is invalid, it sends a response with the status code 400 and a message saying "Invalid login credentials". 
If the login is successful, it generates an authentication token for the user and sends a response with the user object and the authentication token.


<h3>Update User</h3>
This function is responsible for updating a user's information. It gets the updated user data from the request body, finds the user with the provided user ID using the User.findOne() method, updates the user's information, saves the updated user in the database, and sends a response with the updated user object.


<h3>Delete User</h3>
This function deletes a specific user from the database. It uses the deleteOne() method on the user object attached to the request (req.user) to delete the user from the database. If it's successful it sends a response with a message saying "User deleted". If its not successful it sends a response with an error message.

<h2>Controllers</h2>

Create a controller.js file

It's require for the needed dependencies like our schema from our user and post  model, bcrypt for the hashing algorithm for our password security, our jsonwebtoken to require authorization before certain endpoints are reached

<h3>Authorization</h3>

I created an auth function and we're telling it to try to create a variable named token that will be equal to the web token we put in the bearer field in the authorization header
then create a variable called data that'll verify the web token and our secret key
then create a user variable that'll search in our database to find a specific user to compare it's web token to the one put into the authorization header but if a user does not exist that matches it, it will throw an error, but if one exists it will be equal to the user it then moves on to the next function for that path that's specified in the routes



<h2>Models</h2>
create a models folder for the m in mvc architecture and inside make user.js file and a post.js file
in the files we make the schema which is a blueprint for how we want the data structured
it is also gonna encrypt any passwords sent into has using the bcrypt dependency that we installed
the model will hold logic to generate a web token that will be called when authorization is needed
then create a User or Post (capital u) variable that export all this logic to be accessed by other files

<h2>Testing With Supertest and Jest</h2>

I created a directory called tests that holds our file called user.test.js and in this is our test suite
for this we'll have to set these tests to a new port separate from the one our api is using
We require mongodb memory server here because we want to make sure the users created for the are pushed into a memory server and not our actual main database
A set before All and after All functions to make sure that a memory server database is created before the test suite and to close and stop the server after the testing is done
we then create test cases for each route to make sure they are properly functioning

<h2>Load Testing With Artillery</h2>

we create scenarios for each of our routes beginning with config, then choose localhost:3000 which is the port our api is using
we then set the phases to be 20 users arriving per second for a minute straight before all scenarios
for our index and create user routes we only need to make one http request because we don't need authorization unlike the other routes
for the routes that require authorization we begin by creating a user to be able to capture the web token and assign it to a variable that will be used for the request that we are initially testing for
