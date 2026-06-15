import mongoose from "mongoose";
import dotenv from "dotenv";
import Visitor from "./models/Visitor.js";
import Appointment from "./models/Appointment.js";
import Pass from "./models/Pass.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)

.then(() => console.log("MongoDB Connected"))

.catch((err) => console.log(err));

const seedData = async () => {

  try {

    // Clear old data
    await Visitor.deleteMany();

    await Appointment.deleteMany();

    await Pass.deleteMany();



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
      hostId: visitor1._id,
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

    process.exit();

  } catch (error) {

    console.log(error);

    process.exit(1);

  }
};

seedData();