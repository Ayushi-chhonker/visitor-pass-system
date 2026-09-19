import Appointment from "../models/Appointment.js";
import Visitor from "../models/Visitor.js";
import sendEmail from "../utils/sendEmail.js";
import sendSMS from "../utils/sendSMS.js";

// Create a new appointment
export const createAppointment = async (req, res) => {
  try {
    const { visitorId, hostId, date } = req.body;

    // These fields are required
    if (!visitorId || !hostId || !date) {
      return res.status(400).json({
        success: false,
        msg: "Please provide all appointment details."
      });
    }

    // Create and save the appointment
    const appointment = new Appointment({
      visitorId, hostId, date
    });

    await appointment.save();

    // Find visitor details for sending email
    const visitor = await Visitor.findById(visitorId);

    // Send email if visitor has an email
    if (visitor && visitor.email) {
      await sendEmail(
        visitor.email,
        "Appointment Created",
        `Hello ${visitor.name},

       Your appointment request has been created successfully.
       Date: ${date}
      Thank you.`
      );
    }

    return res.status(201).json({
      msg: "Appointment created successfully.",
      appointment
    });

  } catch (err) {
    console.log("Create Appointment Error:", err);
    return res.status(500).json({
      success:false,
      msg: "Server Error"
    });
  }
};


// Get all appointments
export const getAppointments = async (req, res) => {
  try {

    // Get appointments with visitor and host details
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


// Approve an appointment
export const approveAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the appointment using its ID
    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({
        msg: "Appointment not found."
      });
    }

    // Change the appointment status to approved
    appointment.status = "approved";
    await appointment.save();

    // Find the visitor related to this appointment
    const visitor = await Visitor.findById(appointment.visitorId);

    if (visitor) {
      // Send email if email is available
      if (visitor.email) {
        await sendEmail(
          visitor.email,
          "Appointment Approved",
          `Hello ${visitor.name},

        Your appointment has been approved successfully.
        You can now visit the office.
        Thank you.`
        );
      }

      // Send SMS if phone number is available
      if (visitor.phone) {
        await sendSMS(
          visitor.phone,
          "approved successfully"
        );
      }
    }

    return res.status(200).json({
      msg: "Appointment approved successfully.",
      appointment
    });

  } catch (err) {
    console.log("Approve Appointment Error:", err);
    return res.status(500).json({
      success: false,
      msg: "Server Error"
    });
  }
};


// Check in visitor
export const checkInVisitor = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the appointment
    const appointment = await Appointment.findById(id);

    // Appointment must exist before check-in
    if (!appointment) {
      return res.status(404).json({
        success: false,
        msg: "Appointment not found."
      });
    }

    // Prevent checking in more than once
    if (appointment.status === "checked-in") {
      return res.status(400).json({
        msg: "Visitor has already checked in."
      });
    }

    // Save check-in time and update status
    appointment.status = "checked-in";
    appointment.checkInTime = new Date();

    await appointment.save();
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


// Check out visitor
export const checkOutVisitor = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the appointment
    const appointment = await Appointment.findById(id);

    // Appointment must exist before check-out
    if (!appointment) {
      return res.status(404).json({
        success: false,
        msg: "Appointment not found."
      });
    }

    // Visitor must check in before checking out
    if (appointment.status !== "checked-in") {
      return res.status(400).json({
        msg: "Visitor has not checked in yet."
      });
    }

    // Save check-out time and update status
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