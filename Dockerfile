# DESCRIPTION:	  Create the Constellation platform in a container
# AUTHOR:		  Trevor Snodgrass <trevor@sohacks.com>
# COMMENTS:
#	This file describes how to build the Constellation
#   program using docker so that it can easily be deployed
#   in any enviroment that Docker and Postgres has been setup in
#
# USAGE:
#
#	# Build atom image
#	docker build -t constellation .
#
#	docker run -p 8080:3000 -d constellation
#
#   This will run the container and expose the Docker port
#   of 3000 to the localhost on port 8080 (or to whatever you
#   bind it to on the run command
#


FROM node:latest

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

EXPOSE 3000
CMD [ "npm", "start" ]
