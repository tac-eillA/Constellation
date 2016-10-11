# Constellation
![Constellation Logo](http://trevorsnodgrass.com/images/constellation.png)

**Constellation** is an open source platform for building easy to use and update scheduling systems for schools.  

This project is built on top of Node JS, Express, React, and PostgreSQL to make editing and tailoring easy for programmers both experienced and new. We also strive to keep the user interface as simple as possible, therefore little to no base CSS is provided to allow customization without worry of overrides. (This may change as I get tired of how base html input boxes look)

# Installation
### Installation Pre-requisites
* You have the [latest v4.x.x of Node.js](https://nodejs.org/en/download/releases/) installed.
* Ensure that you have the connection information for the PostgreSQL database for the application (either remote or local).
* Ensure that your database's service account has full access to the database.
### Install and Run (local-only development)
1. Clone the repository.
2. Create the PostgreSQL configuration file:
    1. Create a copy of the default PostgreSQL config file: `/dir_to_codebase/config/postgres-config.default.js`
    2. Rename the copy to `postgres-config.js` and place it into the same directory (`/dir_to_codebase/config/`).
    3. Modify the `postgres-config.js` file and add your database's configuration information.
3. Create the server configuration file:
    1. Create a copy of the default server config file: `/dir_to_codebase/config/server-config.default.js`
    2. Rename the copy to `server-config.js` and place it into the same directory (`/dir_to_codebase/config/`).
    3. Modify the `server-config.js` file and add your server's hostname and port information.
4. Open a Node.js Command Prompt and run the following command:
    * `npm run dev`
### Install and Run ([OpenShift](https://www.openshift.com/))
* UPDATE LATER

# Installation using Docker

If you want to use Docker to run and test this application, we have included a Dockerfile to do so.

> Note that you must have docker installed and setup in order to use this so unless you are comfortable with using docker I would simply use the standard node js setup for testing. Eventually we will release a better integrated Docker version of this application.

Once you have Docker installed and setup, run the following line in terminal from the project root:

> **$ docker build -t username/constellation .**

This will build your docker image which can be run using the following command:

> **$ docker run -p 8080:3000 -d username/constellation**

This runs your docker image with the name constellation and binds the port 3000 within your docker image to port 8080 on your local machine.

# Contributing

I am more than happy to welcome anyone and everyone who wants to contribute to this project. To do so, just fork the respository, create your changes, and submit a pull request back.

All pull requests will be reviewed and accepted by myself and I will try to get to them as soon as humanly possible (so I apologise if it takes a few hours for me to accept your request)

> Everyone who creates a pull request is more than welcome to add their name, position, company, etc to the Contributors.md file so that your work is noted. Regardless anyone with an accepted pull request will be added.

## Things that need to be done

If you do want to contribute or are already contributing to this project here are a list of open issues/things that need to be done in order to continue onto the next stage.

1. Login verification (so that user's can't just do to /dash to enter the dashboard without putting in a valid username and password.
2. Creating PostgreSQL databases models for login, students, and classes as well as test database info to be used as a proof of concept
3. A way for sysadmins to easily be able to add classes, students, etc via a csv
4. The actual dashboard design
5. Database queries within the core node app
6. If you think of anything else you are more than welcome to open an issue