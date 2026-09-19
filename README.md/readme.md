 Visitor Pass Management System
A full-stack web application for managing visitors, appointments, visitor passes, QR-based verification, and visitor check-in/check-out in an organized and secure manner.

The system is designed to reduce manual visitor entry processes and provide a digital workflow for visitor registration, appointment management, pass generation, and entry/exit tracking.


 Project Overview
The Visitor Pass Management System provides a centralized platform where authorized users can manage visitors and appointments and generate digital visitor passes.
Each visitor pass contains a unique QR code that can be scanned at the time of entry and exit. The first successful scan records the visitor's check-in time, while the second scan records the check-out time.
The backend is built using Node.js and Express.js, while MongoDB is used for data storage and React.js is used for the frontend.

 Objectives:
The main objectives of this project are:
1 Digitize the visitor registration process.
2 Manage visitor information efficiently.
3 Manage appointments between visitors and employees.
4 Generate digital visitor passes.
5 Generate QR codes for visitor verification.
6 Provide PDF versions of visitor passes.
7 Track visitor check-in and check-out times.
8 Implement authentication and role-based authorization.
9 Maintain visitor and appointment records in MongoDB.
10 Provide a structured and user-friendly interface for managing visitors.

# Features

1 Authentication
* User registration
* User login
* Password hashing using bcrypt
* JWT-based authentication
* Protected backend routes
* Token verification using authentication middleware
* Role-based authorization

2 Visitor Management
* Create visitor records
* View visitor information
* Update visitor information
* Delete visitor records
* Store visitor details in MongoDB

3 Appointment Management
* Create appointments
* Associate visitors with appointments
* Associate appointments with employees/hosts
* Manage appointment information
* Track appointment check-in and check-out times

4 Visitor Pass Generation
* Generate digital visitor passes
* Associate passes with visitors and appointments
* Store generated passes in MongoDB
* Generate a unique QR code for each pass

5 QR Code Verification
The QR code contains the visitor and appointment information required for verification.
The visitor verification workflow is:
First scan-visitor checked-in,second scan-visitor checked out and thrid scan- visitor checked out already.

6 PDF Visitor Pass
A visitor pass can be generated as a PDF containing information such as:
 Visitor name, Email, Phone number, Purpose of visit, Pass ID, Pass status, QR code

7 Role-Based Access
Different users can be given different levels of access based on their assigned role.
The system uses authentication middleware and role middleware to control access to protected routes.

8 Notification Support
The project currently contains a notification structure for SMS functionality.

The SMS functionality is currently implemented as a development mock and logs the notification instead of sending a real SMS through a production SMS gateway.

A real SMS provider can be integrated in a future version.


# Technologies Used

1. Frontend

 React.js, JavaScript, HTML, CSS, Axios

2. Backend

 Node.js, Express.js, JavaScript, JWT, bcrypt.js

3. Database
 MongoDB, Mongoose

4. Other Libraries
 QRCode, PDFKit, Multer, Nodemailer

#  Authorization Flow
Protected requests contain the JWT in the Authorization header:

Authorization: Bearer <JWT_TOKEN>

The authentication middleware:
1 Reads the Authorization header.
2 Extracts the token.
3 Verifies the token using the JWT secret.
4 Stores the decoded information in `req.user`.
5 Allows the request to continue.

The role middleware then checks whether the authenticated user's role is allowed to access the requested route.

Request
   ↓
JWT Authentication
   ↓
Token Valid?
  /     \
No       Yes
↓         ↓
401     req.user
            ↓
      Role Authorization
            ↓
       Role Allowed?
        /       \
      No         Yes
      ↓           ↓
     403        next()

#  PDF Generation Workflow

After a pass has been generated, the system can generate a PDF visitor badge.
Existing Visitor Pass then Fetch Pass from MongoDB then Populate Visitor Information then Populate Appointment Information after then Create PDF after that Add Visitor Details, Add QR Code and then Return PDF to Browser

The PDF is generated using PDFKit.

# QR Check-In / Check-Out Workflow
The QR verification system uses the visitor ID and appointment ID associated with the pass.

### First Scan
If the appointment does not have a check-in time:
checkInTime = current date/time
The visitor is marked as checked in.

### Second Scan
If the visitor has already checked in but has no check-out time:
checkOutTime = current date/time
The visitor is marked as checked out.

### Third Scan
If both times already exist:
Visitor has already checked out.
This prevents the same pass from being repeatedly used to create additional check-in/check-out records.


# Testing Approach
Testing was performed after debugging the pass-generation workflow and related backend issues.
The application was tested through the actual frontend and backend rather than relying only on code inspection.
The backend terminal and browser console were also checked for runtime errors during testing.

#  Issues Identified During Development
During development, a variable naming mismatch was identified in the visitor pass generation controller.
The issue involved inconsistent variable names such as:

qrContent / qrData
qrImage / qrCodeImage
pass / visitorPass

These inconsistencies caused runtime errors during pass generation.The controller was corrected so that the same variable names are used consistently throughout the pass-generation process.After making the corrections, pass generation, QR generation, PDF generation, and QR verification were tested again.

### 8 Notification Support

The system supports SMS notifications using the **Textplate SMS API**.SMS notifications are sent to the visitor's registered phone number when an appointment is approved.The SMS integration uses environment variables for the API credentials:

TEXTPLATE_API_KEY=your_textplate_api_key
TEXTPLATE_TEMPLATE_ID=your_textplate_template_id

The API key is stored in the `.env` file and is not included in the source code or GitHub repository.
The SMS functionality was tested successfully using the Textplate API.


# 🔒 Environment Variables
Create a `.env` file inside the backend directory.

Example:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password

Do not upload the `.env` file to GitHub.
Add it to .gitignore:
.env
node_modules/
uploads/

# Seed / Demo Data
The backend includes a 'seed.js' file to create some sample data for testing and demonstration.
The seed script creates:
* Admin user
* Employee user
* Security user
* Sample visitor
* Approved appointment
* Sample visitor pass

The script checks whether the demo records already exist before creating them, so running it again will not delete existing application data or create duplicate demo records.

 Run Seed Data:
Make sure the backend ".env" file contains a valid `MONGO_URI`, then run:

inside bash
cd Backend
node seed.js

Demo Login Credentials:
 Admin| admin@test.com(mailto:admin@test.com)| password123 
Employee| employee@test.com(mailto:employee@test.com)| password123 
Security| security@test.com(mailto:security@test.com)| password123 

Note:These credentials and records are provided only for development, testing, and project demonstration. They should not be used in a production environment.

# Installation and Setup

 1. Clone the repository

bash
git clone <your-repository-url>
Move into the project directory:

bash
cd Visitor-Pass-Management-System

 2. Backend Setup
Move into the backend folder:

bash:cd backend

Install dependencies:
bash: npm install

Create the `.env` file and configure the required environment variables.

Start the backend:
bash:npm run dev


The backend will run on the configured port, for example:
http://localhost:5000


 3. Frontend Setup

Open another terminal and move to the frontend folder:

bash: cd frontend

Install dependencies:

bash: npm install

Start the frontend:
bash: npm start
The React application will open in the browser.


# API Overview

The backend follows a REST API structure. Typical API groups include:
/auth
/visitors
/appointments
/passes
/logs
/preregistration

Protected endpoints require a valid JWT token.The exact routes may vary according to the route configuration in the project.

# 📊 Database
MongoDB is used as the primary database.The application stores information related to:

 Users,Visitors,Appointments,Visitor passes, Check-in/check-out records, Other application-related records
Mongoose is used to define schemas and interact with MongoDB.

#  AI Usage and Development Transparency
AI tools were used during development as a learning and development aid. They were used for understanding programming concepts, exploring implementation approaches, debugging errors, improving code readability, and preparing documentation.

Some initial backend implementations were developed with AI assistance. During review and testing, issues were identified in the implementation, including variable naming inconsistencies in passController.js that affected QR-code pass generation. These issues were manually traced, corrected, and tested as part of the rework process.

The final implementation was reviewed and tested by the developer, with particular attention to authentication, authorization, visitor management, appointment handling, pass generation, QR verification, PDF generation, and the check-in/check-out workflow.

AI-generated suggestions were not treated as a substitute for understanding, debugging, or testing. The developer takes responsibility for understanding the final code and verifying its behavior.


AI assistance was **not treated as a replacement for testing or understanding the code**.

# Learning Outcomes
Through this project, the following concepts were practiced:

* MERN stack development
* REST API development
* Express.js routing
* MongoDB database operations
* Mongoose models
* JWT authentication
* Role-based authorization
* Password hashing
* QR code generation
* PDF generation
* File handling
* API integration
* Frontend-backend communication
* Debugging runtime errors
* Testing full-stack application workflows

# Future Improvements

The following features can be added in future versions:

1. Email notification improvements
2. Visitor photo capture/upload
3. More advanced role-based permissions
4. Admin dashboard analytics
5. Search and filtering
6. Visitor history reports
7. Automatic appointment reminders
8. QR code expiration
9. Pass expiration based on appointment time
10. Improved audit logging
11. Deployment to a cloud platform
12. Automated testing

# Current Limitations
The current version has the following limitations:

1. The application is primarily tested in a local development environment.
2. Production deployment and infrastructure configuration are outside the current project scope.
3. SMS functionality depends on the configured Textplate API account and available SMS credits.

# 👨‍💻 Developer

**Ayushi Chhonker**
B.Tech – Electronics and Communication Engineering
UIET Chandigarh
This project was developed for educational and academic purposes.
