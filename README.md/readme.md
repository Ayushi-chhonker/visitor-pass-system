# Visitor Pass Management System

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
  * Visitor

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


# Future Enhancements

* OTP Verification
* Multi-Organization Support
* Analytics Dashboard
* Docker Deployment
* Cloud Hosting


# Author
Ayushi Chhonker
UIET, Panjab University
Visitor Pass Management System Assignment Project
