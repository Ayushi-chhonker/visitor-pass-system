import mongoose from "mongoose";
import dotenv from "dotenv";
import Pass from "./models/Pass.js";
import Visitor from "./models/Visitor.js";
import Appointment from "./models/Appointment.js";
import User from "./models/User.js";
import bcrypt from "bcryptjs";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)

.then(() => console.log("MongoDB Connected"))

.catch((err) => console.log(err));

const seedData = async () => {

  try {

    // Clear old data
    await User.deleteMany();
    await Visitor.deleteMany();
    await Appointment.deleteMany();
    await Pass.deleteMany();

    const hashedPassword = await bcrypt.hash(
  "password123",
  10
);

const admin = await User.create({
  name: "Admin User",
  email: "admin@test.com",
  password: hashedPassword,
  role: "admin"
});

const employee = await User.create({
  name: "Rahul Employee",
  email: "employee@test.com",
  password: hashedPassword,
  role: "employee"
});

const security = await User.create({
  name: "Security User",
  email: "security@test.com",
  password: hashedPassword,
  role: "security"
});

console.log("Users Added");



    // Create Visitors
  const visitor1 = await Visitor.create({
  name: "Rahul Sharma",
  email: "rahul@gmail.com",
  phone: "9876543210",
  purpose: "Project Meeting"
});

const visitor2 = await Visitor.create({
  name: "Priya Singh",
  email: "priya@gmail.com",
  phone: "9999999999",
  purpose: "Interview"
});

    console.log("Visitors Added");



    // Create Appointment
    const appointment1 = await Appointment.create({
      visitorId: visitor1._id,
      hostId: employee._id,
      date: new Date(),
      status: "approved"
    });

    console.log("Appointment Added");



    // Create Pass
    const pass1 = await Pass.create({
      visitorId: visitor1._id,
      appointmentId: appointment1._id,
      qrCode: "Demo QR Code"
    });

    console.log("Pass Added");


    console.log("Seed Data Inserted Successfully");
    console.log("Admin Email: admin@test.com");
    console.log("Employee Email: employee@test.com");
    console.log("Security Email: security@test.com");
    console.log("Password: password123");

    process.exit();

  } catch (error) {

    console.log(error);

    process.exit(1);

  }
};

seedData();