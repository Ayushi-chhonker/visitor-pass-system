# Visitor Pass Management System

Overview:

The Visitor Pass Management System is a full-stack web application designed to simplify and secure visitor entry management within an organization. It enables administrators and reception staff to manage visitors, appointments, and digital visitor passes while providing QR code-based verification for secure check-in.

The application is built using the MERN stack (MongoDB, Express.js, React.js, and Node.js) and follows a REST API architecture with JWT-based authentication.

Features:

1. Authentication

User registration and login
JWT-based authentication
Protected API routes using authentication middleware
Secure token storage and authorization headers

2. Visitor Management

* Add new visitors
* View visitor details
* Update visitor information
* Delete visitor records


3. Appointment Management

* Create appointments
* Approve or reject appointments
* View appointment history
* Associate visitors with hosts

4. Visitor Pass Generation

* Generate digital visitor passes
* Automatically generate QR codes
* Link each pass to a visitor and appointment
* Track pass status

5. QR Code Verification

* Scan visitor QR codes using the camera
* Verify visitor details instantly
* Display visitor information after successful verification

6. One-Time QR Validation

Each visitor pass can only be used once.

* First scan:

  * Pass verified successfully
  * Status changes from **active** to **used**
  * Check-in time is recorded

* Subsequent scans:

  * System displays **"Pass already used"**
  * Duplicate entry is prevented


7. Dashboard

* View visitor records
* Search visitors
* Filter visitor data
* Export visitor records as CSV

8. PDF Visitor Pass

Generate downloadable visitor pass PDFs containing:

* Visitor Name
* Host Name
* Appointment Details
* QR Code
* Pass Status

9. Email Notifications

Automatic email notifications are sent when appointments are created or approved.

10. Security

* JWT Authentication
* Authorization middleware
* Protected API endpoints
* Role-based route protection (where applicable)

 Technology Stack:

1. Frontend:

* React.js
* Axios
* React Router
* HTML5 QR Code Scanner

2. Backend:

* Node.js
* Express.js

3. Database

* MongoDB
* Mongoose

4. Authentication

* JSON Web Token (JWT)

5. PDF Generation

* PDFKit

6. Email Service

* Nodemailer

 Project Structure:

Frontend/
│
├── src/
│   ├── pages/
│   ├── components/
│   ├── services/
│   └── App.js
│
Backend/
│
├── controllers/
├── models/
├── routes/
├── middleware/
├── utils/
├── config/
├── server.js
└── seed.js

 API Endpoints:

1. Authentication

POST /api/auth/register
POST /api/auth/login


2. Visitors

GET    /api/visitors
POST   /api/visitors
PUT    /api/visitors/:id
DELETE /api/visitors/:id

3. Appointments

GET    /api/appointments
POST   /api/appointments
PUT    /api/appointments/:id
DELETE /api/appointments/:id


4. Passes

POST /api/passes/generate
GET  /api/passes/verify/:visitorId/:appointmentId
POST /api/passes/:id/pdf

 Installation:

# Clone the repository

```bash
git clone <repository-url>
```


1. Backend Setup

```bash
cd Backend

npm install

npm run dev


2. Frontend Setup

```bash
cd Frontend

npm install

npm start


# Environment Variables

Create a `.env` file in the Backend directory.
MONGO_URI=mongodb+srv://rashichhonker274_db_user:BSJ0jXdr8EIt28Yn@cluster0.dozqchs.mongodb.net/?appName=Cluster0
JWT_SECRET=mysecretkey123
PORT=5000
EMAIL_USER=rashichhonker274@gmail.com
EMAIL_PASS=swac hjvp jamw xsai



 Workflow:

1. User logs in.
2. Receptionist registers a visitor.
3. Appointment is created.
4. Visitor pass with QR code is generated.
5. Visitor presents the QR code at entry.
6. Security scans the QR code.
7. First scan verifies the pass and marks it as used.
8. Any subsequent scan is rejected with **"Pass already used"**.


# Future Enhancements

* Visitor check-out management
* Analytics dashboard
* Real-time notifications
* Multi-role permission management
* Mobile application support

# Author
Developed as a full-stack MERN project for secure visitor management and QR-based access control.
