# Visitor Pass Management System

GitHub Repository:
https://github.com/Ayushi-chhonker/visitor-pass-system

1. Project Overview

The Visitor Pass Management System is a web-based application designed to manage visitor entry, appointments, QR-based passes, and visitor tracking within an organization.

The system allows visitors to pre-register, employees to manage appointments, administrators to approve requests, and security staff to verify visitor passes through QR scanning.


# Features

1.  Authentication & Authorization

* JWT-based authentication
* Role-based access control
* Roles:

  * Admin
  * Employee
  * Security
  * visitor


2. Visitor Management

* Add visitor details
* Upload visitor photo
* View visitors
* Delete visitors

3. Appointment Management

* Create appointments
* Approve appointments
* Appointment status tracking

4. Pre-Registration System

* Visitor pre-registration form
* Host selection dropdown
* Admin approval/rejection workflow
* Automatic visitor creation after approval
* Automatic appointment creation after approval

5. Visitor Pass Management

* Generate QR-based visitor passes
* Store QR data in database
* Verify visitor passes

6. Check-In / Check-Out

* QR code scanning
* Visitor check-in recording
* Visitor check-out recording
* Visit log maintenance

7. Notifications

* Email notifications
* SMS notification support

8. Reporting

* Dashboard statistics
* CSV export functionality

9. PDF Badge Generation

* Visitor badge generation
* Embedded QR code
* Visitor information displayed on PDF pass


# Technology Stack

1. Frontend

* React.js
* Axios
* React Router DOM

2. Backend

* Node.js
* Express.js

3. Database

* MongoDB
* Mongoose

4. Authentication

* JSON Web Token (JWT)
* bcryptjs

5. Additional Libraries

* QRCode
* PDFKit
* Multer
* Nodemailer

# Project Structure

Visitor-pass-system
│
├── Backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   ├── utils
│   └── uploads
│
├── frontend
│   ├── src
│   │   ├── pages
│   │   ├── components
│   │   └── App.js
│
└── README.md

# Installation

1. Clone Repository
git clone <repository-url>

2. Backend Setup

cd Backend
npm install

3. Frontend Setup

cd frontend
npm install


# Environment Variables

Create a `.env` file inside the Backend folder.

.env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
PORT=5000

# Running the Application

1. Start Backend

Inside bash commands:
cd Backend
npm run dev

2. Start Frontend

  Inside bash commands:
cd frontend
npm start

# Demo Data / Seed Data

The project includes sample data for testing purposes.

1. Running the Seed Script

Inside bash
cd Backend
node seed.js

2. Seeded Records

The seed script creates:

- Sample Users (Admin, Employee, Security)
- Sample Visitors
- Sample Appointments
- Sample Passes
These records can be used to test:

* Visitor Management
* Appointment Management
* Pass Generation
* QR Verification
* Dashboard Statistics

# Test User Accounts

The seed script automatically creates the following accounts:

 Role      Email                                          Password     
 Admin     [admin@test.com](mailto:admin@test.com)        password123 
 Employee  [employee@test.com](mailto:employee@test.com)  password123 
 Security  [security@test.com](mailto:security@test.com)  password123 
Visitor    [visitor@test.com](mailto:visitor@test.com)    password123 

# Main API Endpoints

1. Authentication
POST /api/auth/register
POST /api/auth/login

2. Visitors
GET /api/visitors
POST /api/visitors
DELETE /api/visitors/:id

3. Appointments
GET /api/appointments
POST /api/appointments
PUT /api/appointments/:id/approve
PUT /api/appointments/:id/reject

4. Passes
POST /api/passes
GET /api/passes
GET /api/passes/pdf/:id
GET /api/passes/verify/:visitorId/:appointmentId
PUT /api/appointments/checkin/:id
PUT /api/appointments/checkout/:id

5. Pre-Registrations
POST /api/preregistrations
GET /api/preregistrations
PUT /api/preregistrations/:id/approve
PUT /api/preregistrations/:id/reject


# Application Workflow

Visitor
   ↓
Pre-Registration
   ↓
Admin Approval
   ↓
Appointment Created
   ↓
Pass Generated
   ↓
QR Verification
   ↓
Check-In
   ↓
Check-Out

# Testing Report

1. Testing Summary

The Visitor Pass Management System was tested for authentication, visitor management, appointment handling, QR-based pass generation, check-in/check-out workflow, and reporting features.

Testing was performed on all major modules including:

- Authentication
- Visitor Management
- Appointment Management
- QR Pass Generation
- Check-In / Check-Out
- Dashboard Reporting

All tested features worked successfully during project evaluation.

2. Test Environment

* Frontend: React.js
* Backend: Node.js, Express.js
* Database: MongoDB
* Authentication: JWT
* Browser Used: Google Chrome / Mozilla Firefox
* Operating System: Windows 10

3. Challenges Faced

* Implementing role-based authentication using JWT.
* Integrating QR code generation and QR scanning functionality.
* Managing visitor check-in and check-out using a single QR code.
* Generating downloadable PDF visitor passes.
* Handling email notifications during appointment approval.


4. Result

All major functionalities of the Visitor Pass Management System were tested successfully. The application correctly handles visitor registration, appointment management, QR-based pass generation, check-in/check-out operations, role-based access control, PDF generation, and reporting features.

5. Learning Outcomes
Through this project, I gained practical experience in:

 React.js frontend development
 REST API development using Express.js
 MongoDB database operations
 JWT authentication and authorization
 QR code generation and verification
 File uploads using Multer
 PDF generation using PDFKit




# Author
Ayushi Chhonker
UIET, Panjab University

Visitor Pass Management System
Full Stack Web Development Project
