# Use an official Node runtime as a parent image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install any dependencies
RUN npm install

# Copy the current directory contents into the container
COPY . .

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Define the command to run your app
CMD [ "node", "server.js" ]

