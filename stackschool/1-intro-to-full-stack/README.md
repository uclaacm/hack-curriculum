# Introduction to Full Stack

> *"There are two mistakes one can make along the road to truth: not going all the way, and not starting."*
> 
> \- Alan Cohen

As a beginner, full stack development can be quite intimidating. Looking it up yields a seemingly endless list of languages and technologies that you must learn in order to even get started, and who has time for that? The good news is that we can drastically limit the number of things to learn by making a couple of strategic decisions before we start. The bad news is that you will still have to learn about six technologies, three of which we're going to assume you have at least a basic understanding of going into the workshop series. That being said, stick with us! By the end of this, you'll have no trouble making your own full stack application to rival Facebook or Twitter and you'll have a lot of fun doing it. 

Before we get into any actual content, allow me to first give you some advice on approaching this series[^1]. At first, it's not going to be easy. It'll be frustrating and you'll bang your head against the wall and you'll want to quit. You'll want to quit often. But don't. Stick with it, and eventually you'll make progress. You'll figure out what was causing that unreadable error or that 400 response code, and the feeling of accomplishment will be like no other. Little victories will begin to pile up around you and, before you know it, you'll have a completed full stack app ready to show off to the world. It won't be easy, but nothing worth doing ever is. And keep in mind you're not on your own here! You have a team of twenty passionate, wonderful Hack officers ready to help you through your struggles. All you need to do is reach out![^2]

[^1]: And I guess learning in general.

[^2]: Which you can do in person or on [discord](https://discord.gg/T5Nu5hTs7s)!

Another piece of advice on learning: it's often helpful to start with an understanding of surface level concepts and dig deeper once you have those mastered.[^3] This is the approach we will mostly take in this workshop series. Our weekly workshops will provide a high level view of things in order to get you started, offering occasional nuggets of deeper insight, while the textbook will usually be the place to go if you want a deeper understanding. I highly recommmend utilizing both if you truly want to learn the material. If you would prefer, you can also skim the textbook ahead of our workshops and get an idea of the content that way. Whatever works best for you! Throughout the series, we'll show the entire process of building a simple full stack app. By the end, hopefully you'll be able to make your own!

[^3]: Keep in mind there are many different kinds of learners, so what works for one person may not work for another and vice versa. This is just a suggestion!

## 1.1 Prerequisites

As mentioned, due to time constraints we unfortunately won't be able to cover absolutely *everything* you need in order to make a full stack app. In particular, we'll be assuming a basic understanding of frontend concepts. This includes:

- Fundamental Coding Concepts (Think CS31)
- Basic Shell Commands (`cd`, `ls`, etc. )
- HTML/CSS
- Javascript
- React

Luckily, we had an entire workshop series[^4] covering these ideas last quarter if you need to catch up! We cover these concepts every year in Hackschool, so check out those workshop recordings/slides/README's before attending. We will be giving slight refreshers on these concepts here, but they'll be very quick and likely difficult to follow if you've never seen them before. Alright, with that out of the way... let's get to the content!

[^4]: Check out our workshops archive [here](https://hack.uclaacm.com/archive).

## 1.2 Why Full Stack?

As any good student should, you may be wondering: *What's the point?* To illustrate that, let's take a look at a website that you're probably familiar with. 

![YouTube Home Page](../textbook/src/img/youtube.png "YouTube home page")

If we had to design YouTube from scratch, how might we do it? The most obvious component is the UI. It's likely that some mix of HTML/CSS is used in order to deliver the experience you see in the screenshot. There are several other things to think about, however. For instance, where do the videos come from? They're clearly not all hardcoded into the website as that would be a nightmare to maintain. You'll also notice that when you refresh the page, YouTube will adjust which videos it recommends to you to ensure it never gets stale. It takes things a step further if you sign in, tailoring its recommendations based on your previous viewing history. How are they doing this? 

Unfortunately, making a website as intricate as YouTube is impossible without incorporating the full stack. In order to store all the videos and users, something called a **database** is used. Recommendations are determined by an algorithm on a **server** and communicated to the **client** via an **API**. We'll go over exactly what all of these terms mean, but for now just know that they are each essential components of a full stack application. Each of these components works together in order to deliver a product that millions of people use everyday! And it's not just YouTube. The vast majority of websites and apps you frequent[^5] utilize all of these components in order to give you the best experience possible.

[^5]: Google, Instagram, Twitter, Facebook, BeReal. All of these are full stack applications!

Note that not all websites require the full stack. These websites are known as **static sites**, due to the fact that their content is the same for every user that visits and will not change unless the website itself is updated. One example of such a site is [Hack's website](https://hack.uclaacm.com/)!

## 1.3 What is Full Stack?

Fullstack refers to all of the technologies that are needed to complete a project, with each component being called a "stack." Full stack is a combination of 2 separate stacks. They are called **front-end** and **back-end**. Naturally, this begs the question: what's the difference?

### 1.3.1 Frontend

Frontend is essentially everything that the user interacts with. Think of everything that you see when you interact with a website: a text box, the colors, buttons, links, navigation bars, pages, etc. Typically, the front end is coded in HTML, CSS, and JavaScript. For our demo, we will be using React.js, which is a JavaScript development framework that helps us with creating our frontend. Essentially, React provides us with lots of useful library functions and integrations that would otherwise make web development even more tedious. 

### 1.3.2 Backend

At this point, we've only uncovered the tip of the iceberg of fullstack development. If fullstack development was translated into a metaphor for an iceberg, frontend would only be the tip of the iceberg. Backend is everything that is unseen below the water. 

In a contrast to frontend development, backend is essentially everything that the user **does not** see. For questions like *where does the data that I put into my text box go?* or *how does my website authenticate me as a proper user?*, we turn to the backend. The backend is made up of multiple parts as well. The ones that we will be focusing on are the server, backend application, and database. We will now dive into these 3 components individually.

*What's the server?* 

The server is essentially the computer or program that handles all of the requests from your application. In our app, our server is powered by a technology called Node, and it handles everything that our app needs such as the passing of information and the fulfillment of requests. Specifically, it serves as the middle ground between our backend application and the database. For example, it can receive a request from our backend application and go into the database to fulfill that request. 

*What's a backend application?*

A backend application is the real brains of a full stack app. It handles everything that the app needs to function, from populating information on pages within the frontend to handling user authentication. This backend app defines something called the API, or Application Programming Interface. The API is an interface, or a collection of endpoints and functions that the server can use to fulfill a request. One such endpoint can be the endpoint that defines user login, */login*, which will be utilized by the server to handle a user login. For our app, we are using a technology called Express to create our backend application. 

*What's a database?* 

A database is essentially an organized collection of data. Think Excel spreadsheet. It's just a table with rows and columns that have values stored in specific row and column entries. In the real world, different technologies design the way they hold the data in particular manners. There are 2 main types of databases: SQL and NoSQL databases. SQL is another programming language that is used to efficiently gather data that's held in a database. To a beginner, SQL can be daunting. As such, this workshop series will be focusing on using a NoSQL database. The one in particular that we have chosen is a technology called MongoDB. 

That's it! That was a brief intro to backend, albeit it was a lot of information. However, practice by making your own full stack app, and you'll understand all of these technlogies and be better prepared to learn more new technologies in the future!

## 1.4 MERN 

For our workshop series, we will be using a M.E.R.N. stack. Each of these letters stand for a specific technology.
- **M** - MongoDB
  - A NoSQL database that stores all of our persistent data that the app needs to function, such as users and posts. 
- **E** - Express
  - A backend web application framework that helps us create our APIs. 
- **R** - React.js
  - A frontend JavaScript development library that will help us create our frontend through useful libraries and abstractions. 
- **N** - Node.js
  - A backend JavaScript library that helps us create our server.

### 1.4.1 Downloads

Now that we know exactly what technologies we are working with, we need to actually install them to our computer before we can begin developing our app. 

- Download and install a text editor: [VS Code](https://code.visualstudio.com/download)
- Download and install Node.js: [Node.js](https://nodejs.org/en/download/)
- Install Express. Within a terminal, type:
  - ```bash
    npm install express
    ```
- Create a MongoDB account: [MongoDB](https://www.mongodb.com/)

## 1.5 Demo Showcase
