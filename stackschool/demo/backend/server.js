const express = require('express');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const app = express();
app.use(express.json());

// INIT CONNECTION
mongoose
  .connect(
    "mongodb+srv://USERNAME:PASSWORD@cluster0.hekc5ta.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log('Connected to DB'))
  .catch(console.error);

const Post = require('./models/post');
const User = require('./models/user');

app.listen(8080, () => console.log('Server listening on port 8080: http://localhost:8080'));

// POSTS ENDPOINTS

// Get posts feed
app.get('/feed', async (req, res) => {
  const feed = await Post.find();

  res.json(feed);
});

// Create new post
app.post('/feed/new', (req, res) => {
  const post = new Post({
      content: req.body.content,
      user: req.body.user,
      timestamp: Date.now(),
  });

  post.save();

  res.json(post);
});

// Edit post content
app.put('/feed/edit/:_id', async (req, res) => {
  const post = await Post.findById(req.params._id);

  post.content = req.body.content;
  post.save();

  res.json(post);
});

// Delete post
app.delete('/feed/delete/:_id', async (req, res) => {
  const result = await Post.findByIdAndDelete(req.params._id);

  res.json(result);
});

// Like post
app.put('/feed/like/:_id', async (req, res) => {
  const post = await Post.findById(req.params._id);

  post.num_likes++;
  post.save();

  res.json(post);
});

// USER ENDPOINTS

// Get all users
app.get('/users', async (req, res) => {
  const users = await User.find();

  res.json(users);
});

// Create new user 
app.post('/users/new', async (req, res) => {
  const dupUser = await User.findOne({ username: req.body.username });
  if (dupUser) {
    res.json({ 'error' : 'Duplicate username exists.'})
    return;
  }
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  await user.save();

  res.json(user);
});

// Delete user
app.delete('/users/delete/:_id', async (req, res) => {
  const result = await User.findByIdAndDelete(req.params._id);

  res.json(result);
});

// Edit user information
app.put('/users/edit/:_id', async (req, res) => {
  const user = await User.findById(req.params._id);

  user.username = req.body.username;
  user.password = req.body.password;
  user.save();

  res.json(user);
});

// Log in user account
app.post('/login', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    res.json({ 'error': 'That username doesn\'t exist'})
    return;
  }
  
  if (user.password === req.body.password) {
    res.json(user);
  }
  else {
    res.json({ 'error': 'Incorrect password'})
  }
});