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
- frontend vs backend
- brief intro to each component

## 1.4 MERN 
- what is mern
- installation guide (node, yarn)

## 1.5 Demo Showcase
- showing off complete demo app