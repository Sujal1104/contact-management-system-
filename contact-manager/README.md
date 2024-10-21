# Code Quest: Contact Management System

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Database Connection](#database-connection)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Overview
Code Quest is a contact management system designed to help users efficiently manage their contacts. The application allows users to perform various operations, such as adding, editing, deleting, and merging contacts. Additionally, users can import contacts from external files and export their contact lists for easy sharing.

## Features
- **User Authentication**: Sign up and log in to access the application.
- **CRUD Operations**: Create, Read, Update, and Delete contacts.
- **Contact Import/Export**: Import contacts from a VCF file and export your contact list.
- **Duplicate Detection**: Automatically detect and merge duplicate contacts.
- **Search and Filter**: Easily search for contacts by name, email, or phone number.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Technologies Used
- **Frontend**: 
  - React.js
  - HTML
  - CSS
- **Backend**: 
  - Node.js
  - Express.js
  - MongoDB
- **Authentication**: 
  - JWT (JSON Web Tokens)
- **Styling**: 
  - Custom CSS

## Installation
1. Clone the repository:
   ```bash
   https://github.com/your_repo_name/contact-management-system-.git

2. Navigate to the project directory:
   ```bash
   cd contact-management

 3. Install backend dependencies: Navigate to the backend directory (if applicable) and install the required Node.js packages:
    ```bash
    cd backend 
    npm install
    
 4. Install frontend dependencies: Navigate to the frontend directory (if applicable) and install the required Node.js packages:
    ```bash
    cd ..
    npm install
    
 5. Set up environment variables: Create a .env file in the root of the backend directory and add your MongoDB connection string. The file should look like this:
    ```bash
    MONGODB_URI=mongodb+srv://username:password@contactcluster.fr1cc.mongodb.net/?retryWrites=true&w=majority&appName=ContactCluster

## Running the Project
 1. Start the backend server: Navigate to the backend directory (if you aren't already there) and start the server:
    ```bash
      cd backend
      node server.js

2. Start the frontend application: Open a new terminal window or tab, navigate to the frontend directory, and start the application:
    ```bash
      cd ..
      npm run start
