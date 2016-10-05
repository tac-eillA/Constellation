# Constellation
![Constellation Logo](http://trevorsnodgrass.com/images/constellation.png)

**Constellation** is an open source platform for building easy to use and update scheduling systems for schools.  

This project is built on top of node js, electron, jade, and postgreSQL to make editing and tailoring easy for programmers both experienced and new. We also strive to keep the user interface as simple as possible, therefore little to no base CSS is provided to allow customization without worry of overrides. (This may change as I get tired of how base html input boxes look)

# Installation

To install and get running simply clone the repo and make sure that you have node js installed and up to date, run:

> **npm install**

Then after all dependencies are installed, run:

> **npm start**

To start the app server on localhost:3000 (default but can be changed)

# Installation using Docker

If you want to use Docker to run and test this application, we have included a Dockerfile to do so.

> Note that you must have docker installed and setup in order to use this so unless you are comfortable with using docker I would simply use the standard node js setup for testing. Eventually we will release a better integrated Docker version of this application.

Once you have Docker installed and setup, run the following line in terminal from the project root:

> **$ docker build -t <your username>/constellation .**

This will build your docker image which can be run using the following command:

> **$ docker run -p 8080:3000 -d <your username>/constellation**

This runs your docker image with the name constellation and binds the port 3000 within your docker image to port 8080 on your local machine. 

> Note that the html2jade.zip file will need to be unziped and installed/run in the same way but inside its own directory. It was origianlly a seperate project that I added to make contribution easier for non-jade programmers.

# Contributing

I am more than happy to welcome anyone and everyone who wants to contribute to this project. To do so, just fork the respository, create your changes, and submit a pull request back.

All pull requests will be reviewed and accepted by myself and I will try to get to them as soon as humanly possible (so I apologise if it takes a few hours for me to accept your request)

> Everyone who creates a pull request is more than welcome to add their name, position, company, etc to the Contributors.md file so that your work is noted. Regardless anyone with an accepted pull request will be added.
