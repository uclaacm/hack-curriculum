
# HackCloud Session 2: VM Computing

**Date**: 

**Location**: Engineering VI 289

**Teachers**: [Satyen Subramaniam](https://github.com/SubramaniamSatyen), [Jonathan Si](https://github.com/jsi19)

## Resources

- [Slides](https://docs.google.com/presentation/d/1a04fSUrM0lNZvqn1KKDXmr3kwype8WE_KIRmebB54bs/edit?usp=sharing)
- Workshop recording (coming soon)

## What we'll be learning today

- [Types of Cloud Computing](#types-of-cloud-computing)
- [What is a Virtual Machine and Why?](#what-is-a-virtual-machine-and-why)
- [Demo: Apache Web Server + EC2](#demo-apache-web-server--ec2)
- [EBS - Elastic Block Storage of Cloud Computing](#ebs---elastic-block-storage)
  - [What is Disk Storage?](#what-is-disk-storage)
  - [Using Virtual Disks](#using-virtual-disks)
- [Demo: EBS - Virtual Storage](#demo-ebs---virtual-storage)
- [ALBs and ELBs - Load Balancing](#albs-and-elbs---load-balancing)
  - [What is Load Balancing?](#what-is-load-balancing)
  - [Types of Load Balancers](#types-of-load-balancers)
- [Demo: Load Balancing EC2](#demo-load-balancing-ec2)


## Types of Cloud Computing
## What is a Virtual Machine and Why


## Demo: Apache Web Server + EC2
Below we'll outline how to create your own Apache web server - no experience required! Visual aids for these steps are present on this week's slides.
1. Open your AWS console and navigate to the EC2 service
2. Click "Launch instance" (either button)
3. Enter an instance name
4. Leave default Amazon AMI and instance type
5. Disable any adblock you have active, then enter a key name and click "create key" (it should automatically download a key)
6. Check the allow access boxes
7. Expand the "Advance" details menu and scroll to the bottom
8. Copy the following code into the "user data" field

```shell
#!/bin/bash
sudo yum update
sudo yum install -y httpd
systemctl start httpd
systemctl enable httpd
httpd -v
```

9. Confirm your instance is in "Running" status, and click the "Connect" button
10. Click "connect" to use SSH to connect to your EC2 instance in your browser. An alternative would be to try to use your downloaded SSH key to connect from your local machine
11. Run the following commands in the terminal (run one at a time). This will let you navigate to the default rendering directory, create an `index.html` file, give yourself write permissions, and write a header to it


``` shell
cd var/www/html
sudo touch index.html
sudo chmod 777 index.html
sudo echo '<h2>Buy My Food!</h2>' > index.html
```

12. Run `cat index.html` to confirm the write was successful. The terminal should print `<h2>Buy My Food!</h2>` on the next line.
13. Return to the EC2 instance page and open the public IP address. Make sure you are using port 80 to connect (HTTP not HTTPS).
14. After finished (some of the later demos will use this), delete your instances.

## EBS - Elastic Block Storage

### What is Disk Storage?
Now that we've worked with EC2 a little, let's consider where our `index.html` file from our demo is being stored? If we build off of our understanding of EC2 as a Virtual Machine, we realize we must also have a notion of a **Virtual Disk** - a place to permanently store our data - which we find in AWS's **Elastic Block Storage** (EBS). As a brief bit of context and motivation for this memory structure, let's consider an example.

Imagine Linguini is working the night shift at Gusteau's, and is getting a bit sloppy: he's left their most expensive ingredients out in the kitchen overnight, forgetting to return them to the fridge. After closing up shop for the night and returning in the morning Linguini is shocked to see that rats have infested the kitchen and eaten every last fruit and veggie. 

Linguini's learned an important lesson: we can store small amounts of food in kitchen for fast access (analogous to storing data in our EC2 instance's RAM), but cannot expect food in the kitchen to last forever. Instead Linguini should remember to return food to the fridge (analogous to virtual disk storage for our EC2 instance), a bit slower to access, but much more dependable - and safe when he closes shop (powers off his EC2 instance). 

### Using Virtual Disks
Amazon Elastic Block Storage (EBS) allows users to provision virtual disks for their EC2 compute instances. A single virtual disk is called a **volume**, and all EC2 instances must have at least one volume (just like all computers come with an inbuilt hard drive). 

The simplest way to create an EBS volume is to do so when creating an EC2 instance - as we did in our first [demo](#demo-apache-web-server--ec2). Alternatively, we can provision an EBS volume directly (as we will see shortly). After we've created an EBS volume, we must attach it to an EC2 instance - a process known as **mounting**.

To understanding how mounting works, think back to a time where you may have plugged in a USB device to copy some files. How did you access the device? Depending on your operating system, you most likely did so by opening a file explorer and opening the drive with the directory location `E:/`. Similarly, when mounting an EBS volume to an EC2 instance, the drive is mapped to specific directory, often `/dev/abc` - with the final folder being configurable during the mounting process.

Just like EC2 instances EBS volumes are highly customizable with the following optimizations storing on flash or hard disk:
* Input/Output Operations Per Second (IOPS)
* Throughput - the number of bytes per second
* General purpose
* Cold - optimized for price

## Demo: EBS - Virtual Storage

Below we will outline how to mount extra EBS storage to an EC2 instance. Visual aids for the below steps are present on this week's slides.

1. Navigate to the EC2 dashboard
2. Click "Instances"
3. Note down the region before clicking "Create volume"
4. Set the size to 1 GiB
5. Modify the region to match with the region from step 3. Scroll down and click "Create volume"
6. Select the instance, expand actions, and "Attach instance"
7. Select your Apache web server instance and click "Attach volume"
8. To clean up, detach your volume and delete it

## ALBs and ELBs - Load Balancing

Let's say Linguini's web server blog is running great - folks from across the world are downloading recipes and sharing stories. But as the number of users grow, soon users begin to encounter a `503 error - the requested service is not available`. Recall from last time that **availability** refers to the notion of our web server being reachable from different places - in our case our web server is being overloaded and can't handle everyone's requests. How might we be able to address this?

### What is Load Balancing?
Back at work, Linguini has structured his restaurant like most others: when a new party enters, a host will greet them and guide them to a table. Why has he organized his restaurant like this? Upon reflection, Linguini realizes that doing so allows for each of his servers to handle a balanced workload. This notion of having a single worker (Linguini's host) handle balancing requests, while all other workers (Linguini's servers) handle servicing the workload is known as **load balancing**. 

In the context of our web server, our EC2 instances are analogous to Linguini's servers, but what about Linguini's host? We'll introduce a new AWS service, a **load balancer** (with two variants) for achieving this architecture. Below is a diagram outlining how users can connect to our instances.

![Load Balancing](https://user-images.githubusercontent.com/66653384/234730578-15e47d23-b637-43a2-8242-59617cb6261f.png)

It is worth noting that we still have a bottle neck in this architecture - but instead of it being at a single EC2 instance, it is now at our load balancer (notice how all requests must pass through it). Fortunately, in practice this doesn't become an issue by minimzing the responsibilites the load balancer and direction different domain names (ex: .com vs .ca) to different load balancers. 

### Types of Load Balancers

AWS offers three types of load balancers:
1. Application Load Balancer (ALB)
2. Elastic Load Balancer (ELB)
3. Network Load Balancer (NLB)

Most scenarios will make use of an Application Load Balancer - a bit slower than the other types, but with the most features - and this is the type of load balancer we'll be using for our demo. Apart from allowing us to redirect our requests, load balancers allow us to build **health checks** into our architecture - only directing requests to instances that are running properly. Each of these load balancers also allow for **sticky sessions** meaning that if somebody is directed to a server, they'll continue to communicate with that server (be stuck to it - hence the name), for the remainder of their work session. 

![Load Balancing](https://user-images.githubusercontent.com/66653384/234732369-6e978c2c-f3ec-44a0-913d-0304701cb66a.png)

Finally, before we proceed to the demo, let's clarify some terminology we'll see. A **Virtual Private Cloud** (VPC) is a virtual network that spans a single region: this would contain any services (EC2 instances, ALBs, etc.) that have been allocated in those regions. A VPC can be subdivided into **subnets** smaller subnetworks that are contained to a single data warehouse (or single availability zone). Organizing with subnets allows AWS to move your services closer to one another to minimize latency and can be used to configure permissions to resources. In the context of a load balancer, a **target group** is used to organize the services that a load balancer will split requests between. In our case, our target group will simply contain a couple EC2 instances, but could theoretically include generic IP addresses or other load balancers among other targets.

## Demo: Load Balancing EC2

Below we will outline how to configure an ALB to balance requests between EC2 instances. Visual aids for the below steps are present on this week's slides.

1. Repeat the [Apache Web Server + EC2 Demo](#demo-apache-web-server--ec2) - you will need 2+ instances to balance requests between them. Be sure to allocate them in the **same** region (different availability zones are fine if you'd like) and write different text into the `index.html` file.
2. Return to EC2 dashboard and select "Load balancers"
3. Click "Create load balancer"
4. Click "Create" under the Application Load Balancer
5. Enter a name for your ALB
6. Scroll to the Network mapping section and check the boxes for each available subnet
7. Scroll to "Listeners and routing" and click "Create target group". This should open in a new tab
8. Leave the target type as instances
9. Give your target group a name. Scroll to the health checks section and checks specify `/index.html` as the target location
10. Scroll to the bottom of the page and click "Next"
11. Select both of your EC2 instances
12. Click "Include as pending below"
13. Scroll down and click "Create target group"
14. Return to the load balancer tab and click the refesh icon. Select your new target group from the dropdown
15. Scroll to the bottom of the page and click "create load balancer"
16. On the load balancer page, click your new load balancer
17. Switch to the security tab and click on the security group 
18. Click “Edit inbound rules”
19. Add a new rule allowing HTTP access for everything (0.0.0.0/0). If you’re feeling up for it, specify your Target group id here instead.
20. Return to the load balancer page, copy the IPv4 DNS and paste it in the browser. Refresh the page to see it route differently!
21. Optional: You can view your health checks on the target groups page
22. Remember to deallocate your resources when done! (You wouldn’t be charged for something of this scale, but bad practice)

Challenge/Extention: Instead of load balancing between a fixed number of EC2 instances, make use of auto scaling. To do this, you'll need to...
1. Create an AMI (A template of your EC2 instance)
2. Create an auto scaling group
3. Add the auto scaling group as target of your Load Balancer

As a final resource, AWS has a [walkthrough](https://docs.aws.amazon.com/autoscaling/ec2/userguide/tutorial-ec2-auto-scaling-load-balancer.html) of this process.
