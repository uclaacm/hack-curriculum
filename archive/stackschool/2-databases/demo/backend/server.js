const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

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

// ADD DOCUMENT
const Post = require("./models/post"); // import Post data model

const intro = new Post({ // populate required fields
  content: "Some content!",
  user: "Me",
});

// intro.save(); // push intro post to mongoDB

// GET DATA
Post.find({})
  .then(posts => console.log(posts));

// MODIFY DATA
Post.findById("63c5e192e6e28a4adef4cb4a")
  .then(post => {
    post.content = "Some OTHER content!"
    post.save();
  })

