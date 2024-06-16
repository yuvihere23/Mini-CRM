Mini CRM

Table of Contents
Introduction
Features
Project Structure
Installation
Environment Variables
Usage
API Endpoints
Technologies Used
Contributing

Introduction
Mini CRM is a lightweight customer relationship management system designed to manage customer data, campaigns, and communication logs. It provides a user-friendly interface for managing customer information, sending bulk messages, and tracking communication logs.

Features
User authentication and authorization
Customer management
Campaign management
Bulk messaging
Communication log tracking
Project Structure
bash
Copy code
/backend
  ├── controllers
  ├── db
  ├── middlewares
  ├── model
  ├── routes
  ├── utils
  ├── app.js
  ├── constants.js
  ├── index.js
/frontend
  ├── assets
  ├── components
  ├── pages
  ├── redux
  ├── App.css
  ├── App.jsx
  ├── Layout.jsx
  ├── firebase.js
  ├── index.css
  ├── main.jsx
Installation
Prerequisites
Node.js
npm or yarn
MongoDB
Backend
Navigate to the backend directory:
sh
Copy code
cd backend
Install dependencies:
sh
Copy code
npm install
Create a .env file and add the necessary environment variables (see Environment Variables).

Start the backend server:

sh
Copy code
npm start
Frontend
Navigate to the frontend directory:
sh
Copy code
cd frontend
Install dependencies:
sh
Copy code
npm install
Create a .env file and add the necessary environment variables (see Environment Variables).

Start the frontend development server:

sh
Copy code
npm run dev
Environment Variables
Backend
Create a .env file in the backend directory with the following variables:

makefile
Copy code
PORT=8000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
Frontend
Create a .env file in the frontend directory with the following variables:

arduino
Copy code
VITE_API_URL=http://localhost:8000
Usage
Accessing the Application
Ensure both backend and frontend servers are running.
Open your browser and navigate to http://localhost:3000.
API Endpoints
Authentication
POST /api/auth/signup - Register a new user
POST /api/auth/login - Login a user
Customers
GET /api/customer - Get all customers
POST /api/customer - Create a new customer
PUT /api/customer/:id - Update a customer
DELETE /api/customer/:id - Delete a customer
Campaigns
GET /api/campaigns - Get all campaigns
POST /api/campaigns - Create a new campaign
PUT /api/campaigns/:id - Update a campaign
DELETE /api/campaigns/:id - Delete a campaign
Communication Logs
GET /api/communications/logs - Get all communication logs
GET /api/communications/send/logs/:campaignId - Get logs by campaign
Vendor API
POST /api/vendor/send-bulk-messages - Send bulk messages
POST /api/vendor/delivery-receipt - Process delivery receipt
Technologies Used
Frontend: React, Vite, Tailwind CSS
Backend: Node.js, Express.js, MongoDB
Authentication: JWT
HTTP Client: Axios
Contributing
Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Make your changes.
Commit your changes (git commit -am 'Add new feature').
Push to the branch (git push origin feature/your-feature).
Create a new Pull Request.







