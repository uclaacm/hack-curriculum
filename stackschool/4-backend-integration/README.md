# Backend Integration

> *"Coming together is the beginning. Keeping together is progress. Working together is success."*
> 
> \- Henry Ford

Now that we're backend experts (more or less), it's time to shift gears. In this chapter we'll be focusing on building the frontend and integrating our backend into it. This will mostly involve a lot of review of frontend topics, although we will be covering several new ideas you've likely never seen before. In particular, how do we make calls to our backend from our frontend. We'll explore this, and more, in the chapter to come.

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
