# Asset Finance Management API - Backend Documentation

## Table of Contents
1. **Introduction**
2. **Project Overview**
3. **Backend Technologies**
4. **Getting Started**
5. **Authentication**
6. **API Endpoints**
7. **Database**
8. **Logging and Monitoring**
9. **CI/CD render.com**
10. **Postman Collection**

## 1. Introduction
Welcome to the documentation for the backend of the "Asset Finance Management API." This document provides an overview of the backend components, technologies, and how to get started with the project.

## 2. Project Overview
"AFM" aims to provide a web-based platform for users to apply for asset finance. The project involves both frontend and backend development with a focus on a MERN (MongoDB, Express.js, React, Node.js) stack. This documentation focuses on the backend aspect of the project.

## 3. Backend Technologies
The backend of the Asset Finance Management Platform is built using the following technologies:
- **Node.js**: A JavaScript runtime for server-side development.
- **Express.js**: A web application framework for building RESTful APIs.
- **MongoDB**: A NoSQL database used to store user and finance application data.
- **Mongoose**: An Object Data Modeling (ODM) library for MongoDB.

## 4. Getting Started
To set up the backend of the project, follow these steps:
1. Clone the project repository.
2. Navigate to the 'server' directory.
3. Run `npm install` to install the required dependencies.
4. Configure the MongoDB connection in a `.env` file.
    `NODE_ENV=development`
    `DATABASE_URI=Mongodb API key`
    `PORT=5500`
    `ACCESS_TOKEN_SECRET=3a65a2a53d59cd4b6da9f7efb4011780c107efc86d5ec5e0741e39d559df37c09bf799a4559abfa25fededd54786964910126da623119d5164acf7fc8a2857ad`
    `REFRESH_TOKEN_SECRET=30067da3d329851283a7c4cb9a15038c3d9de376ea98924a5f8c868a5b8343376b1271ea6b7b8fe31d44619a6f696aa1b83e6e56e8ad6b170f9f2e2686a4eb03`
5. Start the server using `node server`.

## 5. Authentication and Authorization (JWT)
The backend of the Asset Finance Management Platform uses JWT (JSON Web Tokens) for secure authentication and authorization. JWT is a widely adopted method for token-based user authentication.

### 5.1. Authentication
- Users can register using the `/auth/register` endpoint, providing their credentials.
- To log in, users can make a POST request to the `/auth/login` endpoint, providing their username and password.
- Upon successful login, the backend generates an access token and a refresh token. The access token is used for authorization, and the refresh token is used for obtaining new access tokens when they expire.

### 5.2. Authorization
- The backend ensures that authenticated users have the necessary permissions to access certain resources.
- Authorization is implemented on specific API endpoints, such as `/applications`, to ensure that users can only access their own finance applications.

### 5.3. JWT Tokens
- The access token is a short-lived token (e.g., with a 15-minute expiry) that provides secure access to protected routes.
- When the access token expires, users can use the refresh token to obtain a new access token. This prevents the need to re-enter login credentials frequently.

## 6. API Endpoints
- Authentication and authorization middleware is implemented in relevant API endpoints to secure access.
- Ensureing that only authenticated and authorized users can access sensitive resources and routes.

## 6. API Endpoints
The API provides endpoints for CRUD operations related to finance applications. The following API routes are available:
- `POST /auth/register`: Register a new user.
- `POST /auth/login`: Log in an existing user.
- `GET /applications`: Get a list of finance applications for the logged-in user.
- `POST /applications`: Create a new finance application.
- `PATCH /applications`: Update a specific finance application by ID
- `DELETE /applications`: Delete a specific finance application by ID (sent from the cookie)
- `GET /user`: Get a user info for logged-in user

## 7. Database
The project uses a MongoDB serverless cluster to store user and finance application data. The backend service integrates with this database connection using Mongoose.

## 8. Logging and Monitoring
To track application usage and errors, logging and monitoring logs are added. This will help in debugging and improving the application's performance.

Once changes are committed to the master branch of your GitHub repository, you can deploy your Node.js Express backend on [Render.com](https://render.com/) by following these steps:

## 9. Deploying the Backend on [Render.com](https://render.com)

To deploy and utilise CI/CD, the Node.js Express backend are on [Render.com](https://render.com), please follow these steps:

### 9.1. **Log In:**
   - Begin by logging into your [Render.com](https://render.com) account.

### 9.2. **Create a Site:**
   - Create a new site. Choose the Node.js option for deploying your backend.

### 9.3. **Connect Your Repository:**
   - Link your GitHub repository to your [Render.com](https://render.com) account.

### 9.### 10.4. **Configure the Build:**
   - Specify your GitHub branch (usually "master" for production) and set the build command. For many Node.js projects, the build command is `npm install && npm start`.

### 9.5. **Set Environment Variables:**
   - Ensure your application's environment variables are properly configured in the [Render.com](https://render.com) environment settings.

### 9.6. **Initiate Deployment:**
   - Click the "Deploy" button to start the deployment process.

### 9.7. **Monitor Deployment:**
   - Keep an eye on the deployment progress through real-time logs and status updates available on [Render.com](https://render.com).

### 9.8. **Access Your Backend:**
   - Once the deployment is complete, you'll receive a URL where your Node.js Express backend is live.

### 9.9. **Testing:**
   - Thoroughly test your backend to confirm that it functions correctly. Tools like Postman can be useful for this.

### 9.10. **Database Connection:**
    - Verify that your backend connects to your MongoDB database as specified in your environment variables.

### 9.11. **Continuous Deployment
    - Simplify the deployment process by setting up continuous deployment. Any changes you push to the GitHub master branch trigger automatic deployments.

By following these steps, your Node.js Express backend will be up and running on [Render.com](https://render.com). It'll be in production mode, ready to serve requests, connect to MongoDB, and enhance the experience for your users. And production website for the project is https://afm-api.onrender.com/

## 10. Integration Testing with Postman Collection

    - For ntegration testing proces,  we'll use Postman, a powerful API testing tool, and the 'FM Collection.postman_collection 2.json' collection from the project's GitHub repository. By following these steps, you can ensure that all aspects of the platform are functioning as expected.

### Prerequisites

Before you begin, make sure you have the following in place:

1. **Postman:** Download and install [Postman](https://www.postman.com/downloads/), if you haven't already.

2. **GitHub Repository:** Ensure you have access to the GitHub repository where the 'FM Collection.postman_collection 2.json' collection is hosted.

3. **Environment Variables:** Set up the necessary environment variables within your Postman environment for the asset finance project. These might include variables like `ACCESS_TOKEN`, `REFRESH_TOKEN`.

### Steps to Run Integration Tests

1. **Import the Collection:**
   - Open Postman.
   - Click on the "Import" button in the top left.
   - Choose the 'FM Collection.postman_collection 2.json' file from your GitHub repository.

2. **Run the Tests:**
   - Open the 'FM Collection' and select the specific requests you want to test, such as user registration, login, or application-related requests.

3. **Execute Requests:**
   - Click the "Send" button to execute each request. Observe the response to verify that the server is correctly handling your requests.