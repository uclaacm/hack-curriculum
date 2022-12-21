# Servers

> *"Simplicity, carried to an extreme, becomes elegance."*
> 
> \- Jon Franklin


Servers are probably one of the most misunderstood concepts for new developers. If you put ten new developers in a room, it's a pretty good bet that they've all *heard* of servers. Maybe they've been exposed to them through pop culture. They've seen movies or read books where the nerdy, basement dwelling side character is approached by the charismatic protagonist to "hack into the mainframe"[^1] to stop the evil corporation and save the world. Or maybe they've come across the terminology at some point while learning about the fundamentals of programming, with their instructors glossing over it saying, "don't worry about this yet." Whatever the case may be, its likely that a majority of the ten new developers you have confined to a room would not be able to tell you what exactly a server does, or why. Or even more fundamentally, what *is* a server? 

In a way, this lack of understanding almost serves as a hint to what a server is: a blackbox[^2] to process and retrieve information. We see this concept, **abstraction**, fairly frequently in programming and Computer Science. Through abstraction, we make it far simpler for others to interact with our programs. It's a very important concept, and we'll be digging into it in detail throughout this chapter. 

This write-off of servers as blackboxes is great if we just want to use them to get some data. It makes our job much easier! In fact, you interact with servers (indirectly) every single day just by browsing the internet[^3]. However, when it comes time to create our own, it's important to have a deeper understanding. And that's what we aim to accomplish here! By first instilling in you an idea of the *fundamental* concept of a server[^4], and later showing one possible implementation (among many), we'll break the blackbox open and expose the ideas within.

## Servers In General

Put simply, a server is a computer like any other. What distuingishes a regular old computer and a server is that **servers are given the task of listening and responding to requests**. These tend to be requests for data or to perform some task and in general they come from other computers [^5]. We call these "other" computers **clients**. You can think of the interaction between a server and a client in much the same way as the interaction between a customer at a restaurant and the restaurant's staff. Just as a customer can request a glass of water, new silverware, or a half serving of Tiramisú, a client can request some function to be performed or data to be processed and returned. This brings up an important question: how do the client and server communicate? A customer at a restaurant might use English or Portuguese, but unfortunately computers aren't quite there yet. They must have some standard, agreed upon language in order to do so.

### Internet Protocols


how: HTTP requests, REST, JSON

why: security, effiency

what is a webpage? client requests the page and server delivers html,css,js to be rendered


[^1]: Note that a mainframe is just a special name for a server that is capable of performing a large amount of concurrent operations

[^2]: A blackbox is a term for an object that takes some input and transorms it into some desired output, with the user not necessarily knowing the details of how it works

[^3]: Can you imagine if you had to be familiar with all the intricacies of servers just to watch a YouTube video?

[^4]: Note that we won't go over all the low level implementation details. That's for your upper division CS classes to cover!

[^5]: We will see that it's not always the case that requests originate from other computers. A single computer can be both the server and the client, and you'll see that this is actually very common, especially as a developer of full stack applications.