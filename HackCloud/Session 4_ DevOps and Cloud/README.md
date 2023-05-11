
# HackCloud Session 4: DevOps + Cloud

**Date**: 

**Location**: Engineering VI 289

**Teachers**: [Satyen Subramaniam](https://github.com/SubramaniamSatyen), [Nathan Zhang](https://github.com/nathanzzhang)

## Resources

- [Slides](https://docs.google.com/presentation/d/1kzxU0wBjXY__MxoPIz92rYSou5qcdyTtQC6-lc1yRgU/edit?usp=sharing)
- Workshop recording (coming soon)

## What we'll be learning today

- [Containers and Docker](#todo)
- [Demo: Running a Docker Container](#todo)
- [Elastic Beanstalk](#todo)
- [Demo: Running Docker on AWS](#todo)
- [AWS DevOps Tools](#aws-devops-tools)
- [Demo: CI/CD with AWS](#demo-load-balancing-ec2)

## First Topic

## AWS DevOps Tools



## Demo: Load Balancing EC2

In this demo we'll be setting up a CI/CD pipeline for pushing changes to a github repo and seeing them on a deployed version of our app. Visual aids for the below steps are present on this week's slides.

### Setting up IAM Permissions
1. Open the AWS console and navigate to the IAM page
2. Click the "Create role" button
3. Click "EC2" under use cases, then and click "next"
4. Add the `AWSElasticBeanstalkWebTier`, `AWSElasticBeanstalkWorkerTier`, and `AWSElasticBeanstalkMulticontainerDocker` permissions to the role. Then click "next"
5. Give your role a name (ex: EC2ElasticBeanstalkProfile)
6. Click "create role" at the bottom

### Working with Elastic Beanstalk
7. Navigate to the Elastic Beanstalk service dashboard
8. Click the "Create application" button
9. Provide an application name (ex: HackCloudDevOps)
10. Under the platform section, select "Node.js" (we’ll want Node.js 18). Scroll down and click "next"
11. Click "Create and use new service role"
12. Select the IAM Role you created in step 6 from the EC2 instance profile dropdown
13. Click the "skip to review" button and press "submit"

### Setting up your Github Repo
14. Navigate to https://github.com/aws-samples/aws-elastic-beanstalk-express-js-sample
15. Fork the repo by clicking "Fork" and "Create Fork"
16. Clone the repo locally to an empty folder
17. Remove the `"main": "app.js"` line from your package.json file. Then copy the following code into your app.js file.
```Javascript
const express = require('express');
const app = express();
const port = process.env.port || 8080;


app.get('/', (req, res) => res.send('Hello Hack Cloud !'));

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
});
```
18. Commit and push these changes to your local repository

### Working with Code Build
19. Navigate to the CodeBuild dashboard
20. Click "Create build project" 
21. Provide a project name (ex: HackCloudBuild)
22. Change the source to GitHub and make sure the "Connect using OAuth" is selected
23. Click "Connect to GitHub" and follow through with the popup
24. Click the "Confirm" button in the popup (it should automatically close)
25. Select "Repository in my account" and select your repository from the dropdown menu. It should be of the form `https://github.com/[your_username]/aws-elastic-beanstalk-express-js-sample.git`
26. Select "Amazon Linux 2" under environment
27. Select "Standard" runtime
28. Select the `aws/codebuild/amazonlinux2-aarch64-standard:3.0` image
29. In the Buildspec field, click "Insert build commands" and click "switch to editor"
30. Paste the following code in the editor

``` yaml
version: 0.2
phases:
    build:
        commands:
            - npm i --save
artifacts:
    files:
        - '**/*'
```
31. Scroll down and click "create build project"
32. Click "Start build" once the build has been created

### Working with CodePipeline
33. Open the AWS CodePipeline dashboard
34. Give your pipeline a name (ex: HackCloudPipeline) and click "next"
35. Select "GitHub Version1" as your source
36. Authenticate by clicking "Connect to github" (just like in step 23)
37. Select your forked repository in the repository dropdown, and "main" in the branch dropdown. Click "next"
38. Select "AWS CodeBuild" as the build provider
39. Select the Build project name (from step 21). Then click "next"
40. Select "AWS Elastic Beanstalk" as the deploy provider
41. Select the elastic beanstalk environment created in step 13
42. Click "next", scroll down and click "deploy"
43. Wait for your pipeline to run in real time. You can view your site with the Elastic Beanstalk domain


### Using our Pipeline
44. Return to your code and modify the send message
45. Save and commit the change to your repo
46. Return to your CodePipeline dashboard - you'll see the change feeding through the pipeline (and in a couple minutes will see the change on the live site)

When finished, remember to delete your Elastic Beanstalk environment.
