# Servers

> *"Simplicity, carried to an extreme, becomes elegance."*
> 
> \- Jon Franklin


Servers are probably one of the most misunderstood concepts for new developers. If you put ten new developers in a room, it's a pretty good bet that they've all *heard* of servers. Maybe they've been exposed to them through pop culture. They've seen movies or read books where the nerdy, basement dwelling side character is approached by the charismatic protagonist to "hack into the mainframe" to stop the evil corporation and save the world.[^1] Or maybe they've come across the terminology at some point while learning about the fundamentals of programming, with their instructors glossing over it saying, "don't worry about this yet." Whatever the case may be, its likely that a majority of the ten new developers you have confined to a room would not be able to tell you what exactly a server does, or why. Or even more fundamentally, what *is* a server? 

In a way, this lack of understanding almost serves as a hint to what a server is: a blackbox[^2] to process and retrieve information. We see this concept, **abstraction**, fairly frequently in programming and Computer Science. Through abstraction, we make it far simpler for others to interact with our programs. It's a very important concept, and we'll be digging into it in detail throughout this chapter. 

This write-off of servers as blackboxes is great if we just want to use them to get some data. It makes our job much easier! In fact, you interact with servers (indirectly) every single day just by browsing the internet[^3]. However, when it comes time to create our own, it's important to have a deeper understanding. And that's what we aim to accomplish here! By first instilling in you an idea of the *fundamental* concept of a server[^4], and later showing one possible implementation (among many), we'll break the blackbox open and expose the ideas within.

## 3.1 Servers In General

Put simply, a server is a computer like any other. What distinguishes a regular old computer and a server is that **servers are given the task of listening and responding to requests**. These tend to be requests for data or to perform some task and in general they come from other computers [^5]. We call these "other" computers **clients**. You can think of the interaction between a server and a client in much the same way as the interaction between a customer at a restaurant and the restaurant's staff. Just as a customer can request a glass of water, new silverware, or a half serving of Tiramisu, a client can request some function to be performed or data to be processed and returned. This brings up an important question: how do the client and server communicate? A customer at a restaurant might use English or Portuguese, but unfortunately computers aren't quite there yet. They must have some standard, agreed upon language in order to do so.

### The Language of Requests

In the context of clients and servers, the "language" that is typically used is **HTTP**, or Hypertext Transfer Protocol [^6]. This protocol makes it easier for servers to parse through a client's request due to the fixed format. Take a look at the following example of a real HTTP request:

```HTTP
GET / HTTP/1.1
Host: www.example.com
User-Agent: Mozilla/5.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: en-GB,en;q=0.5
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
```

It may seem strange and hard to read as a human, but it is perfectly formatted for computers. We don't have to worry about the exact formatting as creating these requests is typically automated, but I do want to point out one key detail: the word `GET`. `GET` indicates to the server the particular action desired by the client, and it is one of several so called **HTTP request methods**. We'll discuss these in more detail and show several examples, so don't worry if you haven't quite grasped the concept yet. For now, here are a few essential methods to be aware of [^7]:

- `GET`: indicates a request for some data
- `POST`: submits data to the server which often results in some side effect or change to the server's state
- `PUT`: submits data to the server in order to update an existing resource
- `DELETE`: removes some resource from the server


After receiving a well-formed request, the server will perform the specified action and create a **response** to send back to the client. The format of a response is also standardized by HTTP, and here's an example:

```HTTP
HTTP/1.1 200 OK
Date: Mon, 23 May 2005 22:38:34 GMT
Content-Type: text/html; charset=UTF-8
Content-Length: 155
Last-Modified: Wed, 08 Jan 2003 23:11:55 GMT
Server: Apache/1.3.3.7 (Unix) (Red-Hat/Linux)
ETag: "3f80f-1b6-3e1cb03b"
Accept-Ranges: bytes
Connection: close

<html>
  <head>
    <title>An Example Page</title>
  </head>
  <body>
    <p>Hello World, this is a very simple HTML document.</p>
  </body>
</html>
```

The first thing you might notice is that the response seems to have HTML embedded into it. Why might that be? Let's come back to that. Take a look at the first line of the response. As before, it indicates that it is following HTTP, but it also has the number 200 and the word `OK`. This is known as an **HTTP status code** and it represents the result of the server's attempt to address the client's request. In this case, `200 OK` indicates that the request was successfully, received, understood, and accepted. There are many response codes, but they all fall into the following categories:

- `1XX`: informational; the request was received and is being processed
- `2XX`: successful; the request was successfully, received, understood, and accepted
- `3XX`: redirection; further action needs to be taken in order to complete the request
- `4XX`: client error; the request contains bad syntax or cannot be fulfilled
- `5XX`: server error; the server failed to fulfill an apparently valid request

You don't have to memorize these, but you'll find that after working with HTTP requests for a while they'll just come naturally. For example, you might be familiar with the infamous code `404`, which indicates that a resource was not found. You'll come to recognize other codes just like this one.

<details> 
    <summary><b>About the HTML we saw before...</b></summary>
    <div>
        <p>
        What was it doing there? It's known as the body of the response, and it's being sent back to the client, in essence, because that's what they asked for. HTTP messages can be broken up into two parts: the header and the body. The <b>header</b> contains metainformation about the message, while the <b>body</b> contains the data associated with the message (such as HTML or JSON). Let's break down what's going on in this particular example. The client sent a `GET` request, asking the server to send some data back from a particular location (www.example.com). The data that was sent was this HTML code... Do you see where this is going yet?
        </p>
        <p>
        We know that HTML is used by browsers in order to render web pages, so our client can now successfully render the web page stored on the server. In essence, the client uses this HTTP request in order to receive the data necessary to render a web page! This process happens billions of times per day, and it is the back bone of the whole internet. The internet is built upon servers which store HTML, CSS, and Javascript and your browser uses HTTP requests to request them to be sent to you! Obviously, there's more to the internet than just this, and we could fill many books talking about it, but it's outside the scope of this workshop series. If you're interested take CS 118!
        </p>
    </div>
</details>

HTML is not the only thing that can be placed in response bodies. In fact, just looking at the `Accept` section of our HTTP request we can see that images can be as well!

```
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
```

Another common data format used in HTTP bodies is known as **JSON**, or Javascript Object Notation. We'll discuss JSON more in detail once we actually see it in action, but for now it suffices to understand that it is a way to encode objects in Javascript as strings. For example, the following code block shows an object called `heck` and its corresponding JSON string representation:

```js
heck = {
    studentOrgRanking: 1,
    color: "#C960FF",
    rizz: 100,
    website: "https://hack.uclaacm.com"
}

{
    "studentOrgRanking":1,
    "color":"#C960FF",
    "rizz":100,
    "website":"https://hack.uclaacm.com"
}
```

## 3.2 Web APIs: What's on the Menu?

Now that our server and client have a common language, it's time to take things a step further. Let's revisit the restaurant analogy. How does the customer know what they're allowed to order? They can't just demand to be served whatever they want, because the restaurant might not be able to accommodate their request[^8]. That's why every restaurant has a menu! There needs to be a way to let customers know what they can order. Clients and servers are much the same. There needs to be an understanding between them about what the server can do for the client, and this is accomplished using the **API**, or Application Programming Interface. You may have heard this term before. It's another one of those nebulous phrases that gets thrown around a lot, but is rarely defined concretely.

In general, an API is just a way for two computer programs to interact with each other. Think of the customer at a restaurant as one program and the staff as another. The customer hasn't eaten in 16 hours and is craving a burrito with carnitas and guacamole[^9]. Using the menu (the API), the customer is able to enjoy the result of the staff's work and they don't need to attend 4 years of culinary school in order to do it! Put another way, the API allows us to interact with a blackbox and receive meaningful results. APIs can be found everywhere in software engineering, but we will be creating more specialized APIs called **Web APIs**[^10].

<details> 
<summary> 
<b>Let's take a look at an example of a simple API.</b>
</summary>

API's can be expressed in several ways, either using code or English. Let's keep it simple and just use English. Consider a server with the sole purpose being to simulate a cat. The API defines several actions that you, as a pet owner, can take to interact with the cat, and in response the server will send a JSON string[^11] with information about the cat and its actions.

The API is defined as follows:
```
POST /FEED: You feed the cat.
POST /WATER: You give the cat a drink.
POST /PET: You pet the cat.
GET /STATUS: You check how the cat is doing.
POST /MEOW: You meow at the cat.
```

These five actions define how you can interact with the cat server. Some of the interactions may have side effects, or an effect on the state of the cat. Let's start by petting the cat. [^12]

```javascript
REQUEST: POST /PET

RESPONSE: 
{
    "health": 100,
    "hunger": 10,
    "thirst": 10,
    "action": "Meows and sits down, ready for more pets."
}
```

He seems friendly! Let's give him some food.

```javascript
REQUEST: POST /FEED

RESPONSE: 
{
    "health": 100,
    "hunger": 50,
    "thirst": 10,
    "action": "Meows gratefully, and attacks the food."
}
```

Okay, he seems to be enjoying that. Let's pet some more.

```javascript
REQUEST: POST /PET

RESPONSE: 
{
    "health": 100,
    "hunger": 50,
    "thirst": 10,
    "action": "Bites your hand. He wasn't done eating yet!"
}
```

Ouch. How to respond?

```javascript
REQUEST: POST /MEOW

RESPONSE: 
{
    "health": 100,
    "hunger": 50,
    "thirst": 10,
    "action": "Looks up from food, confused."
}
```

Okay, that's enough playing with the cat! Hopefully, this toy example gave you a clearer idea of what an API is as well as its purpose. We'll be creating a real API later in this chapter using Javascript!

</details>

Typically, Web API's contain multiple **endpoints**. In general, an endpoint can be thought of as a point of contact between a client and a server. Depending on which endpoint is invoked by the client, the server knows which action to take. In the previous example, we can think of each of the five possible actions as an endpoint. Another common way of thinking about endpoints is as *specific digital locations* of resources located on a server. For example, if we want to access the resource located at `/STATUS` on a server, we use the `GET /STATUS` endpoint. You can think about endpoints in whichever way is best for your own mental model, as long as you remember that endpoints are meant to direct the server towards a particular action or resource. And don't worry if things aren't clear yet! We'll be showing concrete examples of all of these concepts in the next few sections.

## 3.3 Server Implementations

As one might expect, there are many ways to go about implementing a server. We know that a server is simply a computer tasked with listening and responding to requests, and clearly this task is not specific to any single programming language. Some popular choices are the following:

- Node.js and Express
- Python and Django
- Python and Flask
- C and Pain[^13]

There are countless libraries out there, so no need to reinvent the wheel. Since we're focusing on the MERN stack for Stackschool, we'll be going with Express and Node[^14]. To avoid any confusion let's first discuss what exactly they do, and why they are useful for us when building a server app. 

### What is Node?

Originally, Javascript was created as a scripting language for the browser, Netscape, and wasn't intended to be executed outside of that environment[^15]. However, as time has gone on and Javascript has gotten more popular, it has transcended this original functionality. In 2009, a man named Ryan Dahl decided that Javascript would be an excellent language for writing server programs, and created a new runtime environment[^16] for it outside of the browser. Node was the product of his efforts. Now, years later, it's the most popular non-browser runtime for Javascript and home to a thriving, community driven ecosystem of libraries[^17]. As described on their website, Node is "an asynchronous event-driven JavaScript runtime designed to build scalable network applications." Essentially, it's perfect for servers!

### What is Express?

Node gives you all the fundamentals required to make a server, but why do that if someone's already done most of the work for us? Express is a framework that makes creating server applications far easier by abstracting away most of the HTTP request logic. There are plenty of alternative frameworks, but to stay true to the MERN stack, we'll be going with Express.

### Creating Your First Server

Now that we have all that out of the way, let's get to the fun part. First, make sure you have all the necessary installations. Follow the checklist:

- Node. If you don't already have it installed, [here](https://nodejs.org/en/download/package-manager/#macos) is an extensive guide to doing so no matter which platform you're on. I recommend using Homebrew if you're on MacOS.[^18]
- Yarn. This will be your package manager, or the program you use to install node packages (like Express). Once you have Node installed, you can install Yarn by running `npm install --global yarn` in your shell. 

Now in your terminal, navigate to the directory of your choice[^19] and run `yarn init`. This will start the process of creating your server application. It'll prompt you with some basic configuration information, but you can just accept the default values by pressing enter for each one. Don't worry, you can change these values later! After you've completed this step, a new file called `package.json` should have been generated. This is the configuration file for your server. To install Express, run `yarn add express`. This should generate a directory called `node_modules` and a file called `yarn.lock`.

Now let's make the server itself. Create a new file called `server.js`. Within this file, add this boilerplate code:

```js
/**** INIT SERVER ****/
const express = require('express');
const app = express();
app.use(express.json());

/**** DEPLOY SERVER ****/
const port = 8080;

app.listen(port);
console.log(`listening on http://localhost:${port}/`);
console.log("Press Ctrl-C to quit");
```

Congrats, you just made your first server! Unfortunately, it doesn't do anything. You can run it with `node server.js`. Before making it a bit more useful, let's break down what exactly is happening. Take a look at the second line. In Node, the `require` function is a way to include code from other files within your file.[^20] In this case, we're including code from the Express package. In the next line, we create an Express app and bind it to a variable. In the final stage of initialization, we tell the app to use something called a **middleware** function. We'll get into these in more detail soon, but for now just know that it's a way to make your life easier. Now, in the deployment section, we define a port, and tell the server to listen on that port.[^21] This will affect the URL of your local server.

Alright, now that we've cleared all that up [^22], its time to add our first endpoint. We'll make an endpoint that requests a random number from the server. It's pretty easy!

```js
/**** ROUTES ****/
app.get("/random", (request, response) => {
    // generate random number from 1-100
    const rand = Math.floor(Math.random() * 100) + 1;

    // send random number in response
    response.send(`${rand}`);
})
```

This endpoint can be referred to as `GET /random` [^23] and every time it is invoked it will return a string containing a random number from 1-100. You can test it out by starting the server[^24] and visiting http://localhost:8080/random in your browser. At a surface level, all that's going on here is that we're using Javascript code to define our server's API. 

<details> 
<summary> <b> Describing the API with English</b> </summary>

Recall how we defined our API in the cat server example. We can describe our Javascript endpoint definition for random in the same way! 

```
GET /random: Get a random number from 1-100.
```

They're two ways of saying the same thing, except that one of them happens to be real, functional code.

</details>

Hopefully, you now have a feel for the general process of creating Express applications. You're now ready to put everything together into a more realistic application.

## 3.4 Demo

First, let's get the express app set up (read: boilerplate). Remove the code from last time starting at line 17, we won't be needing it anymore. Add the following to the top of the file (and ensure you have express installed on your project[^25]):

[^25]: If not, `yarn add express`.

```js
const express = require('express');
```

And add the following to the bottom of the file:
```js
const app = express();
app.use(express.json());

app.listen(3001, () => console.log('Server listening on port 3001'));
```

We explained what's going on here in section 3.3 so check that out for a reminder! At this point, your file should look like this:[^26]

[^26]: With the exception of the string having your actual username and password.

```js
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

app.listen(3001, () => console.log('Server listening on port 3001'));
```

Now you can try running it to make sure it works with `node server.js`. Alright, boilerplate is out of the way now. Let's get to the interesting part! Let's think about what we might want to include in the backend API of a twitter clone. Recall that last time we set up a data model for our posts. What should we have in our API related to posts? Well, first of all, we have to actually get the feed of posts, so one endpoint related to getting a list of posts would be helpful. We should also be able to create new posts. If we in retrospect decide a post doesn't reflect on ourselves as well as we would have hoped, we can edit it or simply delete it all together. Finally, if we see a post we like, we want to be able to like it. So all together, we should create the following endpoints:

- getting the feed
- creating new posts
- editing posts
- deleting posts
- liking posts

So let's do that! First up, we'll create the `GET /feed` endpoint. Recall our discussion in the last chapter about asynchronous programming and mongoose. These concepts will be essential here![^27]

[^27]: And I recommend going back and rereading if you need a refresher.

```js
// Get posts feed
app.get('/feed', async (req, res) => {
    const feed = await Post.find();

    res.json(feed);
});
```

This code indicates to our server that it should listen for `GET` requests on the `/feed` endpoint. Once it "hears" something, it will run the anonymous asynchronous function. In this case, it will retrieve all documents from our database that conform to the `Post` data model, and then return a json representation of them in the response object. Notice that we must `await` the result of `Post.find()` since it is an asynchronous function (and our response is dependent on its result).

Now we want allow for the creation of new posts. To do this, we'll create a POST[^27a] endpoint at `/feed/new`. First, however, we need to discuss how to pass data in our requests. There are several ways:

[^27a]: Recall that POST requests typically update the state of the server in some way.

1. Pass data in request body
2. Pass data as URL path parameters
3. Pass data in the "*query string*"

We'll address two of these as we use them in the endpoints to come. First up: request body.

#### Request Body
Recall the anatomy of an HTTP request: each one includes both a head and a body.[^28] Just like responses can pass data (such as HTML) in their bodies, requests can pass data in their bodies as well! As you might expect, we do this in JSON format. Here's an example of a properly formatted HTTP POST request that utilizes the body:

```HTTP
POST /feed/new HTTP/1.1
Host: localhost:3001
Content-Type: text/html; charset=utf-8

{
    "content": "To be honest, I've never written a raw HTTP Post request before and I hope I never have to again.",
    "user": "eener"
}
```

This is a request directed to the `POST /feed/new` endpoint, whose javascript specification follows below:

#### 

```js
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
```

Notice how we extract information from our request body using `req.body`. This is simply a Javascript object so we can access fields within it like any other. Recall from last time `post.save()` simply saves a document to our database. Finally, we close our function with a response containing a JSON representation of our post for good measure. [^29]

[^29]: Note that `.save()` is an asynchronous function, however we do not `await` its resolution in this case because our response does not depend on its return value.

Now let's create an endpoint to edit our posts. First, let's think about this. How do we identify which post we want to edit? To address this, it's important to understand that each document in our database has an associated field called `_id` which uniquely identifies it. We could send this id in the request body, but it's better style to do it as part of our URL path so let's try that instead!

#### URL Path
To indicate an HTTP URL path variable, we simply add a colon before it. We can then reference it using the given name. This is probably easier to understand if given an example, so lets dive in. Our edit endpoint is as follows:

```js
// Edit post content
app.put('/feed/edit/:_id', async (req, res) => {
    const post = await Post.findById(req.params._id);

    post.content = req.body.content;
    post.save();

    res.json(post);
});
```

Everything here is pretty self explanatory if you've been following so far, but I do want to point out that we access our URL parameter using the `req.params` object. We then pass in the new content we want for our post in the request body. Also note that we use a `PUT` request here, as we are updating an existing resource.[^30]

[^30]: We could also use a `POST` request, but best practice is `PUT`.

We'll speed through the rest of our post endpoints.

```js 
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
```

What else might we need to consider when making our app? Another major component is users. We should probably make a data model for that!

```js
const mongoose = require('mongoose');

const User = mongoose.model("User", new mongoose.Schema({
    username: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
}));

module.exports = User;
```

Don't forget to import this data model into your `server.js` file. This is all we need for now, but we'll definitely be coming back to this.[^31]

[^31]: We need to protect our users data! Storing passwords in plain text is no good. 

Now let's think about what endpoints we should add related to users. Similar to posts, we should have a way to get a list of users, create a new user, delete a user, and edit a user's information. We won't explain these as they are fairly similar to what we did for posts.

```js
// Get all users
app.get('/users', async (req, res) => {
  const users = await User.find();

  res.json(users);
});

// Create new user 
app.post('/users/new', async (req, res) => {
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
```

We also need a way for users to log in. This one is *slightly* more complicated, but not too bad yet... 

```js
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
```

Note that with this logic, we should also refine our user creation endpoint to ensure there are no duplicate usernames (otherwise it would be trivial to hack into somebodies account). The following modification should do the trick:

```js
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
```

With that, congratulations! You've successfully implemented your very own backend application using Express! Hopefully there aren't any bugs...

## 3.5 Testing

Speaking of, how can we actually test our endpoints? After all, we want to ensure everything works as expected. For `GET` requests, it's as simple as copying a link into your browswer. If we start our server and visit http://localhost:3001/feed, we should see a JSON representation of our posts. However, what if we want to send a request with a body? How can we go about doing that? There are several ways:

1. Use a GUI application like Postman -- Postman makes it easy to form request bodies. Unfortunately, you have to download a whole new app.
2. Use a requests library like axios -- This seems like a good idea, and in fact we will be doing it later in this workshop series!
3. Use a VSCode extension -- Less intuitive than Postman, but at least we don't have to download another app! Let's dive in.

The extension is called REST Client, and you can download it like any other VSCode extension. Then in order to use it, create a new file ending in `.http`. We're going to be writing raw HTTP requests, but don't worry! You can simply copy paste the boilerplate from below:

```HTTP
[METHOD] [/endpoint] HTTP/1.1
Host: localhost:3001
Content-Type: application/json; charset=utf-8

[body]

```

The [METHOD] field indicates which HTTP request method we are using i.e. `GET`, `POST`, etc. [/endpoint] is our enpoint path and [body] is our body. Note that our Content-Type here is `application/json`, so we expect to see JSON in our body (if anything). To test an endpoint, start your server, fill in the fields with the information of your choosing, and hit "Send Request" above the request head. Try testing out all the endpoints we created!

## 3.6 Organization
To be added. For now, read [this](https://blog.logrocket.com/organizing-express-js-project-structure-better-productivity/).
<!-- models, controllers, routes, middlewares, etc. -->

## 3.7 Documenting Your API
To be added. For now, read [this](https://swagger.io/solutions/api-documentation/).

[^1]: Note that a mainframe is just a special name for a server that is capable of performing a large amount of concurrent operations. Whether or not "hacking" into one will save the world is another question.

[^2]: A blackbox is a term for an object that takes some input and transforms it into some desired output, with the user not necessarily knowing the details of how it works.

[^3]: Can you imagine if you had to be familiar with all the intricacies of servers just to watch a YouTube video?

[^4]: Note that we won't go over all the low level implementation details. That's for your upper division CS classes to cover!

[^5]: We will see that it's not always the case that requests originate from other computers. A single computer can be both the server and the client, and you'll see that this is actually very common, particularly during the development process of a full stack application.

[^6]: Note that there are other protocols that can be used, such as WebRTC, and each have their advantages. For now, let's not get into the weeds too much, but I recommend reading up on protocols if you're interested.

[^7]: There are methods beyond these. Check out Mozilla's [article](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) on the subject if you're interested.

[^8]: Yes, there are exceptions, secret menus, etc. But let's be real. If you order off the secret menu, the staff hates you.

[^9]: I am so hungry right now.

[^10]: As the name implies, these are API's that utilize the Web, allowing communication from client to server through HTTP requests.

[^11]: Recall that JSON is just a string representation of a Javascript object.

[^12]: Note that the formatting of the requests/responses do not follow HTTP.

[^13]: Pain in the literal sense of the word. Not recommended.

[^14]: Representing the E and N in MERN respectively.

[^15]: It also took only 10 days for the first version to be developed, which honestly explains a lot.

[^16]: By runtime environment, I just mean a program that can execute code.

[^17]: We call these libraries "packages", and we access them using a program called NPM, or Node Package Manager. Another popular (and, in my opinion, better) package manager is Yarn. We'll be using Yarn for all examples here.

[^18]: Some would recommend using a version manager like NVM, but if you just want to get your hands dirty quickly, the other methods are adequate for now.

[^19]: If you're not familiar with navigating the terminal, check out [this](https://www.digitalocean.com/community/tutorials/basic-linux-navigation-and-file-management) resource.

[^20]: Similar to imports/includes in other languages you may be familiar with. We call the code that we're importing a "module."

[^21]: Ports allow you to host multiple servers on the same machine, each on a different port.

[^22]: May be worth a couple more readthroughs if it's still unclear, or get in contact with us on [Discord](https://discord.gg/xXcJWDUqJj)!

[^23]: Note that `/random` is known as a **route**. The distinction between endpoints and routes is that endpoints include the HTTP method (i.e. GET, POST, etc.) in their definition. You can have multiple endpoints with the same route, as long as the method is different (so having `GET /random` and `POST /random` would be perfectly fine).

[^24]: Use `node server.js` within the directory for your server. Also, if you're wondering what the deal with localhost is, know that it's a special domain name that represents the current computer.