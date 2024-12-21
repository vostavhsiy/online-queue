# Define the builder stage
FROM node:22-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install  --force

# Copy all the files
COPY . .

# Build the Next.js app
RUN npm run build

EXPOSE 80
ENTRYPOINT npm run start
