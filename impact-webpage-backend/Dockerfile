# Use the latest Node.js LTS version
FROM node:20

# Set environment variables
ENV NODE_ENV=production

# Set maintainer info
LABEL maintainer="geoffrey" version="1.0" description="impact-backend"

# Set working directory
WORKDIR /impact-webpage-backend

# Copy package.json and install only production dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy only necessary files
COPY . .

# Expose the backend port
EXPOSE 5008

# Start the application in production mode
CMD ["npm", "run", "dev"]
