
# HackCloud Session 1: Intro to Cloud

**Date**: April 20,2023

**Location**: Engineering VI 289

**Teachers**: [Satyen Subramaniam](https://github.com/SubramaniamSatyen), [Katelyn Yu](https://github.com/katelynsyu)

Hello, and welcome to session 1's README! 

## Resources

- [Slides](https://docs.google.com/presentation/d/1a9q5RX-Zm4N7WlFx7Xn0TanjuDSlVu6gsEcvSaeoXdE/edit?usp=sharing)
- Workshop recording (coming soon)

## What we'll be learning today

- [What is HackCloud?](#what-is-hackcloud)
- [Intro to Cloud Computing](#intro-to-cloud-computing)
    - [On-Premise Model](#on-premise-model)
    - [Cloud-Computing Model](#cloud-computing-model)
        - [Aside: Globally Distributed](#aside-globally-distributed)
        - [Security in the Cloud Model](#security-in-the-cloud-model)
- [AWS Service Areas](#aws-service-areas)
- [Demo: Explore Amazon Web Service](#demo-explore-amazon-web-service)
- [IAM](#iam)
    - [What is Identity Access Management (IAM)?](#what-is-identity-access-management-iam)
    - [IAM: Policies](#iam-policies)
    - [IAM: Targets](#iam-targets)
- [S3: Amazon Web Services](#s3-amazon-web-services)
    - [What is S3?](#what-is-s3)
    - [S3 Storage Model](#s3-storage-model)
    - [S3 Features](#s3-features)
- [Demo: S3 Buckets and Versioning](#demo-s3-buckets-and-versioning)
- [Demo: Deploy a Static Site with S3](#demo-deploy-a-static-site-with-s3)

## What is HackCloud?
Hi friends! Welcome to HackCloud! We're really happy to have you here, and we're looking forward to learning lots of cool stuff together.

First and foremost, what is HackCloud? (Hint: We're not hacking the cloud)

The focus of this workshop series is to hack some of the question marks surrounding cloud computing. We’ll cover what it is, why we use it, what we can do with it, and how we use it. By the end of this quarter, you guys will hopeful have a strong intuition for cloud computing fundamentals and best practices and hopefully be highly familiar with and able to use Amazon Web Services for all your project needs.

So without further ado, off we go! Adventure awaits!

## Intro to Cloud Computing
The first questions we really want to answer is what is cloud computing and why do we want to use it?

To answer this question, I’ll illustrate with an example. Say Carl, our lovable, intrepid, balloon-selling adventurer from Up, is expanding his business horizons. He wants to open a streaming platform called Paradise Falls - completely not ripping off Disney+. With his streaming service, people can watch shows and movies for only $9.99 a month (exclusions apply; see store for details). On top of that, to differentiate his business model from competitors, Carl is going to give you a customizable balloon for every show you watch! Pretty cool if you ask me. 

First, we're going to have to look at what tech and tech capabilities Carl's business needs to do this.
- In terms of hardware, it seems like Carl needs
    - Storage space for storing the films and shows that make up Paradise Falls
    - Servers to deal with requests from clients to watch a certain show
    - Network hardware to connect servers to storage and to the internet so that users can actually access the site and watch their shows 
- In terms of tech capabilities, Carl needs
    - Low cost
    - Scalability: How easily can the model handle a growing amount of work?
        - for our purposes, you can also think of this as: how easily can we increase our coverage in geographic size?
    - Reliability: How trustworthy is this is this system with our data? Will we end up losing data? Will we get the correct data when we ask for something?
    - Availability: Will our model always have an answer for us within a short amount of time?
    - Security: How safe is our data in the model? How do we ensure that people who shouldn't be looking at our data aren't looking at it?

There are 2 ways for Carl to get the hardware he needs - the on-premise model and the cloud-computing model.

### On-Premise Model
In the on-premise model, Carl **buys** and **manages** all the hardware that he needs. Let's look at the pros and cons of this.
- **Pros**:
    - **Security**: The on-premise model does provide security because you own everything
       - nothing is going on or changing that you don’t explicitly allow
- **Cons**:
    - **Expensive**
        - Because Carl has to buy all the hardware, there is a large upfront cost
        - Managing the hardware is not cost efficient because he would have to do regular and expensive troubleshooting/maintenance to keep everything running smoothly
    - It's **not reliable** because if one of his components breaks then his entire site goes down
    - It’s **not available** because people far away from the location of Carl's server won’t get their content quickly
        - Say someone in Italy tries to access the site and watch Frozen. If the servers are here in California, they will be waiting a millenia and a half for their movie to load. 
    - This model is definitely **not scalable**. 
        - In order to scale with this model, Carl needs to forecast scaling ahead of time.
        - Then he needs to buy/rent property in a different location or even country (and deal with the bureaucracy within) to set up a server and assorted hardware there
        - Then he has to buy more servers, storage, and network hardware to set up the site at the new location
        - To get the site up and running, Carl has to schedule downtime (a time when the site doesn’t work) in order to install the servers
        - And he has to deal with more bureaucracy in order to manage the new site
        - All of this expense and hulla-balloon just to get fast speeds over a wider region

So maybe on-premise computing isn't the best idea, especially not for a small business.

### Cloud-Computing Model
The other option Carl has is to invest in cloud computing.

What does this mean?

Well, functionally, we’ve yeeted all the hardware needs to a trusted third party like Amazon Web Services, Google Cloud Platform, Microsoft Azure, etc. In this model, we **don’t have to buy and manage** storage, servers, or network hardware. We do, however, have control of virtual compute instances, storage, and networking components.

Tl;dr: we click stuff on a website, and the third party takes care of all the physical stuff to make our specified storage, networking, and instances happen. As a result, we have control of the hardware’s functionality without having to deal with managing all the hardware.

It turns out that this model solves all of our issues fromt he on-premise model!
- **Cheap**
    - Carl doesn’t have to buy the hardware! He rents it from Amazon for a discounted price!
    - He doesn’t have to worry about paying for hardware maintenance because Amazon takes care of it.
- Amazon takes care of **reliability**, so we can trust that the site won’t lose data and it won’t go down for any old reason.
    - It also doesn’t have a single point of failure - ie our singular server if we used the on-premise model
- Amazon takes care of **availability**
    - They have many servers and resources distributed around the world
    - We just select the ones we want and, easy peasy, we got locations to service requests for people so they don’t have to worry about long delays.
- **Very, very scalable** because they’re **globally distributed**! 
    - You literally click a button and you have a new server in a different part of the world to expand your reach globally
    - The cloud is designed to be nearly limitless, so it’s the responsibility of cloud providers to satisfy the requirement for sufficient networking and compute capacity, leaving you free to change resource size and allocations on demand.

This sounds like a pretty good deal to me! Carl agree's and will definitely be utilizing a cloud computing model.

#### Aside: Globally Distributed
What does globally distributed mean and what does that mean for us using it?

Amazon is cool (and rich), so they already have servers and resources placed globally that we can utilize. However, to use them, we must specify the availability zone and region that we want. 
- Each **region** is a separate geographic area. Eg Italy or America
- **Availability zones** are multiple, isolated locations within each Region.
- Local zones provide you the ability to place resources, such as compute and storage, in multiple locations closer to your customers.

Then when you have all these servers and storage in different locations, you can distribute your data across the locations, and the servers will ensure that requests get answered in a very short amount of time in all of these new places. Now you can easily scale globally by distribute content globally to data centers on different continents to ensure all users get smooth video!

#### Security in the Cloud Model
"Wait! Mr. Fredricksen!" yells Russell, "What about security!"

Yeah, I didn't really mention security when talking about cloud computing and here's why.

Security is a tough thing to maintain with cloud computing. Unlike the on-premise model where you can enforce security because you own all the equipment and the connections, in the cloud computing model we are only renting the hardware. Thus, it’s a lot harder to maintain security because anyone at Amazon or a hacker, if Amazon was hacked, could just go onto the server and inspect all our data. Also since everything is on the cloud, a platform that everyone is technically allowed access to, we need to figure out how to ensure we only allow access to folks we want to have access.

Cloud computing providers follow 2 principles to help bolster security: 
- **Shared Responsibility Model**
    - In a shared responsibility model, the provider and client have a mutual understanding of their responsibilities to enforce security
        - The provider takes care of security relating to the cloud and their hardware
            - They secure the hardware, OS and data center integrity, network connections, etc.
        - The customer is responsible for ensuring security on the user's side - basically anything that accesses the cloud.
            - Thus, they must take care of client-side configurations, firewalls, and encryption
            - Note: client-side encryption is a huge part of ensuring security in the cloud-computng model
- **Identity Access Management (IAM)**
    - This will be covered more in-depth later on this session, but I will tease it now
    - The idea here is that we don't want everyone to have equal access in viewing/tampering with our system and data - this is the **principle of least privilege**
        - As a result, our default is do deny everyone access to everything by default, creator exempted of course.
        - Then, you explicitly give certain groups permission to access or modify the system or in a certain way
        - In this way, you control who access your data and who can manipulate it, further securing the system.
        - If you are familiar with file permisions (read, write, execute), this is very similar in that you want certain groups to have certain permissions but not others to ensure the integrity of your file.

## AWS Service Areas
Now, we’re going to shift from the overall benefits of cloud computing to the specific services that Amazon Web Services gives us because it’s not about what we can do for Amazon. It’s about what Amazon can do for us.
- Compute: eg. EC2, Lambda, Kubernetes (EKS, ECS)
- Storage: eg. S3 (blob storage) EBS, EFS, FSx
- Databases: eg. RDS (relational), DynamoDB, Redshift
- Networking: eg. VPCs, Route 53, API Gateway, etc
- Machine Learning
- Analytics
- Security
- IoT (Internet of Things)

## Demo: Explore Amazon Web Service
1. [Create](https://portal.aws.amazon.com/billing/signup?type=enterprise#/account) an AWS account
2. [Sign in](https://aws.amazon.com/marketplace/management/signin) to your AWS account
3. Click on the "services" button on the top left. Explore the service areas AWS offers (left scroll menu) and the specific services that fall under those service areas (right scroll menu). 
4. Click on the "command line" icon near the top right This will open the command line interface (CLI). Although our focus will be on how we can make use of the AWS graphical user interface, developers will often make use of the CLI to automate processes and streamline development. 
5. Click on the "region" dropdown (the button will display your current region - likely N. Virginia). Try swapping over to a different region. Most cloud services are created under a single region, and by default will only be displayed to a user if the region matches the current region.
6. Click on the "account" dropdown. Here we can explore and modify user details.

![AWS Console](https://user-images.githubusercontent.com/66653384/232891900-8bd96977-0527-4696-8856-52d03a5800ad.png)

## IAM

### What is Identity Access Management (IAM)?
Let's say that Russell is hoping to visit his good friend Carl and knocks on his front door. Unfortunately, Carl recently misplaced his glasses, so wants to verify Russell's identity asks him to present his Grape Soda badge. Russell realizes he left the badge at home, so Carl asks him to return tomorrow with the badge. 

This short story models the concept of identity access management in cloud computing: here, Russell was only allowed access into Carl's house when he had specific credentials with him - following the principle of least privilege. More broadly, Identity Access Management refers to the way cloud computing providers manage granular permissions to access services to users. To enforce these permissions, we group permissions (in our case access to Carl's house) under a **policy** (Russell's badge), and apply the policy to a **target** (Russell himself).

### IAM: Policies
To aid with permissioning, cloud providers have extensive lists of specific permissions. These permissions are grouped under default policies, but can also be handpicked for custom policies. Policies, described by **policy documents**, are written in JavaScript Object Notation (JSON), and although the specifics of these documents are out of our scope, the most important features are worth noting. All policies will consist of an "Effect", an "Action", and a "Resource" field. Below is a policy document aligning with our example of Russell visiting Carl.

```JavaScript
{
  "Version": "2012-10-17",
  "Statement": [
      {
          "Sid": "Stmt1380877761162",
          "Effect": "Allow",
          "Action": "Houses:Entry",
          "Resource": "Country::State::City::Houses:::HouseNum/*"
      }
  ]
}
```
The "Effect" field of a policy document will either be "Allow" or "Deny" - based on whether we want to apply the included permissions or remove them. The "Action" field lists out the specific permissions under the policy (in our case entry to a house). Finally, the "Resource" field dictates which specific objects this policy should apply the permissions to (Russell only has access to Carl's house, not all houses).

### IAM: Targets
Once we've written or selected a policy, we must apply the policy to a target (who will make use of the policy to carry out some actions). The four types of targets are:
- User
- Role
- Group
- Resource

In our example, our target was a single **user** - Russell himself. Now imagine that instead of wearing the Grape Soda badge, Russell superglues it to his sash. Under these conditions, Russell only has access to Carl's house when wearing his sash, a notion analogous to the concept of a **role**. Roles have become increasingly popular in the cloud computing space due to aligning closely with the principle of least privilege: users can assume a role (put on the sash) just before starting a task, complete their work, then yield the role (remove the sash), only having elevated permissions when needed. If Russell were to instead share the badge with his troop, our target would become a **group**, where all members share the same permissions through a shared policy document. Finally, if Russell were to give his robotic dog the badge and program it to visit Carl, the robot would exemplify a **resource** as a target. In the cloud computing, this most often takes the form of service.

## S3: Amazon Web Services

### What is S3
When first branching into cloud computing, AWS started simple: how can we store and retrieve data remotely. Through this, AWS created their first cloud service: Simple Storage Service or S3. S3 was designed with the goals of high availability, reliability, scalability, security, and performance (these should sound familiar). Let's take a look at how they met some of these goals.

### S3 Storage Model
S3 is considered to be an **object storage** or **blob storage** service, allowing users to store any file type they'd like, with (essentially) any size. Data is stored in a **flat namespace**, essentially a single large bucket. Users are able to store **objects** (their files) in S3 by placing them in a **bucket** (similar to the concept of a folder). S3 allows you to organize these objects within a bucket by creating **folders** (in this case acting as sub folders). Note that all objects must be stored under a bucket. As seen in the visualization below, S3 stores these images using their theoretical path as a key - speeding up retrieval times by removing the overhead of traversing the tree structure of a traditional file system. 

![S3 Storage Model](https://user-images.githubusercontent.com/66653384/232940154-75499cd9-2a97-4ca8-afb7-0c44e5aeece6.png)


### S3 Features
In order to be highly reliable, when data is uploaded to S3, it automatically stores redundant copies of data across three availability zones. S3 also offers the option to store data in an additional region (mostly for helping companies meet compliance regulations). **Region replication** also serves to enhance availability by storing content closer to users who may want to access it. S3 also provides options for versioning, redundantly retaining all versions of any uploaded file and allowing for easy reverts.

S3 is also designed to optimize price and performance: although the standard tier (the default storage option) is significantly cheaper than alternatives, Amazon offers mores specific storage tiers, trading price for longer retrieval times. S3 also offers storage tiers that charge by access, and significantly reduce of cost of pure storage. To build upon these different tiers, S3 supports automated **lifecycle rules** to transition between the tiers. 

![S3 Storage Tiers](https://user-images.githubusercontent.com/66653384/232948878-4442f3d2-c458-416b-a056-191d156ecc03.png)

As amazon's first cloud service, S3 still retains a few legacy features, the most prominent of which are **Access Control Lists** or ACLs. ACLs provide the ability to declare specific permissions at an object granularity, more specific than the more modern techniques of using bucket IAM policies (here the bucket acts a a resource target) or user IAM policies (and here the user is the target). 

## Demo: S3 Buckets and Versioning

In this demo we'll walk through how to setup and make use of S3 versioning. Visual aids for these steps can be found in this week's slides. 

1. Open AWS console in browser and sign in
2. Navigate to S3 service
3. Click the "create bucket" button (either of them)
4. Give your bucket a unique name
5. Uncheck the block all public access checkbox and check the acknowledge box
6. Scroll to the bottom of the page and click "create bucket"
7. Click the bucket name to open more details
8. Open the permissions tab for the bucket
9. Click the "Edit" button in the bucket policy pane
10. Paste the following code in the policy field. Be sure to replace the `<<Enter Your Bucket Name>>` with your bucket's name

```JavaScript
{
  "Version": "2012-10-17",
  "Statement": [
      {
          "Sid": "Stmt1380877761162",
          "Effect": "Allow",
          "Principal": {
              "AWS": "*"
          },
          "Action": "s3:GetObject",
          "Resource": "arn:aws:s3:::<<Enter Your Bucket Name>>/*"
      }
  ]
}
```
11. Click "Upload"
12. Drag and drop or select your first version of your image file
13. Click on the file name and click on the "Object URL" field (this should open the image in a new tab!)
14. Return to the bucket and click "Upload"
15. Drag and drop or select your second version of your image file. Be sure it is named identically to your first version
16. Return to the same object url and refresh the page (the image will now have changed!)
17. Return to the bucket and click on the image file. navigate to the "Versions" tab
18. Delete the latest version by checking the box and clicking delete
19. Refresh the object url page to see the reverted image.

## Demo: Deploy a Static Site with S3

In this demo we'll deploy a static react app using S3. Visual aids for the following steps are present on this week's slides.

0. Complete steps 1-10 from the previous demo (initializing our bucket)
1. Make sure to your bucket is empty
2. Navigate to the "Properties" tab
3. Scroll to the bottom of the page
4. Specify `index.html` for both the index document and error document
5. Open an empty folder in your text editor of choice. Open this folder in a terminal
6. Run the command `npx create-react-app [app name]` in this folder (replace [app name] with a name of your choice)
7. Run the commnad `cd [app name]`
8. Run the command `npm start`. Now you should be able to view the default react app by navigating to localhost:3000
9. Terminate your program (Ctrl + C) and run the command `npm run build`
10. Upload the contents of the build folder to the S3 bucket
11. Click the "Properties" tab and scroll to the "Static website hosting" section
12. Click the link to view your deployed website
