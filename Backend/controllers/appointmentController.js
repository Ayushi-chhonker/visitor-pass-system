import Appointment from "../models/Appointment.js";
import Visitor from "../models/Visitor.js";
import sendEmail from "../utils/sendEmail.js";
import sendSMS from "../utils/sendSMS.js";

/*
Appointment Controller
This controller is responsible for:
 Creating a new appointment, Viewing all appointments,  Approving appointments, Sending email and SMS notifications,
 Managing visitor check-in and check-out.
*/

// Create Appointment
export const createAppointment = async (req, res) => {
  try {
    const { visitorId, hostId, date } = req.body;

    // These fields are mandatory for creating an appointment
    if (!visitorId || !hostId || !date) {
      return res.status(400).json({
        success: false,
        msg: "Please provide all appointment details."
      });
    }

    // Create a new appointment document
    const appointment = new Appointment({ visitorId,hostId,date});
    await appointment.save();

    // Find visitor details to send confirmation email
    const visitor = await Visitor.findById(visitorId);

    // Send email only if visitor has provided an email address
    if (visitor && visitor.email) {
      await sendEmail(
        visitor.email,
        "Appointment Created",
        `Hello ${visitor.name},

Your appointment request has been created successfully.
Date : ${date}
Thank you.`
      );
    }

    return res.status(201).json({
      msg: "Appointment created successfully.",
      appointment
    });

  } catch (err) {
   // logs the error for debugging
    console.log("Create Appointment Error:", err);
    return res.status(500).json({
      msg: "Server Error"
    });
  }
};

// Get All Appointments
export const getAppointments = async (req, res) => {
  try {

    // Fetch appointments along with visitor and host details
    const appointments = await Appointment.find()
      .populate("visitorId")
      .populate("hostId");

    return res.status(200).json(appointments);
  } catch (err) {
    console.log("Fetch Appointment Error:", err);

    return res.status(500).json({
      msg: "Server Error"
    });
  }
};

// Approve Appointment
export const approveAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    // Find appointment in database
    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({
        msg: "Appointment not found."
      });
    }

    // Update appointment status after approval
    appointment.status = "approved";
    await appointment.save();

    // Fetch visitor details by its id for sending notifications
    const visitor = await Visitor.findById(appointment.visitorId);

    if (visitor) {
      // Send approval email if visitor email exists
      if (visitor.email) {
    
        //email message
        await sendEmail(
          visitor.email,
          "Appointment Approved",
          `Hello ${visitor.name},
        Your appointment has been approved successfully.
        You can now visit the office.
        Thank you.`
       );
      }

      // Send SMS notification to visitor
      await sendSMS(
        visitor.phone,
        `Hello ${visitor.name},
      Your appointment has been approved successfully.
      Please carry your visitor pass while visiting.`
      );
    }

    return res.status(200).json({
      msg: "Appointment approved successfully.",
      appointment
    });

  } catch (err) {
    console.log("Approve Appointment Error:", err);
    return res.status(500).json({
      msg: "Server Error"
    });
  }
};

// Check-In Visitor
export const checkInVisitor = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findById(id);

    // Appointment should exist before check-in andIf appointment not exist then
    if (!appointment) {
      return res.status(404).json({
        success: false,
        msg: "Appointment not found."
      });
    }

    // Prevent the visitor from checking in multiple times
    if (appointment.status === "checked-in") {
      return res.status(400).json({
        msg: "Visitor has already checked in."
      });
    }

    // Update appointment status and store current check-in time in database
    appointment.status = "checked-in";
    appointment.checkInTime = new Date();
    await appointment.save();

    //return response as checked in successfully
    return res.status(200).json({
      msg: "Visitor checked in successfully.",
      appointment
    });

  } catch (err) {
    console.log("Check-In Error:", err);
    return res.status(500).json({
      msg: "Server Error"
    });
  }
};

// Check-Out Visitor
export const checkOutVisitor = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findById(id);

    // Appointment must exist before check-out and if not then
    if (!appointment) {
      return res.status(404).json({
        success: false,
        msg: "Appointment not found."
      });
    }

    // A visitor must check in before checking out
    if (appointment.status !== "checked-in") {
      return res.status(400).json({
        msg: "Visitor has not checked in yet."
      });
    }

    // Save visitor exit time and update appointment status in database
    appointment.status = "checked-out";
    appointment.checkOutTime = new Date();
    await appointment.save();

    return res.status(200).json({
      msg: "Visitor checked out successfully.",
      appointment
    });

  } catch (err) {
    console.log("Check-Out Error:", err);
    return res.status(500).json({
      msg: "Server Error"
    });
  }
};