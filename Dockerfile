# Use an official Node.js runtime as a parent image
FROM node:14-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the current directory contents into the container at /app
COPY . .

# Set the environment variable for the Node.js app
ENV NODE_ENV=production

# Expose the port that the app will listen on
EXPOSE 3000

# Run the command to start the app
CMD ["npm", "start"]