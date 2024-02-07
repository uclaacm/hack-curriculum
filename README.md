# Hack Curriculum 📚

Welcome! We are ACM Hack, a student org dedicated to creating beginner friendly software development workshops and exposing people of non-traditional tech backgrounds to CS! We put on a lot of workshop series. 

Some of our essentials:
- Hackschool: Beginner friendly web development series focusing on frontend
- Stackschool: Full stack web development series focusing on backend
- Hack Sprint: Beginner friendly mobile development series (historically we have covered React Native, iOS, and Android)
- Hack Cloud: Cloud computing series covering AWS fundamentals and general cloud computing concepts
- Tooling Series: Covering tools such as git and vim that aid in software development
- ... and more!

View our archive [here](https://hack.uclaacm.com/archive).

If you want to get in touch, join our [discord](https://discord.gg/3GSPECbCnE)!


## Development Set Up
The curriculum website involves both a frontend (in `/website`) and a backend (in `/content`). In order to get up and running, you need to first install the necessary dependencies in each. 

To install the necessary dependencies you can run the following commands (starting from the root of the project):

```sh
$ cd website
$ npm install # installs the dependencies on the frontend
$ cd ../content
$ npm install # installs the dependencies on the backend
$ cd .. # return to root
```

Once you've done this, you can start the app by running `./start` in the root directory!
