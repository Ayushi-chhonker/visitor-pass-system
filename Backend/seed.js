import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

import User from "./models/User.js";
import Visitor from "./models/Visitor.js";
import Appointment from "./models/Appointment.js";
import Pass from "./models/Pass.js";

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const password = await bcrypt.hash("password123", 10);
    // Users
    let admin = await User.findOne({ email: "admin@test.com" });
    if (!admin) {
      admin = await User.create({
        name: "Admin User",
        email: "admin@test.com",
        password,
        role: "admin"
      });
    }

    let employee = await User.findOne({ email: "employee@test.com" });
    if (!employee) {
      employee = await User.create({
        name: "Rahul Employee",
        email: "employee@test.com",
        password,
        role: "employee"
      });
    }

    let security = await User.findOne({ email: "security@test.com" });
    if (!security) {
      security = await User.create({
        name: "Security User",
        email: "security@test.com",
        password,
        role: "security"
      });
    }

    // Visitors
    let visitor = await Visitor.findOne({ email: "rahul@gmail.com" });

    if (!visitor) {
      visitor = await Visitor.create({
        name: "Rahul Sharma",
        email: "rahul@gmail.com",
        phone: "9876543210",
        purpose: "Project Meeting"
      });
    }

    // Appointment
    let appointment = await Appointment.findOne({
      visitorId: visitor._id,
      hostId: employee._id
    });

    if (!appointment) {
      appointment = await Appointment.create({
        visitorId: visitor._id,
        hostId: employee._id,
        date: new Date(),
        status: "approved"
      });
    }

    // Pass
    let pass = await Pass.findOne({
      visitorId: visitor._id,
      appointmentId: appointment._id
    });

    if (!pass) {
      await Pass.create({
        visitorId: visitor._id,
        appointmentId: appointment._id,
        qrCode: "Demo QR Code"
      });
    }

    console.log("Seed data added successfully");
    console.log("Admin: admin@test.com");
    console.log("Employee: employee@test.com");
    console.log("Security: security@test.com");
    console.log("Password: password123");

    await mongoose.connection.close();

  } catch (error) {
    console.log("Error:", error.message);
    await mongoose.connection.close();
  }
};

seedData();
