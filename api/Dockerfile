# Use the official Node.js image with version 14
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json ./
COPY package-lock.json ./

# Install app dependencies
RUN npm install --silent

# Copy the rest of the application files
COPY . .

# Expose the port that your Express app will run on
EXPOSE 3001

# Command to run your Express app
CMD ["npm", "run", "start"]
