# Backend Integration

> *"Coming together is the beginning. Keeping together is progress. Working together is success."*
> 
> \- Henry Ford

Now that we're backend experts (more or less), it's time to shift gears. In this chapter we'll be focusing on building the frontend and integrating our backend into it. This will mostly involve a lot of review of frontend topics, although we will be covering several new ideas you've likely never seen before. In particular, how do we make calls to our backend from our frontend? We'll explore this, and more, in the chapter to come.

As mentioned in the Introduction chapter, it will be useful to have some basic background knowledge on several technologies going into this chapter. This includes:

- Fundamental Coding Concepts (Think CS31)
- Basic Shell Commands (`cd`, `ls`, etc. )
- HTML/CSS
- Javascript
- React

I recommend checking out our past workshop series, Hackschool, for a refresher on these. Without further ado, let's get started.

## The Feed

It seems most natural to start with the feed for our twitter clone, so let's do that. As good software developers, let's try to brainstorm some things we might need to do before we jump in.[^1] First of all, we know that all of our posts are stored in our MongoDB database. We can use one of our endpoints to retrieve them![^2] This brings up an important question, however: how can we programmatically make HTTP requests? Recall that in the last chapter we saw there are several ways we can make HTTP requests. As a refresher, here they are again:

1. Use a GUI application like Postman
2. Use a requests library like axios
3. Use a VSCode extension

It seems that options 1 and 3 are moreso meant for testing rather than any programmatic use, so we're left with one option! Axios is a promise-based[^3] HTTP requests library that abstracts away many of the tedious details involved with making HTTP requests. Rather than tell you what it can do, let's just jump in and show an example of a function that utilizes it. Going off of our feed motivation from before, let's write a function that invokes the `GET /feed` endpoint from our backend and add it to our React app. Make sure you run `yarn add axios` in your frontend project. To test it out, start your backend in another terminal.

```js
import axios from 'axios';
const URL = "http://localhost:8080";

//Gets the entire feed
function getFeed() {
    axios.get(URL + "/feed")
        .then(response => { 
            console.log(response.data);
        })
        .catch(console.error)
}
```

You should see a log in the console containing your feed! Congratulations, you have officially taken the first true step towards making a full stack application. Recall that axios uses promises, so we must incorporate one of the promise resolution methods we discussed in chapter 2 (in this case `.then()`). 

If we try calling this function, we see the Array of posts in our MongoDb server in the console. Pretty good! We can now try displaying it on our frontend. Before this, let's do a bit of React review.

### React Hooks Recap

React is lazy. It always strives to do the bare minimum to display the user interface. In particular, it only wants to refresh the UI when there is a visual change to be made. In order to enable this laziness, some smart people designed the `useState()` hook.[^4] Using this hook, we can designate a variable to be "watched" for changes. If it changes, then the UI will refresh. Sounds cool right?

[^4]: Recall that a hook in React is just a function that typically starts with "use" and performs some component related logic (usually).

In general, `useState()` looks like this:

```js 
const [watchedVar, setWatchedVar] = useState(['default value']);
```

The syntax seems a bit funky, but all thats going on is that useState returns an array of two items: a variable to be watched and a function to set the watched variable. We pass in a default value to the function and we call the setter function when we want to update variables value. Seems a bit convoluted, but trust me when I tell you it more than makes up for it in practice. For a more detailed explanation of `useState` check out one of our previous [workshops](https://www.youtube.com/watch?v=ehgl3HpR5xQ)!

Consider our feed example. We want our UI to update when we fetch our posts array from our server. We can use `useState()` as follows:[^5]

[^5]: Don't forget to import `useState`.

```js
  const [posts, setPosts] = useState([]);
```

By default, we'll just set posts to be an empty array. In order to set the value of posts, we call the `setPosts()` function. In fact, let's do this within  `getFeed()`.

```js
//Gets the entire feed
function getFeed() {
axios.get(URL + "/feed")
    .then(response => { 
        setPosts(response.data); // <-- We changed this line
    })
    .catch(console.error)
}
```

As an additional caveat, we only want our API call to be performed when our app is initially loaded.[^6] To accomplish this, we use `useEffect()`! In general, `useEffect()` looks like the following:

[^6]: Currently it is being called an obscene amount every time we run our app.

```js    
useEffect(() => {
    // perform some task
}, [dependency1, dependency2, ...])
```

The function passed to the `useEffect()` hook will be called whenever one of the dependencies in the dependency array is updated! If the array is empty, it will only be called upon initial app load. Again, check out the [workshop](https://www.youtube.com/watch?v=ehgl3HpR5xQ) we linked before for more information on this, but here's how we use it in our demo app:[^7]

[^7]: Note that, just like `useState`, `useEffect` needs to be imported from react.

```js
useEffect(() => {
    getFeed();
}, []);
```

Very cool! Now that we have our posts, let's try to display them! First let's get rid of all the react placeholder code. 

```js 
// change the return in App.js to the following
return (
    <div>
        
    </div>
);
```

### Mapping

Before we go any further, let's think about what we want to accomplish here. We want to somehow iterate through each post in our posts array, and display information from each one. Up to this point, the canonical way you have been taught to do this is to use a loop! It might look something like this:

```js
for (let i = 0; i < posts.length; i++>) {
    // display post info for current index
}
```

However, there are a couple problems with this. The biggest among these is that we need to write our code within a JSX return block, which we aren't allowed to do! The `return` needs a value following it, so we can't just add a for loop after it. To fix this, we use mapping!

Mapping is a way of iterating over an array and performing a set of operations on each item within it. Once we complete iteration, it returns a new array with the operations performed! It can be thought of as a kind of "transformer" function. It transforms the items of an array into a new format using some function and spits out the result. Here's a toy example:

```js
a = ["Nathan", "James", "Nareh", "Christina"]; // array to iterate over

pog = (name) => { // operation to perform
    return `pog${name}`;
}

a.map(pog); // performing pog on each item in a

// Output: ['pogNathan', 'pogJames', 'pogNareh', 'pogChristina']
```

We can also simplify this a bit more by utilizing anonymous functions. Rather than name our operation `pog`, let's just pass it in directly.[^7]

[^7]: We can omit our `return` keyword here using a special syntactic sugar built into JS! For this to work, we must have a single expression in our function and omit our brackets as well.

```js
a = ["Nathan", "James", "Nareh", "Christina"]; // array to iterate over

a.map((name) => `pog${name}`); // performing pog on each item in a

// Output: ['pogNathan', 'pogJames', 'pogNareh', 'pogChristina']
```

Cool! Let's apply this to our feed. In this case, we want to map every post object in our posts array to a JSX component! Let's do that! Recall that a post contains some content, a user, a like count, and a time stamp indicating when it was posted.

```js
return (
    <div>
      {posts.map(post => 
        <div>
          <h3> {post.user} </h3>
          <p> {post.content} - Time: {post.timestamp} - Likes: {post.num_likes}</p>
        </div>        
      )}
    </div>
);
```

We now have our feed! Granted it's pretty ugly, but let's take this W for now. ~we are full stack developers.~

Next steps:
-----
1. Creating visual feed
    - feed component
    - map over list of posts
2. Adding posts
    - axios post
    - frontend textbox and button to add post
    - like posts
    - useState


[^1]: And make a plan to address each one.
[^2]: Specifically, `GET /feed`.
[^3]: That means asynchronous!

## Profiles and Navigation

## Finishing Touches
